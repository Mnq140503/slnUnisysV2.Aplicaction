using Microsoft.AspNetCore.Razor.TagHelpers;
using slnUnisysV2.TagHelper.Utils;
using Enum = slnUnisysV2.TagHelper.Utils.Enum;

namespace slnUnisysV2.TagHelper
{

    //[HtmlTargetElement("autocomplete")]
    //public class AutoCompleteTagHelper : Microsoft.AspNetCore.Razor.TagHelpers.TagHelper
    //{
    //    /// <summary>
    //    /// Identificador único del control.
    //    /// </summary>
    //    public string Id { get; set; }
    //    public string Url { get; set; }
    //    public string ParamName { get; set; }
    //    public string Term { get; set; }
    //    public string Value { get; set; }
    //    public string Placeholder { get; set; }

    //    // Cambiar Medida a un tipo de enumeración
    //    public Medida Medida { get; set; }// Valor predeterminado

    //    public string TipoMedida { get; set; }

    //    public override void Process(TagHelperContext context, TagHelperOutput output)
    //    {
    //        output.TagName = "input"; // Generar una etiqueta <input>

    //        output.Attributes.SetAttribute("id", Id);
    //        output.Attributes.SetAttribute("type", "text");
    //        output.Attributes.SetAttribute("class", "autocomplete form-control");

    //        // Ajustar el tamaño del campo de entrada según el atributo 'Medida'
    //        switch (Medida)
    //        {
    //            case Medida.Uno:
    //                output.Attributes.SetAttribute("style", "width: 8%;");
    //                break;
    //            case Medida.Dos:
    //                output.Attributes.SetAttribute("style", "width: 16%;");
    //                break;
    //            case Medida.Tres:
    //                output.Attributes.SetAttribute("style", "width: 24%;");
    //                break;
    //            case Medida.Cuatro:
    //                output.Attributes.SetAttribute("style", "width: 32%;");
    //                break;
    //            default:
    //                output.Attributes.SetAttribute("style", "width: 100%;");
    //                break;
    //        }

    //        if (!string.IsNullOrEmpty(TipoMedida))
    //        {
    //            output.Attributes.SetAttribute("class", $"autocomplete form-control-{TipoMedida}");
    //        }

    //        output.Attributes.SetAttribute("data-url", Url);
    //        output.Attributes.SetAttribute("data-param", ParamName);
    //        output.Attributes.SetAttribute("data-term", Term);
    //        output.Attributes.SetAttribute("data-value", Value);
    //        output.Attributes.SetAttribute("placeholder", Placeholder);
    //    }
    //}
    /// <summary>
    /// Este `TagHelper` genera un control de autocompletado con soporte para dependencias dinámicas.
    /// Utiliza un input de texto con funcionalidad de búsqueda a través de AJAX, y permite que otros controles 
    /// afecten los resultados de autocompletado mediante dependencias que se definen en los atributos `data-dependency-*`.
    /// </summary>
    [HtmlTargetElement("UniAutoComplete")]
    public class AutoCompleteTagHelper : Microsoft.AspNetCore.Razor.TagHelpers.TagHelper
    {
        /// <summary>
        ///Identificador único del control.
        /// </summary>
        public string Id { get; set; }
        public string Nombre { get; set; }
        public string Url { get; set; }
        public string ParamName { get; set; }
        public string Term { get; set; }
        public string Value { get; set; }
        public string Placeholder { get; set; }

        // Enumeración para Medida
        public Enum.Medida Medida { get; set; }

        public Enum.TipoMedida TipoMedida { get; set; }

        public bool Requerido { get; set; }

        // Dependencias dinámicas
        public Dictionary<string, string> Dependencias { get; set; } = new Dictionary<string, string>();

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "input"; // Generar una etiqueta <input>

            // Atributos básicos del control
            output.Attributes.SetAttribute("id", Id);
            output.Attributes.SetAttribute("type", "text");
            output.Attributes.SetAttribute("class", "autocomplete form-control");
            output.Attributes.SetAttribute("name", Nombre);

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
                case Enum.Medida.Diez:
                    output.Attributes.SetAttribute("style", "width: 100%;");
                    break;
            }

            if (!string.IsNullOrEmpty(TipoMedida.ToString()))
            {
                output.Attributes.SetAttribute("class", $"autocomplete form-control-{TipoMedida}");
            }

            if (Requerido == true)
            {
                output.Attributes.AddClass("requerido");
            }

            output.Attributes.SetAttribute("data-url", Url);
            output.Attributes.SetAttribute("data-param", ParamName);
            output.Attributes.SetAttribute("data-term", Term);
            output.Attributes.SetAttribute("data-value", Value);
            output.Attributes.SetAttribute("placeholder", Placeholder);

            // Agregar dependencias como atributos data
            foreach (var dependencia in Dependencias)
            {
                output.Attributes.SetAttribute($"data-dependency-{dependencia.Key}", dependencia.Value);
            }
        }
    }
}
