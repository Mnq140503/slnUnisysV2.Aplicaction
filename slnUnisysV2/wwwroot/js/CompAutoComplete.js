//$(document).ready(function () {
//    $("input.autocomplete").each(function () {
//        var inputElement = $(this);

//        // Leer atributos del input
//        var url = inputElement.data("url");
//        var paramName = inputElement.data("param");
//        var displayField = inputElement.data("term");
//        var valueField = inputElement.data("value");

//        // Leer atributos de tamaño
//        var medida = inputElement.data("medida");
//        var tipoMedida = inputElement.data("tipo-medida");

//        // Crear dinámicamente el input oculto para almacenar el valor seleccionado
//        var hiddenInputId = inputElement.attr("id") + "-valor";
//        var hiddenInput = $("<input>", {
//            type: "hidden",
//            id: hiddenInputId,
//            name: inputElement.attr("name") + "Valor" // Opcional para backend
//        });

//        // Insertar el input oculto justo después del principal
//        inputElement.after(hiddenInput);

//        // Ajustar el tamaño del campo de entrada según el atributo 'medida'
//        switch (medida) {
//            case "uno":
//                inputElement.css("width", "8%");
//                break;
//            case "dos":
//                inputElement.css("width", "16%");
//                break;
//            case "tres":
//                inputElement.css("width", "24%");
//                break;
//            case "cuatro":
//                inputElement.css("width", "32%");
//                break;
//            default:
//                inputElement.css("width", "100%");
//                break;
//        }

//        // Establecer las clases de Bootstrap según 'tipo-medida'
//        if (tipoMedida) {
//            inputElement.addClass("form-control-" + tipoMedida);
//        } else {
//            inputElement.addClass("form-control");
//        }

//        // Configurar el autocompletado
//        inputElement.autocomplete({
//            source: function (request, response) {
//                var params = {};
//                params[paramName] = request.term;

//                $.ajax({
//                    url: url,
//                    dataType: "json",
//                    data: params,
//                    success: function (data) {
//                        const results = data.data || [];

//                        if (results.length === 0) {
//                            response([{
//                                label: "No se encontraron coincidencias",
//                                value: "",
//                                noMatch: true
//                            }]);
//                        } else {
//                            response(results.map(item => ({
//                                label: item[displayField],  // Lo que se muestra al usuario
//                                value: item[valueField],    // Código interno
//                                displayValue: item[displayField] // Nombre visible
//                            })));
//                        }
//                    },
//                    error: function (jqXHR, textStatus, errorThrown) {
//                        console.error("Error al obtener los datos:", textStatus, errorThrown);
//                    }
//                });
//            },
//            minLength: 2,
//            select: function (event, ui) {
//                if (ui.item.noMatch) {
//                    inputElement.val(""); // Limpiar el campo si no hay coincidencias
//                    hiddenInput.val(""); // Limpiar el código
//                    return false;
//                }

//                // Asignar valores
//                inputElement.val(ui.item.displayValue); // Mostrar el texto seleccionado
//                hiddenInput.val(ui.item.value); // Guardar el código en el campo oculto

//                // Evitar sobrescritura inesperada
//                event.preventDefault();
//                console.log("Seleccionado:", ui.item.displayValue, "Código:", ui.item.value);
//            },
//            focus: function (event, ui) {
//                // Evitar sobrescribir el campo visible al navegar por las sugerencias
//                event.preventDefault();
//                if (!ui.item.noMatch) {
//                    inputElement.val(ui.item.displayValue);
//                }
//            }
//        });

//        // Validar el valor al enviar el formulario
//        inputElement.closest("form").on("submit", function () {
//            if (!hiddenInput.val()) {
//                alert("Por favor, selecciona un cliente válido.");
//                return false; // Evita enviar el formulario si no hay un código
//            }
//        });
//    });
//});

//$(document).ready(function () {
//    $("input.autocomplete").each(function () {
//        var inputElement = $(this);

//        // Leer atributos del input
//        var url = inputElement.data("url");
//        var paramName = inputElement.data("param");
//        var displayField = inputElement.data("term");
//        var valueField = inputElement.data("value");

