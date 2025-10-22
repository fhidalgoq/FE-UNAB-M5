// === Paso 1: Callback simple (saludo -> café) ===
// Función principal que recibe un callback
function saludarConCafe(callback) {
  console.log("Buenos días");
  appendOut("Buenos días");
  // Al terminar su trabajo, invoca el callback
  callback();
}

// Callback que pregunta si queremos café
function preguntarCafe() {
  const quiere = confirm("¿Quieres un café?");
  const msg = quiere ? "Perfecto, te traigo uno ☕" : "Sin problema, seguimos ☺";
  console.log(msg);
  appendOut(msg);
}

// === Paso 2: operaciones(a,b,minora,potencias) ===
// Mantiene la forma solicitada (dos callbacks que reciben el cálculo)
function operaciones(a, b, minora, potencias) {
  var diferencia = a - b;
  var elevado = Math.pow(a, b);
  // Invocamos los callbacks
  minora(diferencia);
  potencias(elevado);
}

// Utilidad para reflejar salida en la página además de la consola
function appendOut(line) {
  const el = document.getElementById("output");
  el.textContent += line + "\n";
}

// Listeners UI
document.getElementById("btn-saludo").addEventListener("click", () => {
  saludarConCafe(preguntarCafe);
});

document.getElementById("btn-operar").addEventListener("click", () => {
  const a = Number(document.getElementById("a").value);
  const b = Number(document.getElementById("b").value);

  // Los callbacks anónimos cierran sobre a y b para construir frases adaptables
  operaciones(a, b,
    function(diferencia) {
      const line = `La diferencia entre ${a} y ${b} es: ${diferencia}`;
      console.log(line);
      appendOut(line);
    },
    function(elevado) {
      const line = `Elevando ${a} a potencia ${b} se obtiene: ${elevado}`;
      console.log(line);
      appendOut(line);
    }
  );
});

// Ejecución de ejemplo automático para (5,3) como en el enunciado
// (Puedes comentar estas 3 líneas si no quieres auto-ejecutar al cargar)
window.addEventListener("DOMContentLoaded", () => {
  const a = Number(document.getElementById("a").value);
  const b = Number(document.getElementById("b").value);
  operaciones(a, b,
    (d) => { const s = `La diferencia entre ${a} y ${b} es: ${d}`; console.log(s); appendOut(s); },
    (e) => { const s = `Elevando ${a} a potencia ${b} se obtiene: ${e}`; console.log(s); appendOut(s); }
  );
});
