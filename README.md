# Tienda Sweet — catálogo web

Catálogo estático: HTML + CSS + JavaScript puro, sin dependencias ni instalación.
No hay carrito ni pagos: cada ficha arma el mensaje de WhatsApp y la venta se
cierra por ahí.

## Archivos

```
index.html          portada: buscador, filtros y productos por categoría
producto.html       ficha de un producto (producto.html?id=remera-floral)
css/styles.css      estilos y colores (paleta en variables de :root)
js/data.js          productos, categorías y número de WhatsApp  ← lo único que se edita
js/app.js           catálogo, filtros, buscador, tema y utilidades compartidas
js/producto.js      armado de la ficha
assets/productos/   fotos de los productos
```

## Verlo en la compu

Desde la carpeta del proyecto:

```
python -m http.server 5173
```

y abrir <http://localhost:5173>. No abrir los archivos con doble clic
(`file://`): algunas cosas del navegador no funcionan así.

## Agregar un producto

En `js/data.js`, copiá una línea de `PRODUCTOS`, pegala en su categoría y
cambiá los datos:

```js
{ id: "remera-a-rayas", nombre: "Remera a rayas", categoria: "remeras-y-musculosas", precio: 18000, fotos: [], destacado: false, nota: "" },
```

- **id**: el nombre en minúsculas, sin tildes ni ñ, con guiones. Es el link de
  la ficha: una vez publicado, no lo cambies.
- **categoria**: uno de los `id` de `CATEGORIAS`.
- **precio**: número sin puntos ni `$`.
- **destacado**: `true` para que la tarjeta salga más grande.
- **nota**: aclaración corta ("Últimas unidades"). Vacía (`""`) no se muestra.

Para cambiar un precio, cambiá solo el número. Si un producto todavía no tiene
precio, poné `precio: null`: se muestra "Consultar precio" y el mensaje de
"Lo quiero" pregunta el precio.

## Agregar fotos

1. Guardá la foto en `assets/productos/` con el id del producto y un número:
   `assets/productos/remera-floral-1.jpg`.
2. Agregá la ruta en `fotos`:
   `fotos: ["assets/productos/remera-floral-1.jpg", "assets/productos/remera-floral-2.jpg"]`.
   La primera es la principal; si hay más de una, la ficha muestra miniaturas.

Lo ideal son fotos verticales 3:4 (como salen del celular), de unos 1200 px de
alto y en JPG, para que carguen rápido. Mientras un producto no tiene foto (o si
la ruta está mal escrita) se muestra la tarjeta "Foto próximamente" con el color
de su categoría.

## Cambiar el número de WhatsApp

Arriba de `js/data.js`, en la constante `WHATSAPP`. Va en formato
internacional, sin `+`, espacios ni guiones: 54 + 9 + código de área sin 0 +
número sin 15. Por ejemplo, 11 2653-0563 → `"5491126530563"`.

## Vista previa de los links en WhatsApp

WhatsApp arma la vista previa leyendo las etiquetas `og:` del HTML **sin
ejecutar JavaScript**. Como la ficha se completa con JavaScript, por ahora todos
los links de productos muestran la misma vista previa que la portada ("Tienda
Sweet" + descripción).

- Para sumar una imagen a la vista previa: subir una imagen de 1200 × 630 px
  (por ejemplo `assets/og-tienda-sweet.jpg`) y descomentar `og:image` en
  `index.html` y `producto.html` con la dirección completa del sitio
  (`https://…`), que se conoce recién al publicar.
- Más adelante, para que cada producto tenga su propia vista previa (con su
  nombre, precio y foto), se puede agregar un script chico que lea el mismo
  `js/data.js` y genere un HTML por producto (por ejemplo `p/remera-floral.html`)
  con sus etiquetas `og:` ya escritas. El catálogo seguiría igual; solo
  cambiaría el link que se comparte.

## Tema claro y oscuro

Por defecto sigue el tema del celular o la compu. Si se elige uno con el botón
de arriba a la derecha, queda guardado en ese navegador.
