const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./firebase_admin_cred.json');

initializeApp({
  credential: cert(serviceAccount)
});

async function run() {
  try {
    const [buckets] = await getStorage().bucket('dummy').storage.getBuckets();
    console.log("Buckets:", buckets.map(b => b.name));
    
    for (let b of buckets) {
      console.log("Setting CORS for", b.name);
      await b.setCorsConfiguration([
        {
          origin: ['*'],
          method: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
          responseHeader: ['Content-Type', 'Authorization', 'Content-Length', 'User-Agent', 'x-goog-resumable'],
          maxAgeSeconds: 3600
        }
      ]);
      console.log("CORS updated successfully for", b.name);
    }
  } catch(e) {
    console.error("Failed", e.message);
  }
}
run();
