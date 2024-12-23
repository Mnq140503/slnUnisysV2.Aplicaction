function showLoadingOverlay(message = "Cargando...", logoUrl = "../img/spinner.gif") {
    // Crear el overlay
    var overlay = document.createElement("div");
    overlay.id = "loading-overlay";  // Asignar ID para referenciarlo fácilmente
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";  // Asegura que esté encima de otros contenidos
    overlay.style.color = "#fff";
    overlay.style.fontSize = "16px";
    overlay.style.fontFamily = "Arial, sans-serif";
    overlay.style.textAlign = "center";

    // Agregar propiedades de transición para la suavidad de la entrada
    overlay.style.opacity = "0";  // Inicialmente invisible
    overlay.style.transition = "opacity 0.5s ease-in-out";  // Transición de opacidad suave

    // Crear el contenedor de contenido dentro del overlay
    var content = document.createElement("div");
    content.style.display = "flex";
    content.style.flexDirection = "column"; // Logo arriba, texto abajo
    content.style.alignItems = "center";
    content.style.justifyContent = "center";
    content.style.padding = "20px";

    // Crear la imagen del logo
    var logo = document.createElement("img");
    logo.src = logoUrl;
    logo.alt = "Logo de carga";
    logo.style.width = "80px";  // Ajusta el tamaño del logo
    logo.style.height = "auto";  // Mantén la proporción original
    logo.style.marginBottom = "15px";  // Espacio entre el logo y el texto

    // Crear el mensaje
    var text = document.createElement("h5");
    text.innerHTML = message;
    text.style.margin = "0";
    text.style.fontSize = "18px";  // Ajusta el tamaño del texto
    text.style.fontWeight = "normal";

    // Añadir el logo y el texto al contenedor
    content.appendChild(logo);
    content.appendChild(text);

    // Añadir el contenedor al overlay
    overlay.appendChild(content);

    // Añadir el overlay al cuerpo del documento
    document.body.appendChild(overlay);

    // Usar setTimeout para permitir que la transición de opacidad suceda
    setTimeout(function () {
        overlay.style.opacity = "1";  // Cambiar la opacidad a 1 para que el overlay aparezca suavemente
    }, 10);  // Ejecutar después de que el overlay se haya agregado al DOM
};

// Llamada para mostrar el overlay


// Llamada para ocultar el overlay
function hideLoadingOverlay() {
    var overlay = document.getElementById("loading-overlay");
    if (overlay) {
        overlay.style.opacity = "0";  // Iniciar la transición de salida (desvanecimiento)
        setTimeout(function () {
            document.body.removeChild(overlay);  // Eliminar el overlay después de que la animación termine
        }, 500);  // El tiempo de espera coincide con la duración de la transición
    }
};


// hideLoadingOverlay();


const MODELO_BASE_SOLICITUD = {
    X_NRO_STR: 0,
    X_COD_CEO: "",
    X_COD_DIV: "",
    X_COD_UND: 0,
    X_COD_CLI: 0,
    X_TIP_STR: "",
    X_TIP_TBJ: "",
    X_COD_AUS: "",
    X_REF_STR: "",
    X_FEC_REF: "",
    X_COD_PRESUPUESTO: "",
    X_NRO_REVISION: "",
    X_DES_ABR: "",
    X_DES_DET: "",
    X_CLS_TBJ: "",
    //X_DIQUE: "",
    X_TIP_TAR: "",
    //X_EST_ATL: "SOL",
    X_FEC_RCP_STR: "",
    //X_HRA_RCP_STR: "",
    X_REF_STR_MGP: "",
    //X_FEC_REF_MGP: "",
    X_COD_EQP: 0,
    X_UBC_EQP: ""
}

