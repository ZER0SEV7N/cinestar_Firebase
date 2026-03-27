//Script para las funciones GET y mapeo de la colección de firebase
import db from "./Connection.js";
import { collection, getDocs, doc, getDoc, orderBy } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

//Funcion para obtener todas las peliculas
export async function getPeliculas() {
    try {
        const peliculasRef = collection(db, "peliculas");
        const snapshot = await getDocs(peliculasRef);
        return snapshot.docs.map(doc => ({ 
                idFirebase: doc.id, 
                ...doc.data() 
            }));
    } catch (error) {
        console.error("Error al obtener las peliculas:", error);
        return [];
    }
}

//Funcion para obtener todos los cines
export async function getCines() {
    try{
        const cinesRef = collection(db, "cines");
        const snapshot = await getDocs(cinesRef);
        const cines = snapshot.docs.map(doc => ({
            idFirebase: doc.id,
            ...doc.data()
        }));
        return cines.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    } catch (error) {
        console.error("Error al obtener los cines:", error);
        return [];
    }
}

//Funcion para obtener un cine por su id
export async function getCine(id) {
    try {
        const cinesRef = doc(db, "cines", id);
        const docSnap = await getDoc(cinesRef);
        if (docSnap.exists()) 
            return { idFirebase: docSnap.id, ...docSnap.data() };
        return null;
    } catch (error) {
        console.error("Error al obtener el cine:", error);
        return null;
    }
}

//Funcion para obtener una pelicula por su id
export async function getPelicula(id) {
    try {
        const peliculasRef = doc(db, "peliculas", id);
        const docSnap = await getDoc(peliculasRef);
        if (docSnap.exists()) 
            return { idFirebase: docSnap.id, ...docSnap.data() };
        return null;
    } catch (error) {
        console.error("Error al obtener la pelicula:", error);
        return null;
    }
}