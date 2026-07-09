require('dotenv').config({ path: '.env.development.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, limit, query } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

async function test() {
    try {
        const db1 = getFirestore(app);
        console.log('Testing (default)...');
        await getDocs(query(collection(db1, 'users'), limit(1)));
        console.log('db1 (default) success');
    } catch(e) {
        console.error('db1 error:', e.message);
    }
    
    try {
        const db2 = getFirestore(app, 'default');
        console.log('Testing "default"...');
        await getDocs(query(collection(db2, 'users'), limit(1)));
        console.log('db2 "default" success');
    } catch(e) {
        console.error('db2 error:', e.message);
    }
    process.exit(0);
}

test();
