// var socket = new WebSocket("ws://161.218.118.51:9001");
var socket = new WebSocket("ws://10.0.0.10:9001");

window.onload = function () {
    listar();
}

socket.onopen = function () {
    document.getElementById("spnEstado").innerHTML = "- OK";
}

socket.onclose = function () {
    document.getElementById("spnEstado").innerHTML = "- Error";
}

function listar() {
    pintar("Curso/listarCursos", undefined,
        ["Id Curso", "Curso", "Categoría", "Precio"],
        ["IdCurso", "NombreCurso", "NombreCategoria", "Precio"],
        "tabla", true, true, "IdCurso"
    );
}