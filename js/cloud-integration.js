// Firebase Auth wrapper for dsvisual. Singleton — same instance across calls.
// Exposes window.cloudClient() and window.DRIVE_SCOPES.
// When Firebase SDK is not loaded, or origin is file://, or
// dsvisualCloudConfig is missing/incomplete, returns a stub client with no-op
// methods (getUser/getAccessToken → null, sign-in → throws).
(function () {
  'use strict';

  const DRIVE_SCOPES = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.readonly',
  ];

  const REQUIRED_FIREBASE_KEYS = ['apiKey', 'authDomain', 'projectId', 'appId'];

  let cachedClient = null;

  function getMissingKeys(fb) {
    return REQUIRED_FIREBASE_KEYS.filter((k) => !fb || !fb[k] || /^__.+__$/.test(fb[k]));
  }

  function stubClient(errorMessage) {
    const reject = async () => { throw new Error(errorMessage); };
    return {
      isConfigured: false,
      missingReason: errorMessage,
      getUser()        { return null; },
      getAccessToken() { return null; },
      subscribeAuthState(cb) { cb(null); return () => {}; },
      signInWithGoogle: reject,
      signOutGoogle:    reject,
    };
  }

  function buildClient() {
    const config = (typeof window !== 'undefined' && window.dsvisualCloudConfig) || null;
    const fbCfg = config && config.firebase;

    if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
      return stubClient('Google OAuth requires http:// or https:// — not file://.');
    }
    const missing = getMissingKeys(fbCfg);
    if (missing.length) {
      return stubClient('Firebase config incomplete: missing ' + missing.join(', '));
    }
    const firebase = (typeof window !== 'undefined') ? window.firebase : null;
    if (!firebase || typeof firebase.initializeApp !== 'function') {
      return stubClient('Firebase SDK not loaded.');
    }

    const app = firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(fbCfg);
    const auth = firebase.auth(app);
    let driveAccessToken = null;

    return {
      isConfigured: true,
      missingReason: '',
      getUser() { return auth.currentUser; },
      getAccessToken() { return driveAccessToken; },
      subscribeAuthState(cb) { return auth.onAuthStateChanged(cb); },
      async signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        DRIVE_SCOPES.forEach((s) => provider.addScope(s));
        const result = await auth.signInWithPopup(provider);
        const credential = result && result.credential;
        driveAccessToken = (credential && credential.accessToken) || null;
        return { user: result.user, hasDriveToken: Boolean(driveAccessToken) };
      },
      async signOutGoogle() {
        driveAccessToken = null;
        await auth.signOut();
      },
    };
  }

  function cloudClient() {
    if (cachedClient) return cachedClient;
    cachedClient = buildClient();
    return cachedClient;
  }

  window.cloudClient = cloudClient;
  window.DRIVE_SCOPES = DRIVE_SCOPES;
})();
