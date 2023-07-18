var socket = new WebSocket("ws://172.30.0.1:9001");
// var socket = new WebSocket("ws://10.0.0.10:9001");

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

window.onload = function () {
    llenarComboCategoriaCurso();
}

function llenarComboCategoriaCurso() {
    pintarCombo("../CategoriaCurso/listarCategoriaCurso", "IdCategoriaCurso", "Nombre", "cboCategoriaCurso");
}