//        // Leer atributos de tamaño
//        var medida = inputElement.data("medida");
//        var tipoMedida = inputElement.data("tipo-medida");

//        // Crear dinámicamente el input oculto para almacenar el valor seleccionado
//        var hiddenInputId = inputElement.attr("id") + "-valor";
//        var hiddenInput = $("<input>", {
//            type: "hidden",
//            id: hiddenInputId,
//            name: inputElement.attr("name") + "Valor" // Opcional para backend
//        });

//        // Insertar el input oculto justo después del principal
//        inputElement.after(hiddenInput);

//        // Obtener las dependencias (si existen)
//        var dependencies = inputElement.data("dependencies");
//        var dependencyValue = {}; // Objeto que contendrá los valores de dependencia

//        if (dependencies) {
//            try {
//                // Recuperar el atributo "data-dependencies" directamente como cadena
//                var rawDependencies = inputElement.attr("data-dependencies");

//                // Convertir la cadena JSON en un objeto JavaScript
//                console.log("Dependencias sin procesar: ", rawDependencies);
//                dependencies = JSON.parse(rawDependencies);

//                // Iterar sobre las dependencias y obtener los valores de los controles asociados
//                for (var param in dependencies) {
//                    if (dependencies.hasOwnProperty(param)) {
//                        var selector = dependencies[param].trim();

//                        // Obtener el valor del selector (control dependiente)
//                        var value = $(selector).val();  // Obtener el valor del selector
//                        dependencyValue[param] = value;  // Guardar el valor de la dependencia
//                    }
//                }

//                console.log("Dependencias procesadas: ", dependencyValue);
//            } catch (e) {
//                console.error("Error al parsear las dependencias: ", e);
//                return;
//            }
//        }


//        // Configurar el autocompletado
//        inputElement.autocomplete({
//            source: function (request, response) {
//                var params = {};
//                params[paramName] = request.term; // El parámetro principal (RazonSocial)

//                // Agregar las dependencias a los parámetros si existen
//                if (Object.keys(dependencyValue).length > 0) {
//                    for (var key in dependencyValue) {
//                        if (dependencyValue.hasOwnProperty(key)) {
//                            params[key] = dependencyValue[key];  // Agregar el valor de cada dependencia
//                        }
//                    }
//                }

//                $.ajax({
//                    url: url,
//                    dataType: "json",
//                    data: params,
//                    success: function (data) {
//                        const results = data.data || [];

//                        if (results.length === 0) {
//                            response([{
//                                label: "No se encontraron coincidencias",
//                                value: "",
//                                noMatch: true
//                            }]);
//                        } else {
//                            response(results.map(item => ({
//                                label: item[displayField],  // Lo que se muestra al usuario
//                                value: item[valueField],    // Código interno
//                                displayValue: item[displayField] // Nombre visible
//                            })));
//                        }
//                    },
//                    error: function (jqXHR, textStatus, errorThrown) {
//                        console.error("Error al obtener los datos:", textStatus, errorThrown);
//                    }
//                });
//            },
//            minLength: 2,
//            select: function (event, ui) {
//                if (ui.item.noMatch) {
//                    inputElement.val(""); // Limpiar el campo si no hay coincidencias
//                    hiddenInput.val(""); // Limpiar el código
//                    return false;
//                }

//                // Asignar valores
//                inputElement.val(ui.item.displayValue); // Mostrar el texto seleccionado
//                hiddenInput.val(ui.item.value); // Guardar el código en el campo oculto

//                // Evitar sobrescritura inesperada
//                event.preventDefault();
//            }
//        });

//        // Validar el valor al enviar el formulario
//        inputElement.closest("form").on("submit", function () {
//            if (!hiddenInput.val()) {
//                alert("Por favor, selecciona un cliente válido.");
//                return false; // Evita enviar el formulario si no hay un código
//            }
//        });
//    });
//});




