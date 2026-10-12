/* Tienda Sweet — ficha de producto (producto.html?id=…&cat=…). */
(function () {
  "use strict";

  const T = window.Tienda;
  const params = new URLSearchParams(location.search);
  const id = (params.get("id") || "").trim();
  const desde = T.categoria(params.get("cat")) ? params.get("cat") : "";
  const producto = id ? T.producto(id) : undefined;

  const ficha = document.getElementById("ficha");
  const relacionados = document.getElementById("relacionados");

  // "Volver" conserva el filtro desde el que se llegó.
  document.querySelectorAll("[data-volver]").forEach((a) => { a.href = T.urlCatalogo(desde); });

  if (!producto) {
    mostrarError(id ? "no-existe" : "falta-id");
    return;
  }

  const p = producto;
  const cat = T.categoria(p.categoria);
  const msj = T.mensajes(p);

  document.title = `${p.nombre} · Tienda Sweet`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", `${p.nombre} — ${T.precio(p.precio)}. Pedidos por WhatsApp.`);

  const miniaturas = p.fotos.length > 1
    ? `<div class="miniaturas" role="group" aria-label="Fotos de ${T.esc(p.nombre)}">
        ${p.fotos.map((src, i) => `
          <button type="button" class="mini" data-indice="${i}" aria-label="Ver foto ${i + 1} de ${p.fotos.length}"${i === 0 ? ' aria-current="true"' : ""}>
            ${T.foto(p, src, { alt: "" })}
          </button>`).join("")}
      </div>`
    : "";

  ficha.innerHTML = `
    <article class="ficha" style="--cat:${cat.color}">
      <div class="galeria">
        <div class="media media--grande" id="foto-principal">${T.media(p, { prioridad: true })}</div>
        ${miniaturas}
      </div>
      <div class="ficha-info">
        <a class="ficha-cat" href="${T.urlCatalogo(cat.id)}"><span class="chip-dot" aria-hidden="true"></span>${T.esc(cat.nombre)}</a>
        <h1 class="ficha-nombre">${T.esc(p.nombre)}</h1>
        <p class="ficha-precio${T.tienePrecio(p) ? "" : " sin-precio"}">${T.precio(p.precio)}</p>
        ${p.nota ? `<p class="ficha-nota">${T.esc(p.nota)}</p>` : ""}
        <div class="talles">
          ${T.icono("percha", "talles-icono")}
          <div>
            <p class="talles-rotulo">Talles disponibles</p>
            <p class="talles-texto">Consultame y te digo qué tengo.</p>
          </div>
        </div>
        <div class="acciones">
          <a class="btn btn--primario btn--wa" href="${T.linkWhatsApp(msj.pedido)}" target="_blank" rel="noopener" data-wa="pedido">
            ${T.icono("charla")}<span>Pedir por WhatsApp</span>
          </a>
        </div>
        <p class="acciones-ayuda">Se abre WhatsApp con el mensaje listo para enviar: te confirmo talles y coordinamos.</p>
      </div>
    </article>`;

  document.body.classList.add("con-acciones");

  // Galería: las miniaturas cambian la foto principal.
  const principal = document.getElementById("foto-principal");
  ficha.querySelectorAll(".mini").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.indice);
      principal.innerHTML = T.foto(p, p.fotos[i], { prioridad: true, alt: `${p.nombre}, foto ${i + 1} de ${p.fotos.length}` });
      ficha.querySelectorAll(".mini").forEach((b) => b.removeAttribute("aria-current"));
      btn.setAttribute("aria-current", "true");
    });
  });

  // "También te puede gustar": misma categoría; si no alcanzan 3, se completa con otros.
  const misma = PRODUCTOS.filter((x) => x.categoria === p.categoria && x.id !== p.id);
  let sugeridos = misma.slice(0, 4);
  if (sugeridos.length < 3) {
    const otros = PRODUCTOS.filter((x) => x.categoria !== p.categoria)
      .sort((a, b) => Number(b.destacado) - Number(a.destacado));
    sugeridos = sugeridos.concat(otros.slice(0, 4 - sugeridos.length));
  }
  if (sugeridos.length) {
    relacionados.querySelector(".grilla").innerHTML = sugeridos
      .map((x, i) => T.tarjeta(x, { i, cat: desde, conCategoria: x.categoria !== p.categoria }))
      .join("");
    relacionados.hidden = false;
  }

  function mostrarError(tipo) {
    document.title = "Producto no encontrado · Tienda Sweet";
    const titulo = tipo === "falta-id"
      ? "Este link no dice qué producto abrir"
      : "Este producto no está en el catálogo";
    const texto = tipo === "falta-id"
      ? "Puede que el link se haya cortado al copiarlo. Desde el catálogo lo encontrás enseguida."
      : "Puede que el link esté incompleto o que el producto ya no esté. Fijate en el catálogo completo.";
    ficha.innerHTML = `
      <div class="error-estado">
        <svg class="error-marca" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
          <path class="brand-tag" d="M14.5 3.5h11l7.5 7.5v23.5a3 3 0 0 1-3 3h-20a3 3 0 0 1-3-3V11z"/>
          <circle class="brand-hole" cx="20" cy="10" r="2.2"/>
          <path class="error-signo" d="M16.6 19.2a3.5 3.5 0 1 1 4.7 3.3c-.9.4-1.3 1-1.3 1.9v.9M20 30.2v.1"/>
        </svg>
        <p class="rotulo">Producto no encontrado</p>
        <h1 class="error-titulo">${titulo}</h1>
        <p class="error-texto">${texto}</p>
        <a class="btn btn--primario" href="${T.urlCatalogo(desde)}">${T.icono("volver")}<span>Ver el catálogo</span></a>
      </div>`;
    document.querySelector(".volver").hidden = true;
  }
})();
