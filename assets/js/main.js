// ABP4 — JavaScript Asíncrono
// Simularemos un "fetch" al servidor con un retardo de 2 segundos.
// Los datos del usuario se comparten entre los tres mecanismos.
const USUARIO_MOCK = {
  nombre: "Ada Lovelace",
  correo: "ada@example.com",
  ciudad: "Londres"
};

// Utilidad para simular latencia de red
function retrasar(ms = 2000) {
  return new Promise(res => setTimeout(res, ms));
}

// Utilidades UI
const log = (msg) => {
  const pre = document.getElementById("app-log");
  pre.textContent += msg + "\n";
  console.log(msg);
};

function addItem(listId, text) {
  const ul = document.getElementById(listId);
  // Si es el placeholder, lo removemos
  if (ul.children.length === 1 && ul.children[0].classList.contains("text-muted")) {
    ul.innerHTML = "";
  }
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.textContent = text;
  ul.appendChild(li);
}

// === 1) Uso de Callbacks ===
// obtenerUsuarioCallback(callback) -> tras 2s entrega (error, data)
// Para ser claros, enviaremos null como error en el flujo "feliz".
function obtenerUsuarioCallback(callback) {
  log("Callback: consultando usuario (2s)...");
  setTimeout(() => {
    // Simula respuesta exitosa
    callback(null, { ...USUARIO_MOCK });
  }, 2000);
}

// === 2) Uso de Promesas ===
// obtenerUsuarioPromesa() -> Promise que resuelve tras 2s con los datos.
function obtenerUsuarioPromesa() {
  log("Promesa: consultando usuario (2s)...");
  return retrasar(2000).then(() => ({ ...USUARIO_MOCK }));
  // Para probar errores: reemplaza por `return Promise.reject(new Error("Fallo de red"))`
}

// === 3) Uso de Async/Await ===
// obtenerUsuarioAsync() -> async que reusa la promesa anterior
async function obtenerUsuarioAsync() {
  log("Async/Await: consultando usuario (2s)...");
  const data = await obtenerUsuarioPromesa();
  return data;
}

// === Listeners de botones ===
document.getElementById("btn-callback").addEventListener("click", () => {
  obtenerUsuarioCallback((err, data) => {
    if (err) {
      addItem("out-callback", "Error: " + err.message);
      log("Callback -> Error: " + err.message);
      return;
    }
    addItem("out-callback", `Nombre: ${data.nombre}`);
    addItem("out-callback", `Correo: ${data.correo}`);
    log(`Callback -> nombre=${data.nombre}, correo=${data.correo}`);
  });
});

document.getElementById("btn-promesa").addEventListener("click", () => {
  obtenerUsuarioPromesa()
    .then((data) => {
      addItem("out-promesa", `Nombre: ${data.nombre}`);
      addItem("out-promesa", `Ciudad: ${data.ciudad}`);
      log(`Promesa -> nombre=${data.nombre}, ciudad=${data.ciudad}`);
    })
    .catch((err) => {
      addItem("out-promesa", "Error: " + err.message);
      log("Promesa -> Error: " + err.message);
    });
});

document.getElementById("btn-async").addEventListener("click", async () => {
  try {
    const data = await obtenerUsuarioAsync();
    addItem("out-async", `Nombre: ${data.nombre}`);
    addItem("out-async", `Correo: ${data.correo}`);
    addItem("out-async", `Ciudad: ${data.ciudad}`);
    log(`Async/Await -> ${JSON.stringify(data)}`);
  } catch (err) {
    addItem("out-async", "Error: " + err.message);
    log("Async/Await -> Error: " + err.message);
  }
});
