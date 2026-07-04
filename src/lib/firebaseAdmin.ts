/**
 * Firebase Admin SDK — server-only
 * Uses service account credentials to bypass ALL Firestore security rules.
 * Never import this in client components.
 */
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let adminApp: App;
let adminDb: Firestore;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const credJson = process.env.GOOGLE_CREDENTIALS_JSON;
  if (!credJson) {
    throw new Error("GOOGLE_CREDENTIALS_JSON env variable is not set");
  }

  const cred = JSON.parse(credJson);

  adminApp = initializeApp({
    credential: cert({
      projectId: cred.project_id,
      clientEmail: cred.client_email,
      privateKey: cred.private_key,
    }),
    projectId: cred.project_id,
  });

  return adminApp;
}

export function getAdminDb(): Firestore {
  if (!adminDb) {
    adminDb = getFirestore(getAdminApp());
  }
  return adminDb;
}
