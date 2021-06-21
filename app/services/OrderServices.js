import firebase from "firebase"
import "firebase/firestore"

import { firebaseConfig } from "../config/db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const orderRef = firestore.collection('orders')


export const orderCart = async (body) => {
    return await orderRef.add(body);
}

export const loginUser = async (email, password, notificationToken) => {
    const snapshot = await orderRef.where('email', '==', email).where('password', '==', password).get();
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
            await orderRef.doc(id).update({ notificationToken: notificationToken })
            return res
        } catch (error) {
            return false
        }
    }


}