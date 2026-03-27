//Llamar a la base de datos de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

//Configuración de firebase
const firebaseConfig = {
    apiKey: "AIzaSyCF1y2VVaFyL9gsxUhBHgL6guGWq1Awhtw",
    authDomain: "daniel-cinestar.firebaseapp.com",
    projectId: "daniel-cinestar",
    storageBucket: "daniel-cinestar.firebasestorage.app",
    messagingSenderId: "513375357028",
    appId: "1:513375357028:web:60c8e682287950eb4e3771"
  };

//Inicializar la aplicación de firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Exportar la base de datos para usarla en otros archivos
export default db;
