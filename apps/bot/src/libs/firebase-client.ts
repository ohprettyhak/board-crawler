import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "@/configs/firebase-adminsdk.json";

const firebaseApp = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const firestoreDB: Firestore = getFirestore(firebaseApp);

export { firebaseApp, firestoreDB as firestore };
