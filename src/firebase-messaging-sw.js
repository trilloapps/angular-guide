

importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfrqkb624X9THB5LxM_cgJ695hbfpfSaQ",
  authDomain: "apps-demo-2-402107.firebaseapp.com",
  projectId: "apps-demo-2-402107",
  storageBucket: "apps-demo-2-402107.appspot.com",
  messagingSenderId: "719788448180",
  appId: "1:719788448180:web:8d10f5123f237ac16e7ae1",
  measurementId: "G-M5G0BPWW0M"
};
const messaging = firebase.messaging();