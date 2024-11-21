$(document).ready(function () {
    var selectElement = $("select.selectElement");

    // Leer los atributos del select
    var url = selectElement.data("url");                // URL del servicio SOAP
    var displayField = selectElement.data("term");      // Campo a mostrar en la lista (ej. "NOMBRE")
    var valueField = selectElement.data("value");       // Campo que se usa como valor (ej. "CODIGO")

    // Leer los atributos nuevos para ajustar el tamaño
    var medida = selectElement.data("medida");  // Atributo para tamaño (ej. "uno", "dos")
    var tipoMedida = selectElement.data("tipo-medida");  // Atributo para tipo de medida (ej. "sm", "lg")

    // Establecer el tamaño del campo de entrada según el atributo 'medida'
    switch (medida) {
        case "uno":
            selectElement.css("width", "8%");
            break;
        case "dos":
            selectElement.css("width", "16%");
            break;
        case "tres":
            selectElement.css("width", "24%");
            break;
        case "cuatro":
            selectElement.css("width", "32%");
            break;
        default:
            selectElement.css("width", "100%");
            break;
    }

    // Establecer las clases de Bootstrap según 'tipo-medida' (ej. 'sm', 'lg')
    if (tipoMedida) {
        selectElement.addClass("form-control-" + tipoMedida);
    }

    // Realizar la solicitud AJAX para cargar las opciones al cargar la página
    $.ajax({
        url: url,        // URL del servicio
        dataType: "json",
        success: function (data) {
            // Limpiar las opciones previas
            selectElement.empty();

            // Agregar una opción predeterminada
            selectElement.append('<option value="">Seleccione...</option>');

            // Filtrar los resultados (si es necesario)
            const filteredData = data.data; // En este caso, no aplicamos filtro adicional

            // Si no hay resultados, mostramos el mensaje "No se encontraron coincidencias"
            if (filteredData.length === 0) {
                selectElement.append('<option value="" disabled>No se encontraron coincidencias</option>');
            } else {
                // Llenar el select con las opciones de los resultados filtrados
                filteredData.forEach(item => {
                    selectElement.append('<option value="' + item[valueField] + '">' + item[displayField] + '</option>');
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error al obtener los datos:", textStatus, errorThrown);
        }
    });
});