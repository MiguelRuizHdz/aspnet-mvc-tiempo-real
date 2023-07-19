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
        listar();
    }
}

function Eliminar(id) {
    fetchGetText("CategoriaCurso/eliminarCategoriaCurso?idCategoriaCurso=" + id, function () {
        //listar();
        socket.send("eliminarCategoriaCurso");
    }, undefined);
}

function Editar(id) {
    fetchGet("CategoriaCurso/obtenerCategoriaCursoPorId?idCategoriaCurso=" + id, function (res) {
        set("txtIdCategoriaCurso",res.IdCategoriaCurso)
        set("txtNombreCategoria",res.Nombre)
        // socket.send("editarCategoriaCurso");
    });
}

window.onload = function () {
    listar();
}


function listar() {
    pintar("CategoriaCurso/listarCategoriaCurso", undefined, ["Id Categoria Curso", "Nombre"],
        ["IdCategoriaCurso", "Nombre"], "tabla", true, true, "IdCategoriaCurso");
}
function GuardarDatos() {
    var idCategoriaCurso = get("txtIdCategoriaCurso") == "" ? "0" : get("txtIdCategoriaCurso");
    var nombre = get("txtNombreCategoria");

    var objeto = {
        IdCategoriaCurso: idCategoriaCurso,
        Nombre: nombre
    }

    fecthPost("CategoriaCurso/GuardarDatos", objeto, function () {
        Limpiar();
        socket.send("guardoCategoriaCurso");
    })

}

function Limpiar() {
    set("txtIdCategoriaCurso", "")
    set("txtNombreCategoria", "")
}