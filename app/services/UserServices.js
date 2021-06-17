import firebase from "firebase"
import "firebase/firestore"

import { firebaseConfig } from "../config/db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const userRef = firestore.collection('users')


export const addUser = async (body) => {
    return await userRef.add(body);
}

export const loginUser = async (email, password) => {
    const snapshot = await userRef.where('email', '==', email).where('password', '==', password).get();
    if (snapshot.empty) {
        return false;
    }

    let res = []
    snapshot.forEach(doc => {
        res.push(doc.data())
    });

    return res[0]
}