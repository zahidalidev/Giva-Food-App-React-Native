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


export const getOrderRef = async () => {
    return orderRef;
}

export const getAllNewOrders = async () => {
    const snapshot = await orderRef.get();
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

export const updateOrder = async (id, body) => {
    try {
        await orderRef.doc(id).update(body)
        return true;
    } catch (error) {
        return false
    }
}

export const deleteOrder = async (id) => {
    try {
        await orderRef.doc(id).delete()
        return true;
    } catch (error) {
        return false
    }
}
