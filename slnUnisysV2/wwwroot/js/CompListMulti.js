$(document).ready(function () {
    var multiSelectElement = $("select.multiSelectElement");

    // Leer los atributos del select
    var url = multiSelectElement.data("url");                // URL del servicio SOAP
    var displayField = multiSelectElement.data("term");      // Campo a mostrar en la lista (ej. "NOMBRE")
    var valueField = multiSelectElement.data("value");       // Campo que se usa como valor (ej. "CODIGO")

    // Leer los atributos nuevos para ajustar el tamaño
    var medida = multiSelectElement.data("medida");  // Atributo para tamaño (ej. "uno", "dos")
    var tipoMedida = multiSelectElement.data("tipo-medida");  // Atributo para tipo de medida (ej. "sm", "lg")

    // Establecer el tamaño del campo de entrada según el atributo 'medida'
    switch (medida) {
        case "uno":
            multiSelectElement.css("width", "8%");
            multiSelectElement.select2({
                placeholder: "Seleccione opciones",
                allowClear: true,
                width: '8%'
            });
            break;
        case "dos":
            multiSelectElement.css("width", "16%");
            multiSelectElement.select2({
                placeholder: "Seleccione opciones",
                allowClear: true,
                width: '16%'
            });
            break;
        case "tres":
            multiSelectElement.css("width", "24%");
            multiSelectElement.select2({
                placeholder: "Seleccione opciones",
                allowClear: true,
                width: '24%'
            });
            break;
        case "cuatro":
            multiSelectElement.css("width", "32%");
            multiSelectElement.select2({
                placeholder: "Seleccione opciones",
                allowClear: true,
                width: '32%'
            });
            break;
        default:
            multiSelectElement.css("width", "100%");
            multiSelectElement.select2({
                placeholder: "Seleccione opciones",
                allowClear: true,
                width: '100%'
            });
            break;
    }

    // Establecer las clases de Bootstrap según 'tipo-medida' (ej. 'sm', 'lg')
    if (tipoMedida) {
        multiSelectElement.addClass("form-control-" + tipoMedida);
    }

    // Realizar la solicitud AJAX para cargar las opciones al cargar la página
    $.ajax({
        url: url,        // URL del servicio
        dataType: "json",
        success: function (data) {
            // Limpiar las opciones previas
            multiSelectElement.empty();

            // Agregar una opción predeterminada
            multiSelectElement.append('<option value="">Seleccione...</option>');

            // Filtrar los resultados (si es necesario)
            const filteredData = data.data; // En este caso, no aplicamos filtro adicional

            // Si no hay resultados, mostramos el mensaje "No se encontraron coincidencias"
            if (filteredData.length === 0) {
                multiSelectElement.append('<option value="" disabled>No se encontraron coincidencias</option>');
            } else {
                // Llenar el select con las opciones de los resultados filtrados
                filteredData.forEach(item => {
                    multiSelectElement.append('<option value="' + item[valueField] + '">' + item[displayField] + '</option>');
                });
            }

            // Refrescar select2 después de agregar las opciones
            multiSelectElement.trigger('change');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error al obtener los datos:", textStatus, errorThrown);
        }
    });

});