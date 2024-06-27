import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "@/configs/firebase-adminsdk.json"; // 실제 경로로 변경

const firebaseApp = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const firestoreDB: Firestore = getFirestore(firebaseApp);

export { firebaseApp, firestoreDB as firestore };
