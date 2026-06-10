// Cloud drawer: ☁ header button → modal with Google sign-in / sign-out.
// Reads/writes auth state via window.cloudClient(). Re-renders body on
// auth state changes. Dispatches 'cloud-auth-changed' custom event so
// other modules (app.js slide viewer) can react.
(function () {
  'use strict';

  function t(key, params) {
    const I18N = window.I18N;
    if (!I18N) return key;
    return I18N.t ? I18N.t(key, params) : key;
  }

  function render(body, client) {
    const user = client.getUser();
    if (user) {
      const name = user.displayName || user.email || 'unknown';
      body.innerHTML =
        '<p class="cloud-drawer-user">' + t('cloud.current-user', { name: name }) + '</p>' +
        '<button type="button" class="btn secondary" id="cloud-signout-btn" data-testid="cloud-signout-btn">' +
          t('cloud.signout') +
        '</button>';
      const btn = body.querySelector('#cloud-signout-btn');
      btn.addEventListener('click', async () => {
        try {
          await client.signOutGoogle();
          window.dispatchEvent(new CustomEvent('cloud-auth-changed', { detail: { signedIn: false } }));
        } catch (err) {
          body.insertAdjacentHTML('beforeend', '<p class="cloud-drawer-error">' + (err && err.message) + '</p>');
        }
      });
    } else {
      const isConfigured = client.isConfigured;
      const note = isConfigured ? t('cloud.signin-note') : (client.missingReason || 'Cloud not configured.');
      body.innerHTML =
        '<p class="cloud-drawer-note">' + note + '</p>' +
        '<button type="button" class="btn primary" id="cloud-signin-btn" data-testid="cloud-signin-btn"' +
          (isConfigured ? '' : ' disabled') + '>' +
          t('cloud.signin-cta') +
        '</button>';
      if (isConfigured) {
        body.querySelector('#cloud-signin-btn').addEventListener('click', async () => {
          try {
            await client.signInWithGoogle();
            window.dispatchEvent(new CustomEvent('cloud-auth-changed', { detail: { signedIn: true } }));
          } catch (err) {
            body.insertAdjacentHTML('beforeend', '<p class="cloud-drawer-error">' + (err && err.message) + '</p>');
          }
        });
      }
    }
  }

  function openDrawer() {
    const drawer = document.getElementById('cloud-drawer');
    const body = document.getElementById('cloud-drawer-body');
    if (!drawer || !body) return;
    const client = window.cloudClient ? window.cloudClient() : null;
    if (!client) { body.innerHTML = '<p>Cloud client not loaded.</p>'; }
    else { render(body, client); }
    drawer.hidden = false;
    drawer.classList.add('open');
    drawer.querySelector('.cloud-drawer-panel').focus();
  }

  function closeDrawer() {
    const drawer = document.getElementById('cloud-drawer');
    if (!drawer) return;
    drawer.hidden = true;
    drawer.classList.remove('open');
  }

  function bind() {
    const btn = document.getElementById('cloud-toggle');
    if (btn) btn.addEventListener('click', openDrawer);
    document.querySelectorAll('[data-cloud-close]').forEach((el) => {
      el.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', (e) => {
      const drawer = document.getElementById('cloud-drawer');
      if (drawer && !drawer.hidden && e.key === 'Escape') closeDrawer();
    });
    // Subscribe to auth-state changes — refresh drawer body if open.
    const client = window.cloudClient ? window.cloudClient() : null;
    if (client && client.subscribeAuthState) {
      client.subscribeAuthState(() => {
        const drawer = document.getElementById('cloud-drawer');
        if (drawer && !drawer.hidden) {
          const body = document.getElementById('cloud-drawer-body');
          render(body, client);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }

  // Exposed for openSlides() sign-in row handler.
  window.openCloudDrawer = openDrawer;
})();