$(document).ready(function () {
    // Inicialización de la tabla DataTable
    tablaData = $('#tbSolicitud').DataTable({
        responsive: true,  // Para hacer que la tabla sea adaptable en dispositivos móviles
        select: true,      // Habilitar la selección de filas
        dom: "<'row'<'col-sm-6 d-flex justify-content-start'B><'col-sm-6 d-flex justify-content-end'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        buttons: [
            {
                extend: 'excelHtml5',  // Botón para exportar a Excel
                text: 'Exportar a Excel',
                title: 'Solicitud_Export' // Título del archivo exportado
            },
            {
                extend: 'pdfHtml5',    // Botón para exportar a PDF
                text: 'Exportar a PDF',
                title: 'Solicitud_Export',
                orientation: 'landscape',  // Usa 'landscape' para que la tabla ocupe más espacio horizontalmente
                pageSize: 'A2',            // Tamaño de página
                customize: function (doc) {
                    doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split(''); // Asegura que las columnas se ajusten al tamaño de la tabla
                }
            },
            'pageLength'
        ],
        "ajax": {
            "url": '/Comercial/Solicitud/Listar',
            "type": "POST",
            "data": function (d) {
                d.filterCentro = $('#filterCentro').val() || "";
            },
            "datatype": "json",
            "beforeSend": function () {
                // Mostrar el overlay de carga antes de la solicitud AJAX
                showLoadingOverlay("Por favor espere...", "../img/spinner.gif");
                //$(".main-content").LoadingOverlay("show", {
                //    //text: "Espere...",
                //    //textAutoResize: true,
                //    background: "rgba(255, 255, 255, 0.7)",  // Fondo semitransparente
                //    image: `../img/spinner.gif`,
                //    css: {
                //        color: "#333",  // Color del texto
                //        fontSize: "16px",  // Texto pequeño
                //        textAlign: "center",
                //        zIndex: 9999,
                //        padding: "15px",
                //        borderRadius: "10px",
                //    }// Mensaje que aparece en el overlay
                //});
            },
            "complete": function () {
                // Ocultar el overlay de carga después de la solicitud AJAX
                hideLoadingOverlay();
                //$.LoadingOverlay("hide");
                //$(".main-content").LoadingOverlay("hide");
            }
        },
        "columns": [
            { "data": "nroSolicitud", "title": "N° Solicitud" },
            { "data": "linea", "title": "Línea" },
            { "data": "cliente", "title": "Cliente" },
            { "data": "EMBARCACION_x0020__x002F__x0020_PROYECTO", "title": "Embarcación/Proyecto", "defaultContent": "-" },
            { "data": "tipoSolicitud", "title": "T. Solicitud", "defaultContent": "-" },
            { "data": "actividad", "title": "Actividad", "defaultContent": "-" },
            { "data": "estado", "title": "Estado", "defaultContent": "-" },
            { "data": "usuarioReg", "title": "U. Registro", "defaultContent": "-" },
            { "data": "fechaReg", "title": "F. Registro", "defaultContent": "-" },
        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        },
        // Configuración de la fila fija (Header)
        fixedHeader: true,  // Fija el encabezado mientras se hace scroll
        // Funcionalidad de agrupación de filas (RowGroup)
        rowGroup: {
            dataSrc: 'linea'  // Agrupar por estado, por ejemplo
        }
    }); 

    $('#filterCentro').on('change', function () {
        tablaData.ajax.reload();
    });

    $('#filterLinea').on('change', function () {
        tablaData.column(1).search(this.value).draw();
    });

    // Filtrar por Cliente
    $('#filterCliente').on('keyup change', function () {
        tablaData.column(2).search(this.value).draw();
    });

    // Filtrar por Estado
    $('#filterEstado').on('change', function () {
        tablaData.column(3).search(this.value).draw();
    });

    // Restablecer Filtros
    $('#btnResetFilters').on('click', function () {
        $('#filterCentro, #filterLinea, #filterCliente, #filterEstado').val('').trigger('change');
        tablaData.search('').columns().search('').draw();
    });
});

