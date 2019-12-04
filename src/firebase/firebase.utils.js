import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBI_gm-O-FF0gKIyp55omllWeMGiGBHX4c",
    authDomain: "crowndb-d2c3f.firebaseapp.com",
    databaseURL: "https://crowndb-d2c3f.firebaseio.com",
    projectId: "crowndb-d2c3f",
    storageBucket: "crowndb-d2c3f.appspot.com",
    messagingSenderId: "572643122029",
    appId: "1:572643122029:web:a03c213b86a7d01653d864"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log(userAuth);
    if (!userAuth) return;
    console.log(`users/${userAuth.uid}`);
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot._document) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch ( error ) {
            console.log('error creating user');
        }
    }
    console.log(userRef);
    console.log(snapShot);
    // console.log(firestore. doc('users/8f9j4i'));
    
    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);