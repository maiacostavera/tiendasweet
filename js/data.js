/* =====================================================================
   TIENDA SWEET — DATOS DEL CATÁLOGO
   Es el único archivo que hace falta tocar para cambiar productos.

   CAMBIAR UN PRECIO
     Buscá el producto y cambiá el número de "precio".
     Sin puntos, sin $ y sin comillas: 15000 (no "$15.000").
     Si todavía no tiene precio, poné  precio: null  y se muestra
     "Consultar precio" (el botón "Lo quiero" pregunta el precio).

   AGREGAR UN PRODUCTO
     Copiá una línea de PRODUCTOS, pegala debajo de su categoría y cambiá
     los datos. Cuidá que cada línea termine con coma.
     - id:        el nombre en minúsculas, sin tildes ni ñ, con guiones
                  ("Remera a rayas" -> "remera-a-rayas"). No puede repetirse.
                  Es lo que va en el link de la ficha: una vez publicado,
                  no lo cambies o los links viejos dejan de andar.
     - categoria: uno de los id de CATEGORIAS (más abajo).
     - destacado: true para que la tarjeta salga más grande en el catálogo.
     - nota:      aclaración corta ("Últimas unidades"). Si queda "", no se ve.

   AGREGAR FOTOS
     1. Guardá la foto en assets/productos/ con el id y un número:
          assets/productos/remera-floral-1.jpg
     2. Escribí la ruta entre comillas dentro de "fotos":
          fotos: ["assets/productos/remera-floral-1.jpg"]
        Para varias, separalas con coma. La primera es la foto principal.
     Ideal: fotos verticales 3:4 (como salen del celular), de unos 1200 px
     de alto. Si una ruta está mal, la tarjeta muestra "Foto próximamente".

   MENSAJE DE WHATSAPP
     El mensaje de consulta dice "Vi la Remera floral…": el artículo
     (el/la/los/las) se calcula solo a partir del nombre. Si para algún
     producto sale mal, agregale  articulo: "el"  (o "la", "los", "las").
   ===================================================================== */

/* >>> NÚMERO DE WHATSAPP <<<
   Formato internacional, sin +, espacios ni guiones:
   54 (Argentina) + 9 (celular) + código de área sin 0 + número sin 15.
   Ejemplo: 11 2653-0563  ->  "5491126530563"                            */
const WHATSAPP = "5491126530563";


/* Categorías en el orden en que aparecen en el catálogo.
   "color" es el acento propio de cada una (chips, títulos y tarjetas sin foto). */
const CATEGORIAS = [
  { id: "remeras-y-musculosas", nombre: "Remeras y musculosas", color: "#8DB572" },
  { id: "bermudas-y-shorts",    nombre: "Bermudas y shorts",    color: "#E07A5F" },
  { id: "vestidos-y-camisones", nombre: "Vestidos y camisones", color: "#F0A672" },
  { id: "mallas",               nombre: "Mallas",               color: "#7FB0D6" },
  { id: "conjuntos",            nombre: "Conjuntos",            color: "#A99BD6" },
  { id: "ropa-de-nena",         nombre: "Ropa de nena",         color: "#D99AA5" },
  { id: "ropa-interior",        nombre: "Ropa interior",        color: "#D9B44A" },
];


