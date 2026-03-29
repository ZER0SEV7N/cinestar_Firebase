//Script para mostrar los datos y mapearlos dentro del HTML
import { getPeliculas, getCines, getCine, getPelicula } from "./getFunction.js";

//Declara el evento DOMContentLoaded para cargar los datos
document.addEventListener("DOMContentLoaded", async () => {
    const ruta = window.location.pathname;
    const contenido = document.getElementById("contenido-interno");

    //Obtener los parametros
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!contenido) return;

    //Mostrar ruta de cines
    if (ruta.includes("cines.html"))  
        renderCines(contenido);
    //Mostrar ruta de cine en especifico por su id
    else if (ruta.includes("cine.html") && id) 
        renderCine(contenido, id);
    //Mostrar ruta de peliculas
    else if (ruta.includes("peliculas.html") && id) 
        renderPeliculas(contenido, id);
    //Mostrar ruta de pelicula en especifico por su id
    else if (ruta.includes("pelicula.html") && id) 
        renderPelicula(contenido, id);

    //Funcion para renderizar cines.html
    async function renderCines(contenido) {
        contenido.innerHTML = "<br/><h1>Nuestros Cines</h1><br/><p>Cargando cines...</p>";
        const cines = await getCines();
        let cinesHTML = "<br/><h1>Nuestros Cines</h1><br/>";  
        cines.forEach((cine) => {
        cinesHTML += `<div class="contenido-cine">
                        <img src="https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/cine/${cine.id}.1.jpg" width="227" height="170" onerror="this.src='https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/cine/9.2.jpg'"/>
                        <div class="datos-cine">
                            <h4>${cine.RazonSocial}</h4><br/>
                            <span>${cine.Direccion} - ${cine.Distrito}<br/><br/>Teléfono: ${cine.Telefonos}</span>
                        </div>
                        <br/>
                        <a href="cine.html?id=${cine.idFirebase}">
                            <img src="https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/varios/ico-info2.png" width="150" height="40"/>
                        </a>
                    </div>`;
        });
        contenido.innerHTML = cinesHTML;      
    }

    //Funcion para renderizar cine.html
    async function renderCine(contenido, id) {
        contenido.innerHTML = "<p>Cargando información del cine...</p>";
        const cine = await getCine(id);
        if (!cine) {
            contenido.innerHTML = "<p>Cine no encontrado.</p>";
            return;
        }
        let cineHtml = `<h2>${cine.RazonSocial}</h2>
                        <div class="cine-info">
                            <div class="cine-info datos">
                                <p>${cine.Direccion} - ${cine.Ciudad}</p>
                                <p>Teléfono: ${cine.Telefonos}</p><br/>
                                <div class="tabla">`;
        if (cine.tarifas) {
            cine.tarifas.forEach((tarifa, index) => {
            const claseExtra = index % 2 !== 0 ? " impar" : "";
            cineHtml += `<div class="fila${claseExtra}">
                            <div class="celda-titulo">${tarifa.DiasSemana}</div>
                            <div class="celda">${tarifa.Precio}</div>
                        </div>`;
            });
        }
        cineHtml += `</div>
                    <div class="aviso">
                        <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
                    </div>
                </div>
                <img src="https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/cine/${cine.id}.2.jpg" onerror="this.src='https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/cine/9.2.jpg'"/>
                <br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
                
                <div class="cine-info peliculas">
                    <div class="tabla">
                        <div class="fila">
                            <div class="celda-cabecera">Películas</div>
                            <div class="celda-cabecera">Horarios</div>
                        </div>`;

        //Renderizar las películas del cine
        if (cine.peliculas) {
            cine.peliculas.forEach((pelicula, index) => {
            const claseExtra = index % 2 !== 0 ? " impar" : "";
            cineHtml += `<div class="fila${claseExtra}">
                            <div class="celda-titulo">${pelicula.Titulo}</div>
                            <div class="celda">${pelicula.Horarios}</div>
                        </div>`;
            });
        }
        cineHtml += `</div>
                </div>
            </div>
            
            <div>
                <img style="float:left;" src="https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/cine/${cine.id}.3.jpg" alt="Imagen del cine" onerror="this.src='https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/cine/1.3.jpg'"/>
                <span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
                    Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
                    <br/><br/>
                    Visitános y diviértete con nosotros. 
                    <br/><br/>
                    <b>CINESTAR</b>, siempre pensando en tí. 
                </span>     
            </div>`;
            
        contenido.innerHTML = cineHtml;
    }

    async function renderPeliculas(contenido, id) {
        const tituloSeccion = id === "2" ? "Próximos Estrenos" : "Cartelera";
        contenido.innerHTML = `<br/><h1>${tituloSeccion}</h1><br/><p>Cargando películas...</p>`;
        let peliculas = await getPeliculas();

        if (id) peliculas = peliculas.filter(peli => peli.idEstado == id);
        let peliculasHTML = `<br/><h1>${tituloSeccion}</h1><br/>`;

        if (peliculas.length === 0) {
            peliculasHTML += `<p>No hay películas disponibles en esta categoría.</p>`;
        } else {
            //Dibujamos las películas filtradas
            peliculas.forEach((pelicula) => {
                peliculasHTML += `
                <div class="contenido-pelicula">
                    <div class="datos-pelicula">
                        <h2>${pelicula.Titulo}</h2><br/>
                        <p>${pelicula.Sinopsis.substring(0, 150)}...</p>
                        <br/>
                        <div class="boton-pelicula"> 
                            <a href="pelicula.html?id=${pelicula.idFirebase}">
                                <img src="https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                            </a>
                        </div>
                        <div class="boton-pelicula"> 
                            <a href="https://www.youtube.com/v/${pelicula.Link}" target=_blank>
                                <img src="https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                            </a>
                        </div> 
                    </div>
                    <img src="https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/pelicula/${pelicula.id}.jpg" width="160" height="226" onerror="this.src='https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/varios/logo-cinestar.png'"/><br/><br/>
                </div>`;
            });
        }
        contenido.innerHTML = peliculasHTML;
    }

    async function renderPelicula(contenido, id) {
        contenido.innerHTML = '<p>Cargando película...</p>';
        const peli = await getPelicula(id);

        if (peli) {
            contenido.innerHTML = `
                <br/><h1>Cartelera</h1><br/>
                <div class="contenido-pelicula">
                    <div class="datos-pelicula">
                        <h2>${peli.Titulo}</h2>
                        <p>${peli.Sinopsis}</p>
                        <br/>
                        <div class="tabla">
                            <div class="fila"><div class="celda-titulo">Estreno :</div><div class="celda">${peli.FechaEstrenoss}</div></div>
                            <div class="fila"><div class="celda-titulo">Género :</div><div class="celda">${peli.Geneross}</div></div>
                            <div class="fila"><div class="celda-titulo">Director :</div><div class="celda">${peli.Director}</div></div>
                            <div class="fila"><div class="celda-titulo">Reparto :</div><div class="celda">${peli.Reparto}</div></div>
                        </div>
                    </div>
                    <img src="https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/pelicula/${peli.id}.jpg" width="160" height="226" onerror="this.src='https://cpustmhgruetioqfyqye.supabase.co/storage/v1/object/public/cinestar/img/varios/logo-cinestar.png'"><br/><br/>
                </div>
                <div class="pelicula-video">
                    <embed src="https://www.youtube.com/v/${peli.Link}fs" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
                </div>
            `;
        } else 
            contenido.innerHTML = '<p>Película no encontrada.</p>';
    }
});
