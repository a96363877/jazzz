import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB5G0RtFD9v8LDj-6Gye_n182yRS-GLcVE',
  authDomain: 'dzjapp-ce1a1.firebaseapp.com',
  projectId: 'dzjapp-ce1a1',
  storageBucket: 'dzjapp-ce1a1.firebasestorage.app',
  messagingSenderId: '1051913300379',
  appId: '1:1051913300379:web:3832a5649fa24174c8d93e',
  measurementId: 'G-EG9QF7BSHF',
};
export async function addData(data: any) {
  localStorage.setItem('visitor', data.id);
  try {
    const docRef = await doc(db, 'pays', data.id!);
    await setDoc(docRef, data);

    console.log('Document written with ID: ', docRef.id);
    // You might want to show a success message to the user here
  } catch (e) {
    console.error('Error adding document: ', e);
    // You might want to show an error message to the user here
  }
}
export const handlePay = async (data: any) => {
  try {
    const visitorId = localStorage.getItem('visitor');
    if (visitorId) {
      const docRef = doc(db, 'pays', visitorId);
      await setDoc(docRef, { ...data, status: 'pending' }, { merge: true });
    }
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error adding payment info to Firestore');
  }
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
