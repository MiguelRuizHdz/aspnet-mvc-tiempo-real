// var socket = new WebSocket("ws://172.30.0.1:9001");
var socket = new WebSocket("ws://10.0.0.10:9001");

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

function preview() {
    var archivoSeleccionado = document.getElementById("fupFoto").files[0];

    var file = new FileReader();
    file.onloadend = function (e) {
        document.getElementById("imgFoto").src = e.target.result;
        console.log("src", e.target.result);
    }

    file.readAsDataURL(archivoSeleccionado);

}

function GuardarDatos() {

    var obj = {
        IdCurso: get("txtIdCodigo") == "" ? 0 : get("txtIdCodigo"),
        NombreCurso: get("txtNombreCurso"),
        Descripcion: get("txtDescripcion"),
        IdCategoriaCurso: get("cboCategoriaCurso"),
        Precio: get("txtPrecio"),
        Cupon: get("txtCupon"),
        Foto: getS("imgFoto"),
    }

    fetchPost("../Curso/guardarDatos", obj, function () {
        socket.send("agregarCurso");
        document.location.href = "../Curso";
    })
}