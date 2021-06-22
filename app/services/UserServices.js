import firebase from "firebase"
import "firebase/firestore"
import { SentNotification } from "../components/common/SendNotification";

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

    let res = {}
    snapshot.forEach(doc => {
        res = doc.data()
        res.docId = doc.id
    });

    if (res.role === 'admin' || res.role === 'rider' || res.role === 'restaurant') {
        try {
            await userRef.doc(res.docId).update({ notificationToken: notificationToken })

            const snapshot2 = await userRef.where('email', '==', email).where('password', '==', password).get();
            if (snapshot2.empty) {
                return false;
            }

            let res2 = {}
            snapshot2.forEach(doc => {
                res2 = doc.data()
                res2.docId = doc.id
            });

            return res2;

        } catch (error) {
            return false
        }
    } else {
        return res;
    }
}

export const updateUser = async (id, body) => {
    try {
        await userRef.doc(id).update(body)

        const snapshot2 = await userRef.where('email', '==', body.email).where('password', '==', body.password).get();
        if (snapshot2.empty) {
            return false;
        }

        let res2 = {}
        snapshot2.forEach(doc => {
            res2 = doc.data()
            res2.docId = doc.id
        });

        return res2;
    } catch (error) {
        return false
    }
}

export const getRiderPushTokens = async (role) => {
    const snapshot2 = await userRef.where('role', '==', role).get();
    if (snapshot2.empty) {
        return false;
    }

    let res2 = []
    snapshot2.forEach(doc => {
        let temp = doc.data();
        if (temp.notificationToken) {
            let body = {
                "to": temp.notificationToken,
                "sound": "default",
                "body": "You have a new Order!"
            }
            res2.push(body)
        }
    });

    try {
        await SentNotification(res2)
        return true
    } catch (error) {
        return false
    }
}