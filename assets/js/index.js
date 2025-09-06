// Objeto Paciente ES5
function Paciente(nombre, edad, rut, diagnostico) {
    var _nombre = nombre;
    var _edad = edad;
    var _rut = rut;
    var _diagnostico = diagnostico;

    this.getNombre = function () { return _nombre; }
    this.getEdad = function () { return _edad; }
    this.getRut = function () { return _rut; }
    this.getDiagnostico = function () { return _diagnostico; }
}

var pacientes = [
    { nombre: "Juan Perez", edad: 30, rut: "12345678-9", diagnostico: "Gripe" },
    { nombre: "Maria Gomez", edad: 25, rut: "98765432-1", diagnostico: "Fractura" },
    { nombre: "Pedro Rodriguez", edad: 40, rut: "11223344-5", diagnostico: "Diabetes" },
    { nombre: "Ana Martinez", edad: 35, rut: "55667788-0", diagnostico: "Hipertensión" }
];

function renderTabla(lista) {
    var tbody = document.getElementById("tablaPacientes");
    tbody.innerHTML = "";

    if (lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No se encontraron pacientes</td></tr>';
        return;
    }

    lista.forEach(function (paciente) {
        var p = new Paciente(paciente.nombre, paciente.edad, paciente.rut, paciente.diagnostico);
        var fila = "<tr>" +
            "<td>" + p.getNombre() + "</td>" +
            "<td>" + p.getEdad() + "</td>" +
            "<td>" + p.getRut() + "</td>" +
            "<td>" + p.getDiagnostico() + "</td>" +
            "</tr>";
        tbody.innerHTML += fila;
    });
}

function mostrarTodos() {
    renderTabla(pacientes);
}

function buscarPaciente() {
    var nombre = document.getElementById("buscarNombre").value.trim().toLowerCase();
    var filtrados = pacientes.filter(function (paciente) {
        return paciente.nombre.toLowerCase() === nombre;
    });
    renderTabla(filtrados);
}