const PRODUCTOS = [
  // Remeras y musculosas
  { id: "remeras",           nombre: "Remeras",           categoria: "remeras-y-musculosas", precio: 20000, fotos: ["assets/productos/remeras-1.jpg", "assets/productos/remeras-2.jpg", "assets/productos/remeras-3.jpg", "assets/productos/remeras-4.jpg", "assets/productos/remeras-5.jpg", "assets/productos/remeras-6.jpg", "assets/productos/remeras-7.jpg", "assets/productos/remeras-8.jpg", "assets/productos/remeras-9.jpg"], destacado: true,  nota: "" },
  { id: "remera-manga-larga", nombre: "Remera manga larga", categoria: "remeras-y-musculosas", precio: null, fotos: ["assets/productos/remera-manga-larga-1.jpg"], destacado: false, nota: "" },
  { id: "remera-floral",     nombre: "Remera floral",     categoria: "remeras-y-musculosas", precio: 15000, fotos: ["assets/productos/remera-floral-1.jpg"], destacado: false, nota: "" },
  { id: "chombas",           nombre: "Chombas",           categoria: "remeras-y-musculosas", precio: 20000, fotos: ["assets/productos/chombas-1.jpg", "assets/productos/chombas-2.jpg"], destacado: false, nota: "" },
  { id: "musculosas",        nombre: "Musculosas",        categoria: "remeras-y-musculosas", precio: 18000, fotos: ["assets/productos/musculosas-1.jpg", "assets/productos/musculosas-2.jpg", "assets/productos/musculosas-3.jpg", "assets/productos/musculosas-4.jpg", "assets/productos/musculosas-5.jpg", "assets/productos/musculosas-6.jpg", "assets/productos/musculosas-7.jpg"], destacado: true,  nota: "" },
  { id: "musculosa-de-nina", nombre: "Musculosa de niña", categoria: "remeras-y-musculosas", precio: 15000, fotos: ["assets/productos/musculosa-de-nina-1.jpg"], destacado: false, nota: "" },
  { id: "musculosa-verde",   nombre: "Musculosa verde",   categoria: "remeras-y-musculosas", precio: 12000, fotos: ["assets/productos/musculosa-verde-1.jpg"], destacado: false, nota: "" },
  { id: "camisa-escocesa",   nombre: "Camisa escocesa",   categoria: "remeras-y-musculosas", precio: 25000, fotos: ["assets/productos/camisa-escocesa-1.jpg"], destacado: false, nota: "" },

  // Bermudas y shorts
  { id: "bermudas-de-gabardina", nombre: "Bermudas de gabardina", categoria: "bermudas-y-shorts", precio: 22000, fotos: ["assets/productos/bermudas-de-gabardina-1.jpg"], destacado: false, nota: "" },
  { id: "bermudas-de-jean",      nombre: "Bermudas de jean",      categoria: "bermudas-y-shorts", precio: 28000, fotos: ["assets/productos/bermudas-de-jean-1.jpg"], destacado: false, nota: "" },
  { id: "bermudas-de-algodon",   nombre: "Bermudas de algodón",   categoria: "bermudas-y-shorts", precio: 15000, fotos: [], destacado: false, nota: "" },
  { id: "shorts-de-bano",        nombre: "Shorts de baño",        categoria: "bermudas-y-shorts", precio: 22000, fotos: ["assets/productos/shorts-de-bano-1.jpg", "assets/productos/shorts-de-bano-2.jpg", "assets/productos/shorts-de-bano-3.jpg", "assets/productos/shorts-de-bano-4.jpg", "assets/productos/shorts-de-bano-5.jpg"], destacado: false, nota: "" },
  { id: "short-talle-3",         nombre: "Short talle 3",         categoria: "bermudas-y-shorts", precio: 15000, fotos: ["assets/productos/short-talle-3-1.jpg"], destacado: false, nota: "" },
  { id: "bermuda-cargo-negra",   nombre: "Bermuda cargo negra",   categoria: "bermudas-y-shorts", precio: null,  fotos: ["assets/productos/bermuda-cargo-negra-1.jpg"], destacado: false, nota: "" },

  // Vestidos y camisones
  { id: "vestido-de-flores", nombre: "Vestido de flores", categoria: "vestidos-y-camisones", precio: 20000, fotos: ["assets/productos/vestido-de-flores-1.jpg"], destacado: false, nota: "" },
  { id: "camison-talle-3",   nombre: "Camisón talle 3",   categoria: "vestidos-y-camisones", precio: 30000, fotos: [], destacado: false, nota: "" },
  { id: "camison-azul",      nombre: "Camisón azul",      categoria: "vestidos-y-camisones", precio: 22000, fotos: ["assets/productos/camison-azul-1.jpg"], destacado: false, nota: "" },

  // Mallas
  { id: "malla-talle-4", nombre: "Malla talle 4", categoria: "mallas", precio: 15000, fotos: ["assets/productos/malla-talle-4-1.jpg"], destacado: false, nota: "" },

  // Conjuntos
  { id: "conjunto-animal-print",   nombre: "Conjunto animal print",   categoria: "conjuntos", precio: 28000, fotos: ["assets/productos/conjunto-animal-print-1.jpg"], destacado: false, nota: "" },
  { id: "conjunto-de-nena-blanco", nombre: "Conjunto de nena blanco", categoria: "conjuntos", precio: 20000, fotos: ["assets/productos/conjunto-de-nena-blanco-1.jpg"], destacado: false, nota: "" },
  { id: "conjunto-motos",          nombre: "Conjunto motos",          categoria: "conjuntos", precio: null,  fotos: ["assets/productos/conjunto-motos-1.jpg"], destacado: false, nota: "" },

  // Ropa de nena
  { id: "calzas-de-nena",    nombre: "Calzas de nena",    categoria: "ropa-de-nena", precio: 12000, fotos: ["assets/productos/calzas-de-nena-1.jpg"], destacado: false, nota: "" },
  { id: "bombachas-de-nena", nombre: "Bombachas de nena", categoria: "ropa-de-nena", precio: 15000, fotos: ["assets/productos/bombachas-de-nena-1.jpg"], destacado: false, nota: "Pack x 3" },

  // Ropa interior
  { id: "boxers",            nombre: "Boxers",            categoria: "ropa-interior", precio: 22000, fotos: ["assets/productos/boxers-1.jpg", "assets/productos/boxers-2.jpg"], destacado: false, nota: "" },
  { id: "slip",              nombre: "Slip",              categoria: "ropa-interior", precio: 12000, fotos: ["assets/productos/slip-1.jpg"], destacado: false, nota: "" },
  { id: "corpino-deportivo", nombre: "Corpiño deportivo", categoria: "ropa-interior", precio: 20000, fotos: [], destacado: false, nota: "" },
  { id: "corpino-blanco",    nombre: "Corpiño blanco",    categoria: "ropa-interior", precio: null,  fotos: ["assets/productos/corpino-blanco-1.jpg"], destacado: false, nota: "" },
];