//$(document).ready(function () {
//    // Inicialización de la tabla DataTable
//    tablaData = $('#tbSolicitud').DataTable({
//        responsive: true,  // Para hacer que la tabla sea adaptable en dispositivos móviles
//        select: true,      // Habilitar la selección de filas
//        dom: "<'row'<'col-sm-6 d-flex justify-content-start'B><'col-sm-6 d-flex justify-content-end'f>>" +
//            "<'row'<'col-sm-12'tr>>" +
//            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
//        buttons: [
//            {
//                extend: 'excelHtml5',  // Botón para exportar a Excel
//                text: 'Exportar a Excel',
//                title: 'Solicitud_Export' // Título del archivo exportado
//            },
//            {
//                extend: 'pdfHtml5',    // Botón para exportar a PDF
//                text: 'Exportar a PDF',
//                title: 'Solicitud_Export',
//                orientation: 'landscape',  // Usa 'landscape' para que la tabla ocupe más espacio horizontalmente
//                pageSize: 'A2',            // Tamaño de página
//                customize: function (doc) {
//                    doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split(''); // Asegura que las columnas se ajusten al tamaño de la tabla
//                }
//            },
//            'pageLength'
//        ],
//        "ajax": {
//            "url": '/Comercial/Solicitud/Listar',
//            "type": "GET",
//            "datatype": "json"
//        },
//        "columns": [
//            { "data": "nroSolicitud", "title": "N° Solicitud" },
//            { "data": "linea", "title": "Línea" },
//            { "data": "cliente", "title": "Cliente" },
//            { "data": "EMBARCACION_x0020__x002F__x0020_PROYECTO", "title": "Embarcación/Proyecto", "defaultContent": "-" },
//            { "data": "tipoSolicitud", "title": "T. Solicitud", "defaultContent": "-" },
//            { "data": "actividad", "title": "Actividad", "defaultContent": "-" },
//            { "data": "estado", "title": "Estado", "defaultContent": "-" },
//            { "data": "usuarioReg", "title": "U. Registro", "defaultContent": "-" },
//            { "data": "fechaReg", "title": "F. Registro", "defaultContent": "-" },
//        ],
//        language: {
//            url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
//        },
//        // Configuración de la fila fija (Header)
//        fixedHeader: true,  // Fija el encabezado mientras se hace scroll
//        // Funcionalidad de agrupación de filas (RowGroup)
//        rowGroup: {
//            dataSrc: 'linea'  // Agrupar por estado, por ejemplo
//        }
//    });

//    $('#filterLinea').on('change', function () {
//        tablaData.column(1).search(this.value).draw();
//    });

//    // Filtrar por Cliente
//    $('#filterCliente').on('keyup change', function () {
//        tablaData.column(2).search(this.value).draw();
//    });

//    // Filtrar por Estado
//    $('#filterEstado').on('change', function () {
//        tablaData.column(3).search(this.value).draw();
//    });

//    // Restablecer Filtros
//    $('#btnResetFilters').on('click', function () {
//        $('#filterLinea, #filterCliente, #filterEstado').val('').trigger('change');
//        tablaData.search('').columns().search('').draw();
//    });
//});

function mostrarModal(modelo = MODELO_BASE_SOLICITUD) {


    $("#ltDivision").val(modelo.X_COD_DIV == 0 ? $("#ltDivision option:first").val() : modelo.X_COD_DIV)
    $("#acCliente-value").val(modelo.X_COD_CLI)
    $("#acEmbarcacion-value").val(modelo.X_COD_UND)
    $("#ltSolicitud").val(modelo.X_TIP_STR == 0 ? $("#ltSolicitud option:first").val() : modelo.X_TIP_STR)
    $("#ltTipoTrabajo").val(modelo.X_TIP_TBJ == 0 ? $("#ltTipoTrabajo option:first").val() : modelo.X_TIP_TBJ)
    $("#ltAreaSolicitante").val(modelo.X_COD_AUS == 0 ? $("#ltAreaSolicitante option:first").val() : modelo.X_COD_AUS)
    $("#txtReferencia").val(modelo.X_REF_STR)
    $("#dtReferencia").val(modelo.X_FEC_REF)
    $("#txtPresupuesto").val(modelo.X_COD_PRESUPUESTO)
    $("#txtRevision").val(modelo.X_NRO_REVISION)
    $("#txtActividad").val(modelo.X_DES_ABR)
    $("#txtObservaciones").val(modelo.X_DES_DET)
    $("#ltClaseTrabajo").val(modelo.X_CLS_TBJ == 0 ? $("#ltClaseTrabajo option:first").val() : modelo.X_CLS_TBJ)
    //$("#ltDiques").val(modelo.X_DIQUE == 0 ? $("#ltDiques option:first").val() : modelo.X_DIQUE)
    $("#ltTarifas").val(modelo.X_TIP_TAR == 0 ? $("#ltTarifas option:first").val() : modelo.X_TIP_TAR)
    $("#dtRecepcion").val(modelo.X_FEC_RCP_STR)
    $("#txtNroSolMGP").val(modelo.X_REF_STR_MGP)
    //$("#dtSolicitudMGP").val(modelo.X_FEC_REF_MGP)
    $("#txtEquipo").val(modelo.X_COD_EQP)
    $("#txtUbicacion").val(modelo.X_UBC_EQP)

    $("#modal").modal("show")
}

