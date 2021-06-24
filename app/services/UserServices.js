import firebase from "firebase"
import "firebase/firestore"
import { SentNotification } from "../components/common/SendNotification";
import uuid from "uuid";

import { firebaseConfig } from "../config/db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const userRef = firestore.collection('users')


export const addUser = async (body, type, uri) => {
    if (type != 'rider') {
        const snapshot = await userRef.where('email', '==', body.email).get();
        if (snapshot.empty) {
            return await userRef.add(body);
        }
        return false;
    } else {
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

        return await userRef.add({ ...body, ImageUrl });
    }
}

export const loginUser = async (email, password, notificationToken) => {
    const snapshot = await userRef.where('email', '==', email).where('password', '==', password).get();
    if (snapshot.empty) {
        // console.log('res: ', email, password)
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
                "title": "Order!",
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

export const getAllNewRes = async () => {
    const snapshot2 = await userRef.where('role', '==', 'restaurant').get();
    if (snapshot2.empty) {
        return false;
    }

    let res2 = []
    snapshot2.forEach(doc => {
        let temp = doc.data()
        let temp2 = {}
        temp2.label = temp.name;
        temp2.value = temp.name;
        temp2.email = temp.email;
        res2.push(temp2)
    });

    return res2;

}

export const getUserRef = async () => {
    return userRef;
}