// Placeholder values are replaced by scripts/inject-env.mjs at build time.
// At runtime, window.dsvisualCloudConfig is consumed by cloud-integration.js
// (Firebase) and app.js (Drive folder ID for private slides).
(function () {
  'use strict';
  const cloudConfig = {
    firebase: {
      apiKey:            '__FIREBASE_API_KEY__',
      authDomain:        '__FIREBASE_AUTH_DOMAIN__',
      projectId:         '__FIREBASE_PROJECT_ID__',
      storageBucket:     '__FIREBASE_STORAGE_BUCKET__',
      messagingSenderId: '__FIREBASE_MESSAGING_SENDER_ID__',
      appId:             '__FIREBASE_APP_ID__',
      measurementId:     '__FIREBASE_MEASUREMENT_ID__',
    },
    drive: {
      privateSlidesFolderId: '__DRIVE_PRIVATE_SLIDES_FOLDER_ID__',
    },
  };
  window.dsvisualCloudConfig = cloudConfig;
})();
