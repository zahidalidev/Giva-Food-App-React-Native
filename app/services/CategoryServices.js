import firebase from "firebase"
import "firebase/firestore"
import { getStorage, ref, uploadString } from "firebase/storage"
// import storage from '@react-native-firebase/storage';
import uuid from "uuid";

import { firebaseConfig } from "../config/db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const categoryRef = firestore.collection('categories')

function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hou = `${date.getHours()}`
    const min = `${date.getMinutes()}`
    const sec = `${date.getSeconds()}`
    return `${year}${month}${day}${hou}${min}${sec}`
}

export const addCategory = async (title, uri) => {
    // let imagePath = `givaAssets/${getDateString()}.png`;
    // let storageRef = firebase.storage().ref(imagePath)
    // var storage = firebase.storage();
    // var storageRef = storage.ref(imagePath);

    // imagesRef = spaceRef.parent;
    // let reference = storage().ref();

    // var uploadTask = storageRef.child('images/rivers.jpg').put(categoryImage);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    // Create a root reference
    // var storageRef = firebase.storage().ref();

    // // Create a reference to 'mountains.jpg'
    // var mountainsRef = storageRef.child('mountains.jpg');

    // // Create a reference to 'images/mountains.jpg'
    // var mountainImagesRef = storageRef.child('images/mountains.jpg');

    // // While the file names are the same, the references point to different files
    // mountainsRef.name === mountainImagesRef.name;           // true
    // mountainsRef.fullPath === mountainImagesRef.fullPath;

    // const storage = getStorage();
    // const storageRef = ref(storage, 'some-child');

    // firebase.storage().ref('givaAssets/naasazadme.text').putString(categoryImage.base64).then(function (snapshot) {
    //     console.log('Uploaded a base64 string!');
    // }).catch(e => console.log(e));
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const ref = firebase.storage().ref().child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    const resahgs = await snapshot.ref.getDownloadURL();
    console.log(resahgs)

    // firebase.storage().ref('givaAssets').child('file_name.png')
    //     .putString(categoryImage.base64);
    // console.log("new: ", categoryImage.base64)
    // firebase.storage().ref().child('givaAssets').putString(categoryImage.base64, 'base64', { contentType: 'image/jpg' })
    // const message = 'This is my message.';
    // uploadString(storageRef, message, 'base64').then((snapshot) => {
    //     console.log('Uploaded a base64 string!');
    // });


    // let blob = uriToBlob(categoryImage.uri)
    // console.log("tye: ", blob)

    // storageRef.put(blob).then((snapshot) => {
    //     console.log('Uploaded a base64 string!');
    // }).catch(erro => console.log(erro));
    // uploadTask.on('state_changed',
    //     (snapshot) => {
    //         // Observe state change events such as progress, pause, and resume
    //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log('Upload is ' + progress + '% done');
    //         switch (snapshot.state) {
    //             case firebase.storage.TaskState.PAUSED: // or 'paused'
    //                 console.log('Upload is paused');
    //                 break;
    //             case firebase.storage.TaskState.RUNNING: // or 'running'
    //                 console.log('Upload is running');
    //                 break;
    //         }
    //     },
    //     (error) => {
    //         // Handle unsuccessful uploads
    //     },
    //     () => {
    //         // Handle successful uploads on complete
    //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //             console.log('File available at', downloadURL);
    //         });
    //     }
    // );


    try {

        // const snapshot = await categoryRef.where('label', '==', title).get();
        if (snapshot.empty) {

            // storageRef.child(imagePath).put(categoryImage, {
            //     contentType: 'image/jpeg'
            // }).then((snapshot) => {
            //     console.log('Image uploaded to the bucket!');

            // }).catch((error) => {
            //     console.log(error);
            // });


            // let task = storageRef.put(categoryImage, 'base64')
            // task.then(() => {
            //     console.log('Image uploaded to the bucket!');
            // }).catch((e) => {
            //     console.log('uploading image error => ', e);
            // });

            // return await categoryRef.add({ label: title, value: title, imagePath });
        }
        return false;
    } catch (error) {
        return false;
    }
}

export const getCategories = async () => {
    return categoryRef;
}


const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // return the blob
            resolve(xhr.response);
        };

        xhr.onerror = function () {
            // something went wrong
            reject(new Error('uriToBlob failed'));
        };
        // this helps us get a blob
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);

        xhr.send(null);
    });
}


