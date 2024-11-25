//$(document).ready(function () {
//    var selectElement = $("select.selectElement");

//    // Leer los atributos del select
//    var url = selectElement.data("url");                // URL del servicio SOAP
//    var displayField = selectElement.data("term");      // Campo a mostrar en la lista (ej. "NOMBRE")
//    var valueField = selectElement.data("value");       // Campo que se usa como valor (ej. "CODIGO")

//    // Leer los atributos nuevos para ajustar el tamaño
//    var medida = selectElement.data("medida");  // Atributo para tamaño (ej. "uno", "dos")
//    var tipoMedida = selectElement.data("tipo-medida");  // Atributo para tipo de medida (ej. "sm", "lg")

//    // Establecer el tamaño del campo de entrada según el atributo 'medida'
//    switch (medida) {
//        case "uno":
//            selectElement.css("width", "8%");
//            break;
//        case "dos":
//            selectElement.css("width", "16%");
//            break;
//        case "tres":
//            selectElement.css("width", "24%");
//            break;
//        case "cuatro":
//            selectElement.css("width", "32%");
//            break;
//        default:
//            selectElement.css("width", "100%");
//            break;
//    }

//    // Establecer las clases de Bootstrap según 'tipo-medida' (ej. 'sm', 'lg')
//    if (tipoMedida) {
//        selectElement.addClass("form-control-" + tipoMedida);
//    }

//    // Realizar la solicitud AJAX para cargar las opciones al cargar la página
//    $.ajax({
//        url: url,        // URL del servicio
//        dataType: "json",
//        success: function (data) {
//            // Limpiar las opciones previas
//            selectElement.empty();

//            // Agregar una opción predeterminada
//            selectElement.append('<option value="">Seleccione...</option>');

//            // Filtrar los resultados (si es necesario)
//            const filteredData = data.data; // En este caso, no aplicamos filtro adicional

//            // Si no hay resultados, mostramos el mensaje "No se encontraron coincidencias"
//            if (filteredData.length === 0) {
//                selectElement.append('<option value="" disabled>No se encontraron coincidencias</option>');
//            } else {
//                // Llenar el select con las opciones de los resultados filtrados
//                filteredData.forEach(item => {
//                    selectElement.append('<option value="' + item[valueField] + '">' + item[displayField] + '</option>');
//                });
//            }
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            console.error("Error al obtener los datos:", textStatus, errorThrown);
//        }
//    });
//});


//$(document).ready(function () {
//    $("select.selectElement").each(function () {
//        var selectElement = $(this);

//        // Leer atributos del select
//        var url = selectElement.data("url");                // URL del servicio
//        var displayField = selectElement.data("term");      // Campo a mostrar en la lista
//        var valueField = selectElement.data("value");       // Campo que se usa como valor
//        var dependencies = {};

//        // Leer atributos de tamaño
//        var medida = selectElement.data("medida");
//        var tipoMedida = selectElement.data("tipo-medida");

//        // Ajustar el tamaño del select según el atributo 'medida'
//        switch (medida) {
//            case "uno":
//                selectElement.css("width", "8%");
//                break;
//            case "dos":
//                selectElement.css("width", "16%");
//                break;
//            case "tres":
//                selectElement.css("width", "24%");
//                break;
//            case "cuatro":
//                selectElement.css("width", "32%");
//                break;
//            default:
//                selectElement.css("width", "100%");
//                break;
//        }

//        // Establecer las clases de Bootstrap según 'tipo-medida'
//        if (tipoMedida) {
//            selectElement.addClass("form-control-" + tipoMedida);
//        }

//        // Detectar dependencias dinámicamente
//        $.each(this.attributes, function (_, attr) {
//            if (attr.name.startsWith("data-dependency-")) {
//                var paramName = attr.name.replace("data-dependency-", "");
//                var dependencyElement = $(attr.value);
//                if (dependencyElement.length) {
//                    dependencies[paramName] = dependencyElement; // Guardar el control asociado
//                }
//            }
//        });

//        // Función para cargar las opciones
//        function cargarOpciones() {
//            var params = {};

//            // Obtener los valores actuales de las dependencias
//            $.each(dependencies, function (key, element) {
//                var value = element.val();

//                // Si el valor de la dependencia es null o vacío, no hacer nada
//                if (!value) {
//                    return; // No realizar solicitud
//                }

//                if (element.prop("multiple")) {
//                    // Si el control tiene 'multiple', convertir los valores a una cadena
//                    if (Array.isArray(value)) {
//                        value = value.join(",");
//                    }
//                }

//                params[key] = value; // Agregar el valor como parámetro
//            });

//            // Si no hay valores válidos en las dependencias, no realizar la solicitud
//            if (Object.keys(params).length === 0) {
//                return; // Detener la solicitud si no hay valores de dependencias
//            }

//            // Realizar la solicitud AJAX
//            $.ajax({
//                url: url,
//                dataType: "json",
//                data: params,
//                success: function (data) {
//                    selectElement.empty(); // Limpiar opciones previas

//                    // Agregar una opción predeterminada
//                    selectElement.append('<option value="">Seleccione...</option>');

