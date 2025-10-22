// Consumo de API de feriados de Chile — XHR (jQuery.ajax) y Fetch
const API_URL = "https://www.feriadosapp.com/api/holidays.json";
const DEFAULT_EMPTY_MESSAGE = "Sin datos. Elige un método de carga arriba.";

// Utilidades simples de UI
const $msg = $("#msg");
const $spin = $("#spin");
const $tbody = $("#tabla-feriados tbody");
const $log = $("#log");
const $anio = $("#anio");
const $filtro = $("#filtro");

const setLoading = (loading, texto = "") => {
  $spin.toggleClass("d-none", !loading);
  $msg.text(texto || (loading ? "Cargando..." : "Listo."));
};

const log = (txt) => {
  console.log(txt);
  $log.text(`${$log.text()}${txt}\n`);
};

const normalizar = (s) => (s || "").toString().toLowerCase();

// Render de tabla
const renderTabla = (feriados, emptyMessage = "Sin resultados.") => {
  if (!Array.isArray(feriados) || feriados.length === 0) {
    $tbody.html(`<tr class="text-muted"><td colspan="4">${emptyMessage}</td></tr>`);
    return;
  }

  const rows = feriados
    .map((f) => {
      const fecha = f.date || f.fecha || "";
      const nombre = f.title || f.nombre || "";
      const tipo = f.extra || f.type || f.tipo || "";
      const irrenunciable = (f.irrenunciable || f.irrenunciable === true) ? "Sí" : "No";
      return `<tr><td class="text-nowrap">${fecha}</td><td>${nombre}</td><td class="text-nowrap">${tipo}</td><td class="text-nowrap">${irrenunciable}</td></tr>`;
    })
    .join("");

  $tbody.html(rows);
};

// Filtro en vivo
$filtro.on("input", () => {
  const q = normalizar($filtro.val());
  $("#tabla-feriados tbody tr").each(function filtroFila() {
    const rowText = normalizar($(this).text());
    $(this).toggleClass("hide", !rowText.includes(q));
  });
});

// Export CSV
$("#btn-export").on("click", () => {
  let csv = "fecha,nombre,tipo,irrenunciable\n";
  $("#tabla-feriados tbody tr:not(.hide)").each(function filaVisible() {
    const tds = $(this)
      .find("td")
      .map((i, el) => $(el).text())
      .get();
    if (tds.length === 4) {
      csv += `${tds.map((v) => `"${(v || "").replace(/"/g, '""')}"`).join(",")}` + "\n";
    }
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "feriados.csv";
  a.click();
  URL.revokeObjectURL(url);
});

// Construye URL con query de año si corresponde (muchas APIs aceptan ?year=YYYY).
const urlConAnio = () => {
  const y = parseInt($anio.val(), 10);
  if (!Number.isNaN(y)) return `${API_URL}?year=${y}`;
  return API_URL;
};

// 1) Carga con XHR (jQuery.ajax)
$("#btn-xhr").on("click", () => {
  const url = urlConAnio();
  setLoading(true, "Cargando con XHR (jQuery)...");
  log(`XHR GET ${url}`);

  $.ajax({
    url,
    method: "GET",
    dataType: "json",
    timeout: 15000,
  })
    .done((data) => {
      const feriados = data?.data || data?.feriados || data; // tolerante al shape
      renderTabla(feriados);
      log(`XHR OK: ${feriados?.length || 0} registros`);
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      renderTabla([]);
      log(`XHR Error: ${textStatus} - ${errorThrown || ""}`);
      alert("Error al cargar feriados (XHR). Revisa la consola para detalles.");
    })
    .always(() => setLoading(false));
});

// 2) Carga con Fetch
$("#btn-fetch").on("click", async () => {
  const url = urlConAnio();
  setLoading(true, "Cargando con Fetch...");
  log(`Fetch GET ${url}`);

  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const feriados = data?.data || data?.feriados || data;
    renderTabla(feriados);
    log(`Fetch OK: ${feriados?.length || 0} registros`);
  } catch (err) {
    renderTabla([]);
    log(`Fetch Error: ${err.message}`);
    alert("Error al cargar feriados (Fetch). Revisa la consola para detalles.");
  } finally {
    setLoading(false);
  }
});

// Botón de limpieza de vista
$("#btn-clear").on("click", () => {
  const currentYear = new Date().getFullYear();
  $anio.val(currentYear);
  $filtro.val("");
  renderTabla([], DEFAULT_EMPTY_MESSAGE);
  $log.text("");
  setLoading(false);
  log("Vista reiniciada.");
});

// Inicialización básica
(() => {
  const currentYear = new Date().getFullYear();
  $anio.val(currentYear);
  renderTabla([], DEFAULT_EMPTY_MESSAGE);
  $log.text("");
  setLoading(false);
  log("Listo. Selecciona un método para cargar los feriados.");
})();
