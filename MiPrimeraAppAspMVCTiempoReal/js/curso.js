var socket = new WebSocket("ws://172.30.0.1:9001");
// var socket = new WebSocket("ws://10.0.0.10:9001");

window.onload = function () {
    listar();
    llenarComboCategoriaCurso();
}

socket.onopen = function () {
    document.getElementById("spnEstado").innerHTML = "- OK";
}

socket.onclose = function () {
    document.getElementById("spnEstado").innerHTML = "- Error";
}

socket.onmessage = function (e) {
    var data = e.data;
    if (data == "guardoCategoriaCurso" || data == "eliminarCategoriaCurso") {
        llenarComboCategoriaCurso();
    }
}

function listar() {
    pintar("Curso/listarCursos", undefined,
        ["Id Curso", "Curso", "Categoría", "Precio"],
        ["IdCurso", "NombreCurso", "NombreCategoria", "Precio"],
        "tabla", true, true, "IdCurso"
    );
}

function llenarComboCategoriaCurso() {
    pintarCombo("../CategoriaCurso/listarCategoriaCurso", "IdCategoriaCurso", "Nombre", "cboCategoriaCurso");
}