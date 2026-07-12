const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const fs = require('fs');

const serviceAccount = require('./firebase_admin_cred.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'vishwaleader-techmedia.firebasestorage.app'
});

async function run() {
  const bucket = getStorage().bucket();
  console.log("Bucket initialized:", bucket.name);
  try {
    const [files] = await bucket.getFiles({ maxResults: 1 });
    console.log("Files:", files.map(f => f.name));
    
    // Check CORS Configuration
    const [cors] = await bucket.getCors();
    console.log("CORS Configuration:", JSON.stringify(cors, null, 2));

    if (!cors || cors.length === 0) {
      console.log("Setting CORS...");
      await bucket.setCorsConfiguration([
        {
          origin: ['*'],
          method: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
          responseHeader: ['Content-Type', 'Authorization', 'Content-Length', 'User-Agent', 'x-goog-resumable'],
          maxAgeSeconds: 3600
        }
      ]);
      console.log("CORS updated successfully!");
    }
  } catch(e) {
    console.error("firebasestorage.app failed", e.message);
  }
}
run();
