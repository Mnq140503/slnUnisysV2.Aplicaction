$(document).ready(function () {
    // Iterar sobre cada control UniList
    $("select.selectElement").each(function () {
        var selectElement = $(this);

        // Leer atributos del select actual
        var url = selectElement.data("url");
        var displayField = selectElement.data("term");
        var valueField = selectElement.data("value");
        var dependencies = {};

        // Detectar dependencias dinámicamente
        $.each(this.attributes, function (_, attr) {
            if (attr.name.startsWith("data-dependency-")) {
                var paramName = attr.name.replace("data-dependency-", "");
                dependencies[paramName] = $(attr.value); // Guardar el control asociado
            }
        });

        // Función para cargar los datos del select
        function cargarDatos() {
            var params = {};

            // Procesar dependencias dinámicamente
            $.each(dependencies, function (key, element) {
                var value;

                if (element.prop("multiple")) {
                    // Obtener valores múltiples y unirlos
                    value = element.val();
                    if (value && Array.isArray(value)) {
                        value = value.join(",");
                    }
                } else {
                    // Obtener un solo valor
                    value = element.val();
                }

                params[key] = value || ""; // Agregar el valor al parámetro
            });

            // Realizar la solicitud AJAX
            $.ajax({
                url: url,
                dataType: "json",
                data: params,
                success: function (data) {
                    // Limpiar opciones previas
                    selectElement.empty();

                    // Agregar una opción predeterminada
                    selectElement.append('<option value="">Seleccione...</option>');

                    const filteredData = data.data || [];

                    // Verificar si hay datos
                    if (filteredData.length === 0) {
                        selectElement.append('<option value="" disabled>No se encontraron coincidencias</option>');
                    } else {
                        // Llenar el select con las nuevas opciones
                        filteredData.forEach(item => {
                            selectElement.append('<option value="' + item[valueField] + '">' + item[displayField] + '</option>');
                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Error al obtener los datos:", textStatus, errorThrown);
                }
            });
        }

        // Evento de cambio en las dependencias
        $.each(dependencies, function (_, element) {
            element.on("change", function () {
                cargarDatos();
            });
        });

        // Carga inicial si el atributo `data-load-immediate` está presente
        if (selectElement.data("load-immediate")) {
            cargarDatos();
        }
    });
});

