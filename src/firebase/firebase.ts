import admin from 'firebase-admin';
import serviceAccount from './nitelog-1e1a5-firebase-adminsdk-3gzzr-03e3931d7b.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const db = admin.firestore();