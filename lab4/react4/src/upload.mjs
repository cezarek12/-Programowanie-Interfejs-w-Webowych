import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import hotels from './data.mjs';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };
import { readFileSync } from 'fs';
import { basename } from 'path';

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'piwo-react-lab-4.appspot.com'
});

const db = getFirestore();
const storage = getStorage();

const uploadImage = async (filePath) => {
  const bucket = storage.bucket();
  const fileName = basename(filePath);
  const file = bucket.file(fileName);

  await file.save(readFileSync(filePath));
  await file.makePublic();

  return file.publicUrl();
};

const uploadHotels = async () => {
  const hotelsCollection = db.collection('hotels');
  for (const hotel of hotels) {
    if (hotel.imagePath) {
      try {
        hotel.imageUrl = await uploadImage(hotel.imagePath);
      } catch (error) {
        console.error(`Error uploading image for hotel ${hotel.name}:`, error);
        continue;
      }
    }
    const docRef = hotelsCollection.doc();
    await docRef.set(hotel);
    console.log(`Hotel ${hotel.name} added to Firestore.`);
  }
};

uploadHotels()
  .then(() => console.log('All hotels have been uploaded.'))
  .catch(error => console.error('Error uploading hotels:', error));


uploadHotels()
  .then(() => console.log('All hotels have been uploaded.'))
  .catch(error => console.error('Error uploading hotels:', error));



// import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
// import { getFirestore } from 'firebase-admin/firestore';
// import  hotels  from './data.mjs';
// import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };
// initializeApp({
//   credential: cert(serviceAccount)
// });

// const db = getFirestore();

// const uploadHotels = async () => {
//   const hotelsCollection = db.collection('hotels');
//   for (const hotel of hotels) {
//     const docRef = hotelsCollection.doc();
//     await docRef.set(hotel);
//     console.log(`Hotel ${hotel.name} added to Firestore.`);
//   }
// };

// uploadHotels()
//   .then(() => console.log('All hotels have been uploaded.'))
//   .catch(error => console.error('Error uploading hotels:', error));