$(document).ready(function () {
    $("input.autocomplete").each(function () {
        var inputElement = $(this);

        // Leer atributos del input
        var url = inputElement.data("url");
        var paramName = inputElement.data("param");
        var displayField = inputElement.data("term");
        var valueField = inputElement.data("value");
        var dependencies = {};

        // Leer atributos de tamaño
        var medida = inputElement.data("medida");
        var tipoMedida = inputElement.data("tipo-medida");

        // Ajustar el tamaño del campo de entrada según el atributo 'medida'
        //switch (medida) {
        //    case "uno":
        //        inputElement.css("width", "8%");
        //        break;
        //    case "dos":
        //        inputElement.css("width", "16%");
        //        break;
        //    case "tres":
        //        inputElement.css("width", "24%");
        //        break;
        //    case "cuatro":
        //        inputElement.css("width", "32%");
        //        break;
        //    default:
        //        inputElement.css("width", "100%");
        //        break;
        //}

        // Establecer las clases de Bootstrap según 'tipo-medida'
        if (tipoMedida) {
            inputElement.addClass("form-control-" + tipoMedida);
        } else {
            inputElement.addClass("form-control");
        }

        // Crear input adicional para almacenar el valor interno
        var hiddenInputId = inputElement.attr("id") + "-value";
        var hiddenInput = $("<input>")
            .attr("type", "hidden")
            .attr("id", hiddenInputId)
            .attr("name", hiddenInputId);
        inputElement.after(hiddenInput);

        // Detectar dependencias dinámicamente
        $.each(this.attributes, function (_, attr) {
            if (attr.name.startsWith("data-dependency-")) {
                var paramName = attr.name.replace("data-dependency-", "");
                dependencies[paramName] = $(attr.value); // Guardar el control asociado
            }
        });

        // Configurar el autocompletado
        inputElement.autocomplete({
            source: function (request, response) {
                var params = {};
                params[paramName] = request.term;

                // Procesar dependencias y obtener valores actuales
                $.each(dependencies, function (key, element) {
                    var value;

                    if (element.prop("multiple")) {
                        // Si el control tiene el atributo 'multiple', obtener todos los valores seleccionados
                        value = element.val(); // Esto devolverá un array
                        if (value && Array.isArray(value)) {
                            // Unir los valores en una cadena separada por comas
                            value = value.join(",");
                        }
                    } else {
                        // Si no es múltiple, obtener el valor directamente
                        value = element.val();
                    }

                    params[key] = value; // Agregar el valor como parámetro
                });

                // Realizar la solicitud AJAX
                $.ajax({
                    url: url,
                    dataType: "json",
                    data: params,
                    success: function (data) {
                        const results = data.data || [];

                        if (results.length === 0) {
                            response([{
                                label: "No se encontraron coincidencias",
                                value: "",
                                noMatch: true
                            }]);
                        } else {
                            response(results.map(item => ({
                                label: item[displayField], // Mostrar al usuario
                                value: item[valueField],   // Código interno
                                displayValue: item[displayField] // Nombre visible
                            })));
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.error("Error al obtener los datos:", textStatus, errorThrown);
                    }
                });
            },
            minLength: 2,
            select: function (event, ui) {
                if (ui.item.noMatch) {
                    inputElement.val(""); // Limpiar el campo si no hay coincidencias
                    hiddenInput.val(""); // Limpiar el valor interno
                    return false;
                }

                // Asignar valores al input visible y al oculto
                inputElement.val(ui.item.displayValue); // Mostrar el término visible
                hiddenInput.val(ui.item.value); // Guardar el código interno
                console.log("Seleccionado:", ui.item.displayValue, "Código:", ui.item.value);

                return false; // Evitar que el autocompletado reemplace el valor
            },
            focus: function (event, ui) {
                // Mantener el término visible al navegar por las opciones
                inputElement.val(ui.item.displayValue);
                return false;
            }
        });

        // Validar el valor al enviar el formulario
        inputElement.closest("form").on("submit", function () {
            if (!hiddenInput.val()) {
                alert("Por favor, selecciona un cliente válido.");
                return false; // Evita enviar el formulario si no hay un código
            }
        });
    });
});



