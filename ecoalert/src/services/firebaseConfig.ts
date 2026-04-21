import { initializeApp } from "firebase/app";
//@ts-ignore
import {initializeAuth, getReactNativePersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDF5oDgoCAiOs_rznoP1Pw8Q4RB2NplFkU",
  authDomain: "todolist-79753.firebaseapp.com",
  projectId: "todolist-79753",
  storageBucket: "todolist-79753.firebasestorage.app",
  messagingSenderId: "391033211067",
  appId: "1:391033211067:web:0efec1b63ad8e280f8019e"
};

const app = initializeApp(firebaseConfig);

// LÓGICA UNIVERSAL: Celular vs Navegador
const persistence = Platform.OS === 'web' 
  ? browserLocalPersistence 
  : getReactNativePersistence(AsyncStorage);

export const auth = initializeAuth(app, {
  persistence
});

export const db = getFirestore(app);
export const storage = getStorage(app);