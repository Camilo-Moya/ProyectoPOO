class LugarBogota {
    #visitas = 0;
    
    constructor(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
    }
    mostrar() {
        console.log("LugarBogota");
        console.log(this.nombre);
        console.log(this.tipo);
    }
}

let lugar1 = new LugarBogota("Monserrate", "Cerro");
let lugar2 = new LugarBogota("Parque Simón Bolívar", "Parque");
let lugar3 = new LugarBogota("Torre Colpatria", "Edificio");

lugar1.mostrar();
lugar2.mostrar();
lugar3.mostrar();

class LugarTuristico extends LugarBogota {
    constructor(nombre, tipo, descripcion) {
        super(nombre, tipo);
    }
//polimorfismo
    mostrar() {
        console.log("LugarTuristico");
        console.log(this.nombre);
        console.log(this.tipo);
    }
}

let monserrate = new LugarTuristico("Monserrate", "Cerro");
monserrate.mostrar();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => {
            console.log("Service Worker Registrado Correctamente");
        })
        .catch((er) =>  {
            console.log("Error al registrar el Service Worker")
        });
}



//Arreglo de lugares Turísticos

    let lugares = [{
        id: 1,
        nombre: "Monserrate",
        tipo: "Cerro",
        imagen: "IMAGES/Monserrate.jpeg",
        descripcion: "Es un cerro que se encuentra en la ciudad de Bogotá, Colombia. Es uno de los principales atractivos turísticos de la ciudad y ofrece una vista panorámica impresionante de Bogotá desde su cima. En la cima del cerro se encuentra el Santuario del Señor Caído de Monserrate, un lugar de peregrinación y devoción religiosa."
    }, {
        id: 2,
        nombre: "Parque Simón Bolívar",
        tipo: "Parque",
        imagen: "IMAGES/SimonBolivar.jpeg",
        descripcion: "El Parque Metropolitano Simón Bolívar es el parque urbano más grande e importante de Bogotá, considerado el principal pulmón verde de la ciudad. Ubicado en la localidad de Teusaquillo, ofrece un ambiente amplio y natural ideal tanto para el descanso como para el deporte y eventos masivos."
    }, {
        id: 3,
        nombre: "Torre Colpatria",
        tipo: "Edificio",
        imagen: "IMAGES/Colpatria.jpeg",
        descripcion: "La Torre Colpatria es uno de los rascacielos más emblemáticos de Bogotá y un ícono arquitectónico ubicado en el Centro Internacional, sobre la Carrera 7. Con 50 pisos y cerca de 196 metros de altura, es reconocida tanto por su actividad empresarial como por su famoso mirador panorámico en la azotea."
    }];

    //Contenedores

    const contenedor = document.getElementById("lugares");
    const detalle = document.getElementById("detalle");
    const buscador = document.querySelector(".busqueda input");

//Mostrar lugares Turísticos

    function mostrarLugares(lista) {
        contenedor.innerHTML = "";
        lista.forEach((lugar) => {
            contenedor.innerHTML += `
            <div class="tarjeta">
                <img src="${lugar.imagen}" alt="${lugar.nombre}">
                <h3>${lugar.nombre}</h3>
                <p>${lugar.descripcion}</p>
                <button class="tarjeta botton" data-id="${lugar.id}">
                    Ver mas
                </button>
            </div>
            `;
        });
        configarBotones();
    }


    //Configurar botones

    function configarBotones() {
        const botones = document.querySelectorAll(".tarjeta button");
        botones.forEach((boton) => {
            boton.addEventListener("click", () => {
                const id = Number(boton.dataset.id);
                
                const lugar = lugares.find((lugar) => {
                    return lugar.id === id;
                });
                detalle.innerHTML = `
                <div class="detalleLugar">
                    <h2>${lugar.nombre}</h2>
                    <img src="${lugar.imagen}" alt="${lugar.nombre}">
                    <p>${lugar.descripcion}</p>
                <button id="cerrarDetalle">
                        Cerrar
                    </button>
                </div>`;
                
                const cerrar = document.getElementById("cerrarDetalle");
                cerrar.addEventListener("click", () => {
                    detalle.innerHTML = "";
                });
            });
            
        });
        
    }


    //Buscador

    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();
        const resultados = lugares.filter((lugar) => {
            return lugar.nombre
            .toLowerCase()
            .includes(texto);
        });

        mostrarLugares(resultados);
    });


mostrarLugares(lugares);


//INDEX DB

    const solicitud = indexedDB.open("BogotaExploraDB", 
        2
    );

    solicitud.onupgradeneeded = (evento) => {
        const db = evento.target.result;

        db.createObjectStore(
            "lugares", {
            keyPath: "id",
        }
    );
console.log("Base de datos creada");

    }

solicitud.onsuccess = (evento) => {
    const db = evento.target.result;
    console.log("IndexedDB conectada correctamente");

    const transaccion = db.transaction(
        "lugares", "readwrite"
    );
    const almacen = transaccion.objectStore(
        "lugares"
    );
    lugares.forEach((lugar) => {
        almacen.put(lugar);
    });
    const solicitudLectura = almacen.getAll();

    solicitudLectura.onsuccess = () => {
        lugares = solicitudLectura.result;
        mostrarLugares(lugares);    
    }
}