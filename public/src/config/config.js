import * as firebase from 'firebase'
const DB_config = {
    apiKey: "AIzaSyBDxAI-esy5CF0gfMLNcrx8ucJJBs-GU8A",
    authDomain: "bit-exercise.firebaseapp.com",
    databaseURL: "https://bit-exercise.firebaseio.com",
    projectId: "bit-exercise",
    storageBucket: "bit-exercise.appspot.com",
    messagingSenderId: "389491030361"
};
firebase.initializeApp(DB_config);

export const database = firebase.database()