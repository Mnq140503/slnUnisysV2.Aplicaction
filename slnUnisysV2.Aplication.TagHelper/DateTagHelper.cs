using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using slnUnisysV2.TagHelper.Utils;
using Enum = slnUnisysV2.TagHelper.Utils.Enum;

namespace slnUnisysV2.TagHelper
{
    /// <summary>
    /// TagHelper para generar un control DatePicker con soporte para configuraciones avanzadas.
    /// </summary>
    [HtmlTargetElement("UniDatePicker")]
    public class DateTagHelper : Microsoft.AspNetCore.Razor.TagHelpers.TagHelper
    {

        /// <summary>
        /// Identificador único del control.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Nombre del control para el binding en formularios.
        /// </summary>
        public string Nombre { get; set; }

        /// <summary>
        /// Valor inicial del control.
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// Placeholder para guiar al usuario.
        /// </summary>
        public string Placeholder { get; set; }

        /// <summary>
        /// Indica si el campo es requerido.
        /// </summary>
        public bool Requerido { get; set; }

        /// <summary>
        /// Etiqueta asociada al control.
        /// </summary>
        public string Etiqueta { get; set; }

        /// <summary>
        /// Fecha mínima seleccionable.
        /// </summary>
        public string MinDate { get; set; }

        /// <summary>
        /// Fecha máxima seleccionable.
        /// </summary>
        public string MaxDate { get; set; }

        /// <summary>
        /// Formato de la fecha (ejemplo: dd/mm/yy).
        /// </summary>
        public string DateFormat { get; set; }

        /// <summary>
        /// Mostrar número de la semana.
        /// </summary>
        public bool ShowWeek { get; set; }

        /// <summary>
        /// Primer día de la semana (0 para domingo, 1 para lunes).
        /// </summary>
        public int FirstDay { get; set; }

        /// <summary>
        /// Dependencias dinámicas con otros controles.
        /// </summary>
        public Dictionary<string, string> Dependencias { get; set; } = new Dictionary<string, string>();

        /// <summary>
        /// Medida del Control
        /// </summary>
        public Enum.Medida Medida { get; set; }

        /// <summary>
        /// Tipo de Medida del Control
        /// </summary>
        public Enum.TipoMedida TipoMedida { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            // Renderizar como un input de texto
            output.TagName = "input";
            output.Attributes.SetAttribute("type", "text");
            output.Attributes.SetAttribute("id", Id);
            output.Attributes.SetAttribute("name", Nombre);
            output.Attributes.SetAttribute("value", Value);

            if (!string.IsNullOrEmpty(Placeholder))
            {
                output.Attributes.SetAttribute("placeholder", Placeholder);
            }

            output.Attributes.SetAttribute("class", "datepicker form-control");

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
                output.Attributes.SetAttribute("class", $"datepicker form-control form-control-{TipoMedida}");
            }

            // Validación para campos requeridos
            if (Requerido)
            {
                output.Attributes.AddClass("requerido");
                //output.PostElement.AppendHtml($"<label for='{Id}' class='required-label'>{Etiqueta} *</label>");
            }
            else if (!string.IsNullOrEmpty(Etiqueta))
            {
                output.PostElement.AppendHtml($"<label for='{Id}'>{Etiqueta}</label>");
            }

            // Agregar atributos de configuración de fechas
            if (!string.IsNullOrEmpty(MinDate))
            {
                output.Attributes.SetAttribute("data-min-date", MinDate);
            }

            if (!string.IsNullOrEmpty(MaxDate))
            {
                output.Attributes.SetAttribute("data-max-date", MaxDate);
            }

            if (!string.IsNullOrEmpty(DateFormat))
            {
                output.Attributes.SetAttribute("data-date-format", DateFormat);
            }

            output.Attributes.SetAttribute("data-show-week", ShowWeek.ToString().ToLower());
            output.Attributes.SetAttribute("data-first-day", FirstDay);

            // Agregar dependencias como atributos data
            foreach (var dependencia in Dependencias)
            {
                output.Attributes.SetAttribute($"data-dependency-{dependencia.Key}", dependencia.Value);
            }
        }
    }
}
