//Llamar a la base de datos de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

//Configuración de firebase
const firebaseConfig = {
    apiKey: "",
    authDomain: "daniel-cinestar.",
    projectId: "daniel-cinestar",
    storageBucket: "daniel-cinestar",
    messagingSenderId: "",
    appId: ""
  };

//Inicializar la aplicación de firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Exportar la base de datos para usarla en otros archivos
export default db;
