import firebase from "firebase"
import "firebase/firestore"
import uuid from "uuid";

import { firebaseConfig } from "../config/db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const productRef = firestore.collection('products')


export const addProduct = async (body, uri) => {
    try {
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

        let newBody = { ...body };
        newBody.image = ImageUrl

        return await productRef.add(newBody);
    } catch (error) {
        console.log("Product Service Error: ", error)
    }
}

export const getProducts = async () => {
    const snapshot = await productRef.get();
    if (snapshot.empty) {
        return false;
    }

    let res = []
    snapshot.forEach(doc => {
        let tempRes = doc.data()
        tempRes.docId = doc.id
        res.push(tempRes)
    });

    return res;
}

export const getProductRef = async () => {
    return productRef;
}