//                    // Si no hay datos, agregar mensaje de error
//                    if (!data.data || data.data.length === 0) {
//                        selectElement.append('<option value="" disabled>No se encontraron coincidencias</option>');
//                    } else {
//                        // Llenar el select con las opciones
//                        data.data.forEach(item => {
//                            selectElement.append(
//                                '<option value="' + item[valueField] + '">' + item[displayField] + '</option>'
//                            );
//                        });
//                    }
//                },
//                error: function (jqXHR, textStatus, errorThrown) {
//                    console.error("Error al obtener los datos:", textStatus, errorThrown);
//                }
//            });
//        }

//        // Variable para almacenar el valor anterior de la dependencia
//        var previousDependencyValue = null;

//        // Detectar cuando el valor de las dependencias cambia
//        $.each(dependencies, function (key, element) {
//            element.on("change", function () {
//                var newValue = element.val();

//                // Solo realizar la solicitud si el valor de la dependencia cambia y no es null
//                if (newValue !== previousDependencyValue && newValue !== null && newValue !== "") {
//                    cargarOpciones();
//                    previousDependencyValue = newValue; // Actualizar el valor anterior
//                }
//            });
//        });

//        // Detectar cuando el select está a punto de abrirse (con 'focus' o 'mousedown')
//        selectElement.on("focus", function () {
//            // Verificar si alguna dependencia existe antes de intentar acceder a su valor
//            $.each(dependencies, function (key, element) {
//                var currentDependencyValue = element.val(); // Leer el valor actual de la dependencia

//                // Solo cargar las opciones si el valor de la dependencia no es null y ha cambiado
//                if (currentDependencyValue !== previousDependencyValue && currentDependencyValue !== null && currentDependencyValue !== "") {
//                    cargarOpciones(); // Recargar las opciones antes de desplegar la lista
//                    previousDependencyValue = currentDependencyValue; // Actualizar el valor anterior
//                }
//            });
//        });
//    });
//});


$(document).ready(function () {
    $("select.selectElementDep").each(function () {
        var selectElement = $(this);

        // Leer atributos del select
        var url = selectElement.data("url");                // URL del servicio
        var displayField = selectElement.data("term");      // Campo a mostrar en la lista
        var valueField = selectElement.data("value");       // Campo que se usa como valor
        var dependencies = {};

        // Leer atributos de tamaño
        var medida = selectElement.data("medida");
        var tipoMedida = selectElement.data("tipo-medida");

        // Ajustar el tamaño del select según el atributo 'medida'
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

        // Establecer las clases de Bootstrap según 'tipo-medida'
        if (tipoMedida) {
            selectElement.addClass("form-control-" + tipoMedida);
        }

        // Detectar dependencias dinámicamente
        $.each(this.attributes, function (_, attr) {
            if (attr.name.startsWith("data-dependency-")) {
                var paramName = attr.name.replace("data-dependency-", "");
                dependencies[paramName] = $(attr.value); // Guardar el control asociado
            }
        });

        // Función para cargar las opciones
        function cargarOpciones() {
            var params = {};

            // Obtener los valores actuales de las dependencias
            $.each(dependencies, function (key, element) {
                var value = element.val();

                // Si el valor de la dependencia es null o vacío, no hacer nada
                if (!value) {
                    return; // No realizar solicitud
                }

                if (element.prop("multiple")) {
                    // Si el control tiene 'multiple', convertir los valores a una cadena
                    if (Array.isArray(value)) {
                        value = value.join(",");
                    }
                }

                params[key] = value; // Agregar el valor como parámetro
            });

            // Si no hay valores válidos en las dependencias, no realizar la solicitud
            if (Object.keys(params).length === 0) {
                return; // Detener la solicitud si no hay valores de dependencias
            }

            // Realizar la solicitud AJAX
            $.ajax({
                url: url,
                dataType: "json",
                data: params,
                success: function (data) {
                    selectElement.empty(); // Limpiar opciones previas

                    // Agregar una opción predeterminada
                    selectElement.append('<option value="">Seleccione...</option>');

                    // Si no hay datos, agregar mensaje de error
                    if (!data.data || data.data.length === 0) {
                        selectElement.append('<option value="" disabled>No se encontraron coincidencias</option>');
                    } else {
                        // Llenar el select con las opciones
                        data.data.forEach(item => {
                            selectElement.append(
                                '<option value="' + item[valueField] + '">' + item[displayField] + '</option>'
                            );
                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Error al obtener los datos:", textStatus, errorThrown);
                }
            });
        }

        // Variable para almacenar el valor anterior de la dependencia
        var previousDependencyValue = null;

        // Detectar cuando el valor de las dependencias cambia
        $.each(dependencies, function (key, element) {
            element.on("change", function () {
                var newValue = element.val();

                // Solo realizar la solicitud si el valor de la dependencia cambia y no es null
                if (newValue !== previousDependencyValue && newValue !== null && newValue !== "") {
                    cargarOpciones();
                    previousDependencyValue = newValue; // Actualizar el valor anterior
                }
            });
        });

        // Detectar cuando el select está a punto de abrirse (con 'focus' o 'mousedown')
        selectElement.on("focus", function () {
            var currentDependencyValue = dependencies[Object.keys(dependencies)[0]].val(); // Leer el valor actual de la dependencia

            // Solo cargar las opciones si el valor de la dependencia no es null y ha cambiado
            if (currentDependencyValue !== previousDependencyValue && currentDependencyValue !== null && currentDependencyValue !== "") {
                cargarOpciones(); // Recargar las opciones antes de desplegar la lista
                previousDependencyValue = currentDependencyValue; // Actualizar el valor anterior
            }
        });
    });
});
