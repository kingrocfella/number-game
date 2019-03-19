import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: "AIzaSyDEsflhhk_lOZ6XX1iGa7Cg0LivzuVxcLs",
  authDomain: "chatapp-2ce31.firebaseapp.com",
  databaseURL: "https://chatapp-2ce31.firebaseio.com",
  projectId: "chatapp-2ce31",
  storageBucket: "chatapp-2ce31.appspot.com",
  messagingSenderId: "664645456389"
});

export const db = app.database();
export const playerRef = db.ref('playerRef');
export const databaseDel = "https://chatapp-2ce31.firebaseio.com/.json";


















