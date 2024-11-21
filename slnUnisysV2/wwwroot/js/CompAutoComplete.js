//$(document).ready(function () {
//    $("input.autocomplete").each(function () {
//        var inputElement = $(this);

//        // Leer los atributos del input
//        var url = inputElement.data("url");                // URL del servicio SOAP
//        var paramName = inputElement.data("param");        // El primer parámetro (ej. "RazonSocial")
//        var displayField = inputElement.data("term");      // Campo que se muestra en la lista (ej. "NOMBRE")
//        var valueField = inputElement.data("value");       // Campo que se usa como valor (ej. "CODIGO")

//        // Configurar el autocompletado
//        $(inputElement).autocomplete({
//            source: function (request, response) {
//                // Preparar los parámetros para la solicitud AJAX
//                var params = {};
//                params[paramName] = request.term;  // El primer parámetro será el término de búsqueda (ej. RazonSocial)
//                // Si tienes más parámetros como "UserName", se pueden agregar de forma similar
//                params.UserName = "mnunez";  // Asumiendo un valor de ejemplo para el parámetro UserName

//                // Realizar la solicitud AJAX
//                $.ajax({
//                    url: url,        // URL del servicio
//                    dataType: "json",
//                    data: params,    // Pasar los parámetros definidos
//                    success: function (data) {
//                        // Filtrar los resultados usando el campo de término (mostrar el campo `displayField`)
//                        const filteredData = data.data.filter(item =>
//                            item[displayField].toLowerCase().includes(request.term.toLowerCase())
//                        );

//                        // Si no hay resultados, mostramos el mensaje "No se encontraron coincidencias"
//                        if (filteredData.length === 0) {
//                            response([{
//                                label: "No se encontraron coincidencias",
//                                value: "",
//                                noMatch: true  // Indicamos que no hay coincidencias
//                            }]);
//                        } else {
//                            // Formatear los resultados para la sugerencia del autocompletado
//                            response(filteredData.map(item => ({
//                                label: item[displayField],  // Campo visible para el usuario (ej. "NOMBRE")
//                                value: item[displayField],  // Valor visible después de la selección
//                                [valueField]: item[valueField]  // El valor real del ítem (ej. "CODIGO")
//                            })));
//                        }
//                    },
//                    error: function (jqXHR, textStatus, errorThrown) {
//                        console.error("Error al obtener los datos:", textStatus, errorThrown);
//                    }
//                });
//            },
//            minLength: 2,  // Mínimo de caracteres para activar la búsqueda
//            select: function (event, ui) {
//                // Acción cuando se selecciona un valor del autocompletado
//                console.log("Seleccionado:", ui.item.value, "Código:", ui.item[valueField]);
//            },
//            // Modificar el comportamiento del renderizado del menú
//            response: function (event, ui) {
//                // Verificar si no hay coincidencias
//                if (ui.content[0] && ui.content[0].noMatch) {
//                    // Se agrega la clase para diferenciar el mensaje de "no coincidencias"
//                    $(this).autocomplete("widget").addClass("no-results");
//                } else {
//                    $(this).autocomplete("widget").removeClass("no-results");
//                }
//            }
//        });
//    });
//});

$(document).ready(function () {
    $("input.autocomplete").each(function () {
        var inputElement = $(this);

        // Leer los atributos del input
        var url = inputElement.data("url");                // URL del servicio SOAP
        var paramName = inputElement.data("param");        // El primer parámetro (ej. "RazonSocial")
        var displayField = inputElement.data("term");      // Campo que se muestra en la lista (ej. "NOMBRE")
        var valueField = inputElement.data("value");       // Campo que se usa como valor (ej. "CODIGO")

        // Leer los atributos nuevos para ajustar el tamaño
        var medida = inputElement.data("medida");  // Atributo para tamaño (ej. "uno", "dos")
        var tipoMedida = inputElement.data("tipo-medida");  // Atributo para tipo de medida (ej. "sm", "lg")

        // Establecer el tamaño del campo de entrada según el atributo 'medida'
        switch (medida) {
            case "uno":
                inputElement.css("width", "8%");   // Establecer un tamaño específico en porcentaje o px
                break;
            case "dos":
                inputElement.css("width", "16%");  // Ajustar según el tamaño correspondiente
                break;
            case "tres":
                inputElement.css("width", "24%");
                break;
            case "cuatro":
                inputElement.css("width", "32%");
                break;
            // Puedes seguir con más casos hasta "doce"
            default:
                inputElement.css("width", "100%"); // Ancho predeterminado si no se especifica
                break;
        }

        // Establecer las clases de Bootstrap según 'tipo-medida' (ej. 'sm', 'lg')
        if (tipoMedida) {
            inputElement.addClass("form-control-" + tipoMedida);
        }

        // Configurar el autocompletado
        $(inputElement).autocomplete({
            source: function (request, response) {
                // Preparar los parámetros para la solicitud AJAX
                var params = {};
                params[paramName] = request.term;  // El primer parámetro será el término de búsqueda (ej. RazonSocial)
                // Realizar la solicitud AJAX
                $.ajax({
                    url: url,        // URL del servicio
                    dataType: "json",
                    data: params,    // Pasar los parámetros definidos
                    success: function (data) {
                        // Filtrar los resultados usando el campo de término (mostrar el campo `displayField`)
                        const filteredData = data.data.filter(item =>
                            item[displayField].toLowerCase().includes(request.term.toLowerCase())
                        );

                        // Si no hay resultados, mostramos el mensaje "No se encontraron coincidencias"
                        if (filteredData.length === 0) {
                            response([{
                                label: "No se encontraron coincidencias",
                                value: "",
                                noMatch: true  // Indicamos que no hay coincidencias
                            }]);
                        } else {
                            // Formatear los resultados para la sugerencia del autocompletado
                            response(filteredData.map(item => ({
                                label: item[displayField],  // Campo visible para el usuario (ej. "NOMBRE")
                                value: item[displayField],  // Valor visible después de la selección
                                [valueField]: item[valueField]  // El valor real del ítem (ej. "CODIGO")
                            })));
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.error("Error al obtener los datos:", textStatus, errorThrown);
                    }
                });
            },
            minLength: 2,  // Mínimo de caracteres para activar la búsqueda
            select: function (event, ui) {
                // Acción cuando se selecciona un valor del autocompletado
                console.log("Seleccionado:", ui.item.value, "Código:", ui.item[valueField]);
            },
            // Modificar el comportamiento del renderizado del menú
            response: function (event, ui) {
                // Verificar si no hay coincidencias
                if (ui.content[0] && ui.content[0].noMatch) {
                    // Se agrega la clase para diferenciar el mensaje de "no coincidencias"
                    $(this).autocomplete("widget").addClass("no-results");
                } else {
                    $(this).autocomplete("widget").removeClass("no-results");
                }
            }
        });
    });
});
