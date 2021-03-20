import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC4XX0GXFjuPmLuKprRQUNx2qSFfzstmDw",
  authDomain: "register-form-internship-task.firebaseapp.com",
  projectId: "register-form-internship-task",
  storageBucket: "register-form-internship-task.appspot.com",
  messagingSenderId: "845546898317",
  appId: "1:845546898317:web:1491ac6ef6752f547bf3c4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
