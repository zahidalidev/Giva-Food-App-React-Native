import firebase from "firebase"
import "firebase/firestore"

import { firebaseConfig } from "../config/db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const userRef = firestore.collection('users')


export const addUser = async (body) => {
    const snapshot = await userRef.where('email', '==', body.email).get();
    if (snapshot.empty) {
        return await userRef.add(body);
    }
    return false;
}

export const loginUser = async (email, password, notificationToken) => {
    const snapshot = await userRef.where('email', '==', email).where('password', '==', password).get();
    if (snapshot.empty) {
        return false;
    }

    let res = ''
    let id = '';
    snapshot.forEach(doc => {
        res = doc.data()
        id = doc.id
    });

    if (res.role === 'admin' || res.role === 'rider' || res.role === 'restaurant') {
        try {
            await userRef.doc(id).update({ notificationToken: notificationToken })
            return res
        } catch (error) {
            return false
        }
    } else {
        return res;
    }
}