function get(id) {
    //textbox (input type='text') combos(select)
    return document.getElementById(id).value;
}
//image (img)
function getS(id) {
    return document.getElementById(id).src;
}

function fetchGet(url, callback) {
    //Json
    fetch(url).then(res => res.json())
    .then(res => {
        callback(res)
    })
}

function fetchGetText(url, callback, mensaje="Se eliminó correctamente el registro") {
    //Text
    fetch(url).then(res => res.text())
        .then(res => {
            if (res == 1) {
                Exito(mensaje)
                callback(res)
            }
            else {
                Error()
            }
    })
}

function fetchPost(url, objeto, callback) {
    Confirmacion(undefined, function () {
        fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(objeto)
        })
        .then(res => res.text())
        .then(res => {
            //1(Ok)
            if (res == 1) {
                Exito();
                callback();
            } else {
                MyError();
            }
        });
    });

}

function MyError(titulo ="Error", texto = "Ocurrió un error") {
    Swal.fire({
        icon: 'error',
        title: titulo,
        text: texto
    })
}

function Exito(titulo = "Se guardó correctamente") {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: titulo,
        showConfirmButton: false,
        timer: 1500
    })
}

function Confirmacion(texto = "Los cambios se guardaran en tu BD", callback) {
    Swal.fire({
        title: "Desea guardar los cambios?",
        text: texto,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    })
}

function set(id, valor) {
    document.getElementById(id).value = valor;
}

function setS(id, valor) {
    document.getElementById(id).src = valor;
}

function pintarCombo(url, propiedadId, propiedadMostrar, idCombo) {
    fetch(url).then(res => res.json())
        .then(res => {
            var contenido = "<option value=''>--Seleccione--</option>"
            var fila
            for (let i = 0; i < res.length; i++) {
                fila = res[i]
                contenido += "<option value='"+ fila[propiedadId]+"'>"+fila[propiedadMostrar]+"</option>";
            }
            document.getElementById(idCombo).innerHTML = contenido;
        })
}

function pintar(url, id = "divTabla", cabeceras, nombrePropiedades, idTabla = "tabla", eliminar = false, editar = false, propiedadId="Id") {
    fetch(url).then(res => res.json())
        .then(res => {
            // alert(res);
            // alert(JSON.stringify(res));
            var contenido = "<table id='" + idTabla + "' class='table'>";

            contenido += "<thead>";
            contenido += "<tr>";
            for (var i = 0; i < cabeceras.length; i++) {
                contenido += "<th>";
                contenido += cabeceras[i];
                contenido += "</th>";
            }
            if (eliminar || editar) {
                contenido += "<th>Operaciones</th>";
            }
            contenido += "</tr>";
            contenido += "</thead>";
            var objetoActual;
            var nombrePropiedad;
            contenido += "<tbody>";
            for (var i = 0; i < res.length; i++) {
                objetoActual = res[i];
                contenido += "<tr>";
                for (var j = 0; j < nombrePropiedades.length; j++) {
                    nombrePropiedad = nombrePropiedades[j];
                    contenido += "<td>";
                    contenido += objetoActual[nombrePropiedad];
                    contenido += "</td>";
                }
                if (eliminar || editar) {
                    contenido += "<td>";
                    if (editar) {
                        contenido += `
                            <i onclick='Editar(${objetoActual[propiedadId]})' class='btn btn-primary mr-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                </svg>
                            </i>
                        `
                    }
                    if (eliminar) {
                        contenido += `
                            <i onclick='Eliminar(${objetoActual[propiedadId]})' class='btn btn-danger'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </i>
                        `
                    }

                    contenido += "</td>";
                }
            }
            contenido += "</tbody>";

            contenido += "</table>";
            document.getElementById(id).innerHTML = contenido;
            $("#" + idTabla).DataTable();
        })
}


function EliminarDatos(id) {

    Confirmacion(undefined, function() {
        Eliminar(id);
    })
}