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
    try {

        const snapshot = await categoryRef.where('label', '==', title).get();
        if (snapshot.empty) {

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

            const ImageUrl = await snapshot.ref.getDownloadURL();

            return await categoryRef.add({ label: title, value: title, ImageUrl });
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


