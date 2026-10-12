/* Tienda Sweet — utilidades compartidas, tema y catálogo (index.html).
   producto.html también carga este archivo para usar las utilidades y el tema. */
(function () {
  "use strict";

  /* ---------- Utilidades ---------- */

  const formatoPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // "$ 15.000" -> "$15.000" (Intl pone un espacio duro entre el signo y el número)
  function precio(n) {
    return formatoPrecio
      .formatToParts(n)
      .filter((p) => !(p.type === "literal" && /^\s+$/.test(p.value)))
      .map((p) => p.value)
      .join("");
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
  }

  function normalizar(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  }

  const ICONOS = {
    buscar: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    cerrar: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2.8v2.2M12 19v2.2M2.8 12H5M19 12h2.2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5L7 17M17 7l1.5-1.5"/>',
    luna: '<path d="M19.5 14.6A7.6 7.6 0 0 1 9.4 4.5a7.6 7.6 0 1 0 10.1 10.1z"/>',
    volver: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    charla: '<path d="M20 11.6a7.6 7.6 0 0 1-11.1 6.7L4.5 19.5l1.3-4.1A7.6 7.6 0 1 1 20 11.6z"/>',
    bolsa: '<path d="M5.5 8.5h13l-1 11.5h-11z"/><path d="M9 10.5V7a3 3 0 0 1 6 0v3.5"/>',
    percha: '<path d="M10.2 6.4a1.8 1.8 0 1 1 1.8 1.8v1.4"/><path d="M12 9.6l-8.4 6.1a.9.9 0 0 0 .5 1.6h15.8a.9.9 0 0 0 .5-1.6L12 9.6"/>',
  };

  function icono(nombre, clase) {
    return `<svg class="icon${clase ? " " + clase : ""}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONOS[nombre]}</svg>`;
  }

  const catPorId = new Map(CATEGORIAS.map((c) => [c.id, c]));
  const prodPorId = new Map(PRODUCTOS.map((p) => [p.id, p]));

  function urlCatalogo(cat) {
    return catPorId.has(cat) ? `index.html?cat=${encodeURIComponent(cat)}` : "index.html";
  }

  function urlProducto(id, cat) {
    let url = `producto.html?id=${encodeURIComponent(id)}`;
    if (catPorId.has(cat)) url += `&cat=${encodeURIComponent(cat)}`;
    return url;
  }

  function linkWhatsApp(texto) {
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
  }

  // el/la/los/las según la primera palabra del nombre ("Bermudas de jean" -> "las")
  function articulo(p) {
    if (p.articulo) return p.articulo;
    const palabra = normalizar(p.nombre.split(" ")[0]);
    if (palabra.endsWith("as")) return "las";
    if (palabra.endsWith("a")) return "la";
    if (palabra.endsWith("s")) return "los";
    return "el";
  }

  function mensajes(p) {
    return {
      consulta: `Hola! Vi ${articulo(p)} ${p.nombre} en el catálogo de Tienda Sweet. ¿Qué talles tenés?`,
      pedido: `Hola! Quiero pedir: ${p.nombre} — ${precio(p.precio)} (Tienda Sweet)`,
    };
  }

  function inicial(nombre) {
    return nombre.trim().charAt(0).toUpperCase();
  }

  function sinFoto(p) {
    return `<div class="ph" role="img" aria-label="${esc(p.nombre)}: foto próximamente">
      <span class="ph-inicial" aria-hidden="true">${esc(inicial(p.nombre))}</span>
      <span class="ph-rotulo" aria-hidden="true">Foto próximamente</span>
    </div>`;
  }

  function foto(p, src, opciones) {
    const o = opciones || {};
    const prioridad = o.prioridad ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"';
    return `<img src="${esc(src)}" alt="${esc(o.alt || p.nombre)}" width="900" height="1200"${prioridad} decoding="async" data-producto="${esc(p.id)}">`;
  }

  function media(p, opciones) {
    return p.fotos.length ? foto(p, p.fotos[0], opciones) : sinFoto(p);
  }

  /* Tarjeta de producto.
     jerarquia: si es true, los destacados salen en formato grande.
     cat: filtro activo, para que la ficha sepa a dónde volver.
     conCategoria: muestra el rótulo de categoría (útil fuera de su sección). */
  function tarjeta(p, opciones) {
    const o = opciones || {};
    const c = catPorId.get(p.categoria);
    const grande = Boolean(o.jerarquia && p.destacado);
    return `<a class="card${grande ? " card--destacado" : ""}" href="${urlProducto(p.id, o.cat)}" data-id="${esc(p.id)}" data-nombre="${esc(normalizar(p.nombre))}" style="--cat:${c.color};--i:${o.i || 0}">
      <div class="media">${media(p)}</div>
      <div class="card-body">
        ${grande ? '<span class="card-flag">Destacado</span>' : ""}
        ${o.conCategoria ? `<span class="card-cat">${esc(c.nombre)}</span>` : ""}
        <h3 class="card-name">${esc(p.nombre)}</h3>
        <p class="card-price">${precio(p.precio)}</p>
        ${p.nota ? `<p class="card-nota">${esc(p.nota)}</p>` : ""}
        ${grande ? `<span class="card-more">Ver ficha ${icono("flecha")}</span>` : ""}
      </div>
    </a>`;
  }

  // Si una ruta de foto está mal escrita, se reemplaza por el estado "sin foto".
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.dataset.producto) return;
    const p = prodPorId.get(img.dataset.producto);
    if (p) img.outerHTML = sinFoto(p);
  }, true);

  /* ---------- Tema claro / oscuro ---------- */

  const CLAVE_TEMA = "tiendasweet-tema";

  function leerTemaGuardado() {
    try { return localStorage.getItem(CLAVE_TEMA); } catch (e) { return null; }
  }

  function iniciarTema() {
    const root = document.documentElement;
    const botones = document.querySelectorAll("[data-theme-toggle]");
    const metaColor = document.querySelector('meta[name="theme-color"]');
    const sistema = window.matchMedia("(prefers-color-scheme: dark)");

    function aplicar(tema, guardar) {
      root.dataset.theme = tema;
      if (guardar) {
        try { localStorage.setItem(CLAVE_TEMA, tema); } catch (e) { /* sin almacenamiento: no pasa nada */ }
      }
      botones.forEach((b) => {
        b.setAttribute("aria-label", tema === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
      });
      if (metaColor) metaColor.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg").trim());
    }

    const guardado = leerTemaGuardado();
    aplicar(guardado === "light" || guardado === "dark" ? guardado : (sistema.matches ? "dark" : "light"), false);

    botones.forEach((b) => b.addEventListener("click", () => {
      aplicar(root.dataset.theme === "dark" ? "light" : "dark", true);
    }));

    // Si nunca eligió un tema, sigue al del sistema.
    sistema.addEventListener("change", (e) => {
      if (!leerTemaGuardado()) aplicar(e.matches ? "dark" : "light", false);
    });
  }

  /* ---------- Catálogo (index.html) ---------- */

  function iniciarCatalogo() {
    const contenedor = document.getElementById("secciones");
    if (!contenedor) return;

    const chips = document.getElementById("chips");
    const form = document.getElementById("buscador");
    const input = document.getElementById("buscar");
    const btnLimpiar = document.getElementById("buscar-limpiar");
    const vacio = document.getElementById("vacio");
    const vacioDetalle = document.getElementById("vacio-detalle");
    const vacioTodas = document.getElementById("vacio-todas");
    const anuncio = document.getElementById("anuncio");
    const controles = document.getElementById("controles");
    const tituloBase = document.title;

    const plural = (n) => `${n} ${n === 1 ? "producto" : "productos"}`;

    chips.innerHTML =
      `<a class="chip" href="index.html" data-cat="">Todos <span class="chip-n">${PRODUCTOS.length}</span></a>` +
      CATEGORIAS.map((c) => (
        `<a class="chip" href="${urlCatalogo(c.id)}" data-cat="${c.id}" style="--cat:${c.color}"><span class="chip-dot" aria-hidden="true"></span>${esc(c.nombre)}</a>`
      )).join("");

    contenedor.innerHTML = CATEGORIAS.map((c, n) => {
      // Destacados primero; el resto en el orden de data.js.
      const productos = PRODUCTOS.filter((p) => p.categoria === c.id)
        .sort((a, b) => Number(b.destacado) - Number(a.destacado));
      if (!productos.length) return "";
      return `<section class="seccion" data-cat="${c.id}" style="--cat:${c.color}" aria-labelledby="titulo-${c.id}">
        <header class="seccion-head">
          <span class="seccion-num" aria-hidden="true">${String(n + 1).padStart(2, "0")}</span>
          <h2 class="seccion-titulo" id="titulo-${c.id}">${esc(c.nombre)}</h2>
          <span class="seccion-cant" data-cant>${plural(productos.length)}</span>
        </header>
        <div class="grilla">${productos.map((p, i) => tarjeta(p, { i, jerarquia: true })).join("")}</div>
      </section>`;
    }).join("");

    const secciones = [...contenedor.querySelectorAll(".seccion")];
    const estado = { cat: "", q: "" };

    function leerURL() {
      const sp = new URLSearchParams(location.search);
      const cat = sp.get("cat") || "";
      estado.cat = catPorId.has(cat) ? cat : "";
      estado.q = sp.get("q") || "";
      input.value = estado.q;
    }

    function escribirURL(nuevaEntrada) {
      const sp = new URLSearchParams();
      if (estado.cat) sp.set("cat", estado.cat);
      if (estado.q.trim()) sp.set("q", estado.q.trim());
      const qs = sp.toString();
      const url = location.pathname + (qs ? "?" + qs : "");
      if (url === location.pathname + location.search) return;
      history[nuevaEntrada ? "pushState" : "replaceState"](null, "", url);
    }

    function aplicar() {
      const terminos = normalizar(estado.q).split(/\s+/).filter(Boolean);
      let total = 0;

      chips.querySelectorAll(".chip").forEach((chip) => {
        if (chip.dataset.cat === estado.cat) chip.setAttribute("aria-current", "true");
        else chip.removeAttribute("aria-current");
      });

      secciones.forEach((sec) => {
        const enCategoria = !estado.cat || sec.dataset.cat === estado.cat;
        let visibles = 0;
        sec.querySelectorAll(".card").forEach((card) => {
          const coincide = enCategoria && terminos.every((t) => card.dataset.nombre.includes(t));
          card.hidden = !coincide;
          card.href = urlProducto(card.dataset.id, estado.cat);
          if (coincide) visibles++;
        });
        sec.hidden = visibles === 0;
        sec.querySelector("[data-cant]").textContent = plural(visibles);
        total += visibles;
      });

      form.classList.toggle("tiene-texto", estado.q.length > 0);
      vacio.hidden = total > 0;
      if (total === 0) {
        const cat = catPorId.get(estado.cat);
        vacioDetalle.textContent = cat
          ? `Busqué “${estado.q.trim()}” en ${cat.nombre}. Probá con otra palabra o buscá en todo el catálogo.`
          : `Busqué “${estado.q.trim()}” en todo el catálogo. Probá con otra palabra, por ejemplo “remera” o “short”.`;
        vacioTodas.hidden = !cat;
      }

      const cat = catPorId.get(estado.cat);
      document.title = cat ? `${cat.nombre} · ${tituloBase}` : tituloBase;
      anuncio.textContent = total ? `${plural(total)}${cat ? " en " + cat.nombre : ""}` : "No encontré nada con ese nombre";
    }

    function irArriba() {
      // Si ya bajó por la lista, vuelve al principio del catálogo al cambiar de filtro.
      const top = contenedor.getBoundingClientRect().top + window.scrollY - controles.offsetHeight - 8;
      if (window.scrollY > top) {
        const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top, behavior: reducido ? "auto" : "smooth" });
      }
    }

    chips.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      if (chip.dataset.cat === estado.cat) return;
      estado.cat = chip.dataset.cat;
      escribirURL(true);
      aplicar();
      irArriba();
    });

    input.addEventListener("input", () => {
      estado.q = input.value;
      escribirURL(false);
      aplicar();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      input.blur(); // en el celular, cierra el teclado
    });

    function limpiar() {
      input.value = "";
      estado.q = "";
      escribirURL(false);
      aplicar();
      input.focus();
    }

    btnLimpiar.addEventListener("click", limpiar);
    document.getElementById("vacio-limpiar").addEventListener("click", limpiar);
    vacioTodas.addEventListener("click", () => {
      estado.cat = "";
      escribirURL(true);
      aplicar();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && input.value) {
        e.preventDefault();
        limpiar();
      }
    });

    // Atajo "/" para ir al buscador (cuando no se está escribiendo en otro lado).
    document.addEventListener("keydown", (e) => {
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      e.preventDefault();
      input.focus();
      input.select();
    });

    window.addEventListener("popstate", () => {
      leerURL();
      aplicar();
    });

    // Borde inferior de la barra de búsqueda solo cuando queda pegada arriba.
    const centinela = document.getElementById("centinela");
    if (centinela && "IntersectionObserver" in window) {
      new IntersectionObserver(([entrada]) => {
        controles.classList.toggle("pegado", !entrada.isIntersecting);
      }).observe(centinela);
    }

    leerURL();
    aplicar();
  }

  function iniciarWhatsAppGeneral() {
    document.querySelectorAll("[data-wa-general]").forEach((a) => {
      a.href = linkWhatsApp("Hola! Vi el catálogo de Tienda Sweet y quería hacerte una consulta.");
    });
  }

  window.Tienda = {
    precio, esc, normalizar, icono, media, foto, sinFoto, tarjeta, mensajes, linkWhatsApp,
    urlCatalogo, urlProducto, categoria: (id) => catPorId.get(id), producto: (id) => prodPorId.get(id),
  };

  iniciarTema();
  iniciarWhatsAppGeneral();
  iniciarCatalogo();
})();
