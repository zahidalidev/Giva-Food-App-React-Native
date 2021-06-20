import firebase from "firebase"
import "firebase/firestore"

import { firebaseConfig } from "../config/db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const categoryRef = firestore.collection('categories')


export const addCategory = async (title) => {
    const snapshot = await categoryRef.where('label', '==', title).get();
    if (snapshot.empty) {
        return await categoryRef.add({ label: title, value: title });
    }
    return false;
}

export const getCategories = async () => {
    return categoryRef;
    // const snapshot = await categoryRef.get()
    // snapshot.forEach(doc => {
    //     categories.push(doc.data())

    // });
    // return categoryRef;
    // return await categoryRef.onSnapshot((querySnapshot) => {
    //     let groups = querySnapshot.docChanges().map(({ doc }) => {
    //         const group = doc.data();
    //         console.log("group: ", group);
    //         categories.push(group)
    //     })
    //     // })
    //     return categories;
    // })
}
