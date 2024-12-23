using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using slnUnisysV2.TagHelper.Utils;
using Enum = slnUnisysV2.TagHelper.Utils.Enum;

namespace slnUnisysV2.TagHelper
{
    [HtmlTargetElement("UniText")]
    public class TextTagHelper : Microsoft.AspNetCore.Razor.TagHelpers.TagHelper
    {
        /// <summary>
        /// Nombre único del control.
        /// </summary>
        public string Nombre { get; set; }

        /// <summary>
        /// Identificador único del control.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Placeholder del control.
        /// </summary>
        public string Placeholder { get; set; }

        /// <summary>
        /// Indica si el control es requerido.
        /// </summary>
        public bool EsRequerido { get; set; } = false;

        /// <summary>
        /// Medida del control (por ejemplo, Diez, Veinte, etc.).
        /// </summary>
        public Enum.Medida Medida { get; set; }

        /// <summary>
        /// Tipo de medida del control (por ejemplo, md, lg, etc.).
        /// </summary>
        public Enum.TipoMedida TipoMedida { get; set; }

        /// <summary>
        /// Longitud máxima del texto permitido.
        /// </summary>
        public int? MaxLength { get; set; }

        /// <summary>
        /// Define si el control es un input (Linear) o un textarea (MultiLinear).
        /// </summary>
        public bool MultiLinear { get; set; } = false;

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            // Cambiar el tipo de etiqueta según MultiLinear
            output.TagName = MultiLinear ? "textarea" : "input";

            // Atributos básicos
            output.Attributes.SetAttribute("id", Id);
            output.Attributes.SetAttribute("name", Nombre);
            output.Attributes.SetAttribute("placeholder", Placeholder);

            // Atributos condicionales
            if (EsRequerido)
            {
                output.Attributes.AddClass("requerido");
            }

            if (MaxLength.HasValue)
            {
                output.Attributes.SetAttribute("maxlength", MaxLength.Value);
            }

            // Ajustar el tamaño según 'Medida'
            switch (Medida)
            {
                case Enum.Medida.Uno: output.Attributes.SetAttribute("style", "width: 10%;"); break;
                case Enum.Medida.Dos: output.Attributes.SetAttribute("style", "width: 20%;"); break;
                case Enum.Medida.Tres: output.Attributes.SetAttribute("style", "width: 30%;"); break;
                case Enum.Medida.Cuatro: output.Attributes.SetAttribute("style", "width: 40%;"); break;
                case Enum.Medida.Cinco: output.Attributes.SetAttribute("style", "width: 50%;"); break;
                case Enum.Medida.Seis: output.Attributes.SetAttribute("style", "width: 60%;"); break;
                case Enum.Medida.Siete: output.Attributes.SetAttribute("style", "width: 70%;"); break;
                case Enum.Medida.Ocho: output.Attributes.SetAttribute("style", "width: 80%;"); break;
                case Enum.Medida.Nueve: output.Attributes.SetAttribute("style", "width: 90%;"); break;
                case Enum.Medida.Diez: output.Attributes.SetAttribute("style", "width: 100%;"); break;
            }

            // Añadir clase para TipoMedida
            if (!string.IsNullOrEmpty(TipoMedida.ToString()))
            {
                output.Attributes.AddClass($" form-control form-control-{TipoMedida}");
            }

            // Configuración específica para textarea
            if (MultiLinear)
            {
                output.Attributes.SetAttribute("rows", "4"); // Número de filas predeterminadas
                output.Attributes.AddClass("textareaElement");
            }
            else
            {
                output.Attributes.AddClass("inputElement");
            }
        }
    }
}
