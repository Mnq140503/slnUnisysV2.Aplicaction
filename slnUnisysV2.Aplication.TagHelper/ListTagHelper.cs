using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enum = slnUnisysV2.TagHelper.Utils.Enum;

namespace slnUnisysV2.TagHelper
{
    /// Este `TagHelper` genera un control de autocompletado con soporte para dependencias dinámicas.
    /// Utiliza un input de texto con funcionalidad de búsqueda a través de AJAX, y permite que otros controles 
    /// afecten los resultados de autocompletado mediante dependencias que se definen en los atributos `data-dependency-*`.
    /// </summary>
    [HtmlTargetElement("UniList")]
    public class ListTagHelper : Microsoft.AspNetCore.Razor.TagHelpers.TagHelper
    {
        /// <summary>
        ///Identificador único del control.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        ///Url del WS que retorna información para el control
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        ///Valor del WS que se mostrara al usuario (DisplayText)
        /// </summary>
        public string Term { get; set; }

        /// <summary>
        ///Valor del WS que indica el valor de los items listados (DataValue)
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        ///Medida del Control
        /// </summary>
        public Enum.Medida Medida { get; set; }

        /// <summary>
        ///Tipo de Medida del Control
        /// </summary>
        public Enum.TipoMedida TipoMedida { get; set; }

        /// <summary>
        ///Atributo de enlace a depedencias con clave ${#idcontroldepedencia}
        /// </summary>
        public Dictionary<string, string> Dependencias { get; set; } = new Dictionary<string, string>();

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "select";

            //atributos basicos del control
            output.Attributes.SetAttribute("id", Id);
            output.Attributes.SetAttribute("type", "text");
            output.Attributes.SetAttribute("class", "selectElement form-select");

            // Ajustar el tamaño según 'Medida'
            switch (Medida)
            {
                case Enum.Medida.Uno:
                    output.Attributes.SetAttribute("style", "width: 10%;");
                    break;
                case Enum.Medida.Dos:
                    output.Attributes.SetAttribute("style", "width: 20%;");
                    break;
                case Enum.Medida.Tres:
                    output.Attributes.SetAttribute("style", "width: 30%;");
                    break;
                case Enum.Medida.Cuatro:
                    output.Attributes.SetAttribute("style", "width: 40%;");
                    break;
                case Enum.Medida.Cinco:
                    output.Attributes.SetAttribute("style", "width: 50%;");
                    break;
                case Enum.Medida.Seis:
                    output.Attributes.SetAttribute("style", "width: 60%;");
                    break;
                case Enum.Medida.Siete:
                    output.Attributes.SetAttribute("style", "width: 70%;");
                    break;
                case Enum.Medida.Ocho:
                    output.Attributes.SetAttribute("style", "width: 80%;");
                    break;
                case Enum.Medida.Nueve:
                    output.Attributes.SetAttribute("style", "width: 90%;");
                    break;
                default:
                    output.Attributes.SetAttribute("style", "width: 100%;");
                    break;
            }

            if (!string.IsNullOrEmpty(TipoMedida.ToString()))
            {
                output.Attributes.SetAttribute("class", $"selectElement form-select form-control-{TipoMedida}");
            }

            output.Attributes.SetAttribute("data-url", Url);
            output.Attributes.SetAttribute("data-term", Term);
            output.Attributes.SetAttribute("data-value", Value);
            //output.Attributes.SetAttribute("data-medida", Medida);

            // Agregar dependencias como atributos data
            foreach (var dependencia in Dependencias)
            {
                output.Attributes.SetAttribute($"data-dependency-{dependencia.Key}", dependencia.Value);
            }
        }
    }
}