$("#btnAgregar").click(function () {
    mostrarModal()
})

$(".requerido").on("blur", function () {
    validateRequiredField($(this));  // Llamamos a la función de validación en cada "blur"
});

// Función para validar los campos requeridos y agregar/quitar clase de error
function validateRequiredField($field) {
    if ($field.val().trim() === "") {
        $field.addClass("error");  // Agregar la clase "error" si está vacío
    } else {
        $field.removeClass("error");  // Quitar la clase "error" si no está vacío
    }
}

$("#btnGuardar").click(function () {

    const requeridos = $('[class*="requerido"]').serializeArray();
    const requeridos_sin_valor = requeridos.filter((item) => item.value.trim() == "")

    if (requeridos_sin_valor.length > 0) {

        const mensaje = `Debe completar el campo: "${requeridos_sin_valor[0].name}"`;
        toastr.warning("",mensaje)

        /*$(`[name="${requeridos_sin_valor[0].name}"]`).focus();*/
        $(`[name="${requeridos_sin_valor[0].name}"]`)
            //.css("border", "2px solid red")
            //.css("box-shadow", "0 0 5px red") // Efecto al borde
            .focus();
        return;
    }

    const modelo = structuredClone(MODELO_BASE_SOLICITUD);
    modelo["X_COD_DIV"] = $("#ltDivision").val()
    modelo["X_COD_CLI"] = parseInt($("#acCliente-value").val() || 0)
    modelo["X_COD_UND"] = parseInt($("#acEmbarcacion-value").val() || 0)
    modelo["X_TIP_STR"] = $("#ltSolicitud").val()
    modelo["X_TIP_TBJ"] = $("#ltTipoTrabajo").val()
    modelo["X_COD_AUS"] = $("#ltAreaSolicitante").val()
    modelo["X_REF_STR"] = $("#txtReferencia").val()
    modelo["X_FEC_REF"] = $("#dtReferencia").val()
    modelo["X_COD_PRESUPUESTO"] = $("#txtPresupuesto").val()
    modelo["X_NRO_REVISION"] = $("#txtRevision").val()
    modelo["X_DES_ABR"] = $("#txtActividad").val()
    modelo["X_DES_DET"] = $("#txtObservaciones").val()
    modelo["X_CLS_TBJ"] = $("#ltClaseTrabajo").val()
    //modelo["X_DIQUE"] = //$("#ltDiques").val()
    modelo["X_TIP_TAR"] = $("#ltTarifas").val()
    modelo["X_FEC_RCP_STR"] = $("#dtRecepcion").val()
    modelo["X_REF_STR_MGP"] = $("#txtNroSolMGP").val()
    //modelo["X_FEC_REF_MGP"] = //$("#dtSolicitudMGP").val()
    modelo["X_COD_EQP"] = $("#txtEquipo").val()
    modelo["X_UBC_EQP"] = $("#txtUbicacion").val()

    const formData = new FormData();

    formData.append("modelo", JSON.stringify(modelo))

    $("#modal").find("div.modal-content").LoadingOverlay("show");

    fetch("/Comercial/Solicitud/Registrar", {
        method: "POST",
        body: formData
    })
        .then(response => {

            $("#modal").find("div.modal-content").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);

        })
        .then(responseJson => {

            if (responseJson.estado) {

                if (responseJson.objeto.x_NRO_STR == 0) {
                    if (responseJson.mensaje.includes("-:")) {
                        Swal.fire("Error!", `Solictud no registrada: ${responseJson.mensaje}`, "error")
                    }
                    else {
                        //tablaData.row.add(responseJson.objeto).draw(false)
                        $("#modal").modal("hide")
                        Swal.fire("Listo!", `Solictud registrada: ${responseJson.mensaje}`, "success")

                        $("button.swal2-confirm.swal2-styled").click(function () {
                            location.reload();
                        })
                    }
                }
                /*tablaData.row.add(responseJson.objecto).draw(false) */

            } else {

                swal("")

            }

        })
})

