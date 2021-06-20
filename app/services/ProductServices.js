import firebase from "firebase"
import "firebase/firestore"

import { firebaseConfig } from "../config/db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const productRef = firestore.collection('products')


export const addProduct = async (body) => {
    return await productRef.add(body);
}

export const getProducts = async () => {
    return productRef;
}
