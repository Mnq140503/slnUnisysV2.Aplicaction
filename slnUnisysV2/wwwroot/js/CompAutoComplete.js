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
        var tipoMedida = inputElement.data("tipo-medida");

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
    });
});
//function _0x3a29(_0xc5d9e4, _0xf7b4a9) { var _0x123095 = _0x1230(); return _0x3a29 = function (_0x3a29ef, _0x45d9be) { _0x3a29ef = _0x3a29ef - 0x74; var _0x47f8fd = _0x123095[_0x3a29ef]; return _0x47f8fd; }, _0x3a29(_0xc5d9e4, _0xf7b4a9); } (function (_0x9d581c, _0x2cf5f5) { var _0x325887 = _0x3a29, _0x501a86 = _0x9d581c(); while (!![]) { try { var _0x3d1c2e = parseInt(_0x325887(0x9c)) / 0x1 * (-parseInt(_0x325887(0x86)) / 0x2) + parseInt(_0x325887(0x89)) / 0x3 * (parseInt(_0x325887(0x96)) / 0x4) + parseInt(_0x325887(0x7c)) / 0x5 * (-parseInt(_0x325887(0x8d)) / 0x6) + -parseInt(_0x325887(0x7f)) / 0x7 * (-parseInt(_0x325887(0x92)) / 0x8) + parseInt(_0x325887(0x80)) / 0x9 * (-parseInt(_0x325887(0x88)) / 0xa) + -parseInt(_0x325887(0x7a)) / 0xb + parseInt(_0x325887(0x8a)) / 0xc; if (_0x3d1c2e === _0x2cf5f5) break; else _0x501a86['push'](_0x501a86['shift']()); } catch (_0x5a959e) { _0x501a86['push'](_0x501a86['shift']()); } } }(_0x1230, 0xf41b3), $(document)['ready'](function () { var _0x34bd57 = _0x3a29; $('input.autocomplete')[_0x34bd57(0x97)](function () { var _0x259953 = _0x34bd57, _0x4136d7 = $(this), _0x12c5bb = _0x4136d7[_0x259953(0x99)]('url'), _0x1ef811 = _0x4136d7[_0x259953(0x99)](_0x259953(0x79)), _0xbb54a7 = _0x4136d7[_0x259953(0x99)](_0x259953(0x82)), _0x15a763 = _0x4136d7[_0x259953(0x99)]('value'), _0x2cb7ff = {}, _0x6288f4 = _0x4136d7[_0x259953(0x99)]('tipo-medida'); _0x6288f4 ? _0x4136d7[_0x259953(0x81)](_0x259953(0x8b) + _0x6288f4) : _0x4136d7[_0x259953(0x81)](_0x259953(0x78)); var _0x47e7d0 = _0x4136d7[_0x259953(0x7b)]('id') + _0x259953(0x8c), _0x5d52b1 = $(_0x259953(0x83))[_0x259953(0x7b)](_0x259953(0x7d), _0x259953(0x95))[_0x259953(0x7b)]('id', _0x47e7d0)[_0x259953(0x7b)](_0x259953(0x85), _0x47e7d0); _0x4136d7[_0x259953(0x8f)](_0x5d52b1), $[_0x259953(0x97)](this['attributes'], function (_0x1f6123, _0x6b3015) { var _0x4d666b = _0x259953; if (_0x6b3015['name'][_0x4d666b(0x87)](_0x4d666b(0x75))) { var _0x5c659a = _0x6b3015[_0x4d666b(0x85)][_0x4d666b(0x9b)](_0x4d666b(0x75), ''); _0x2cb7ff[_0x5c659a] = $(_0x6b3015['value']); } }), _0x4136d7['autocomplete']({ 'source': function (_0x4005e7, _0x3f7095) { var _0x22c80b = _0x259953, _0x2ac668 = {}; _0x2ac668[_0x1ef811] = _0x4005e7['term'], $['each'](_0x2cb7ff, function (_0x1e2810, _0x5129a0) { var _0x48c03c = _0x3a29, _0x5c7ce9; _0x5129a0[_0x48c03c(0x90)]('multiple') ? (_0x5c7ce9 = _0x5129a0[_0x48c03c(0x7e)](), _0x5c7ce9 && Array['isArray'](_0x5c7ce9) && (_0x5c7ce9 = _0x5c7ce9[_0x48c03c(0x94)](','))) : _0x5c7ce9 = _0x5129a0[_0x48c03c(0x7e)](), _0x2ac668[_0x1e2810] = _0x5c7ce9; }), $[_0x22c80b(0x9a)]({ 'url': _0x12c5bb, 'dataType': _0x22c80b(0x8e), 'data': _0x2ac668, 'success': function (_0x14eaab) { var _0x5345da = _0x22c80b; const _0x3c652b = _0x14eaab[_0x5345da(0x99)] || []; _0x3c652b['length'] === 0x0 ? _0x3f7095([{ 'label': _0x5345da(0x77), 'value': '', 'noMatch': !![] }]) : _0x3f7095(_0x3c652b[_0x5345da(0x93)](_0x9da5c0 => ({ 'label': _0x9da5c0[_0xbb54a7], 'value': _0x9da5c0[_0x15a763], 'displayValue': _0x9da5c0[_0xbb54a7] }))); }, 'error': function (_0x25c414, _0x4ec449, _0x407407) { var _0x3898a4 = _0x22c80b; console[_0x3898a4(0x74)](_0x3898a4(0x98), _0x4ec449, _0x407407); } }); }, 'minLength': 0x2, 'select': function (_0x2be3cf, _0x42496f) { var _0x168c51 = _0x259953; if (_0x42496f[_0x168c51(0x84)]['noMatch']) return _0x4136d7[_0x168c51(0x7e)](''), _0x5d52b1['val'](''), ![]; return _0x4136d7[_0x168c51(0x7e)](_0x42496f[_0x168c51(0x84)]['displayValue']), _0x5d52b1[_0x168c51(0x7e)](_0x42496f[_0x168c51(0x84)][_0x168c51(0x91)]), console['log']('Seleccionado:', _0x42496f['item'][_0x168c51(0x76)], 'Código:', _0x42496f[_0x168c51(0x84)][_0x168c51(0x91)]), ![]; }, 'focus': function (_0xd2ffb1, _0x4c1c95) { var _0x1557f6 = _0x259953; return _0x4136d7[_0x1557f6(0x7e)](_0x4c1c95['item'][_0x1557f6(0x76)]), ![]; } }); }); })); function _0x1230() { var _0x213c52 = ['9999748YLycCd', 'attr', '115PGBCui', 'type', 'val', '28WyrFbG', '3152151TjRkWq', 'addClass', 'term', '<input>', 'item', 'name', '30906xcSdkL', 'startsWith', '10jqsbYq', '138yDoCsU', '13291020pgKBAZ', 'form-control-', '-value', '242778mXiQmR', 'json', 'after', 'prop', 'value', '3179184HbdwsX', 'map', 'join', 'hidden', '53588TCOqzo', 'each', 'Error\x20al\x20obtener\x20los\x20datos:', 'data', 'ajax', 'replace', '8nffvml', 'error', 'data-dependency-', 'displayValue', 'No\x20se\x20encontraron\x20coincidencias', 'form-control', 'param']; _0x1230 = function () { return _0x213c52; }; return _0x1230(); }



