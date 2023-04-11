function get(id) {
    //textbox (input type='text') combos(select)
    return document.getElementById(id).value;
}
//image (img)
function getS(id) {
    return document.getElementById(id).src;
}

function set(id, valor) {
    document.getElementById(id).value = valor;
}

function setS(id, valor) {
    document.getElementById(id).src = valor;
}

function pintar(url, id = "divTabla", cabeceras, nombrePropiedades) {
    fetch(url).then(res => res.json())
        .then(res => {
            alert(res);
            alert(JSON.stringify(res));
            var contenido = "<table class='table'>";

            contenido += "<thead>";
            contenido += "<tr>";
            for (var i = 0; i < cabeceras.length; i++) {
                contenido += "<th>";
                contenido += cabeceras[i];
                contenido += "</th>";
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
            }
            contenido += "</tbody>";

            contenido += "</table>";
            document.getElementById(id).innerHTML = contenido;
        })
}

