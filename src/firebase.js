import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACqm6U0IInPrLQNYtIMxAorXLrg6H5FwY",
    authDomain: "i-want-something.firebaseapp.com",
    databaseURL: "https://i-want-something.firebaseio.com",
    projectId: "i-want-something",
    storageBucket: "i-want-something.appspot.com",
    messagingSenderId: "974716971411",
    appId: "1:974716971411:web:8b6d5b91eeffa9ba602066"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email, displayName } = user;
        try {
            await userRef.set({
                displayName,
                email,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};


const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();

        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};


export const getPatientDocument = async pid => {
    if (!pid) return null;
    try {
        const userDocument = await firestore.doc(`patients/${pid}`).get();

        return {
            id: pid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching Patient", error);
    }
};

export default firebase.firestore();