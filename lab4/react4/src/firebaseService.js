import { db } from './firebase-config.js'; 
import { collection, getDocs } from 'firebase/firestore';
import { storage } from './firebase-config.js';
import { ref, getDownloadURL } from 'firebase/storage';

export const fetchData = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log("Fetched data from Firebase:", data);
  return data;
};
export const fetchImageURL = async (image) => {
  try {
      const storageRef = ref(storage, image);
      const url = await getDownloadURL(storageRef);
      return url;
  } catch (error) {
      console.error("Error fetching image URL:", error);
      return null;
  }
};

