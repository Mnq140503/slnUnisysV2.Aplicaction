using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace slnUnisysV2.TagHelper.Utils
{
    /// <summary>
    /// Clase de extensión para agregar clases dinámicamente
    /// </summary>
    public static class TagHelperAttributeExtensions
    {
        public static void AddClass(this TagHelperAttributeList attributes, string className)
        {
            var existingClass = attributes["class"]?.Value.ToString();
            attributes.SetAttribute("class", string.IsNullOrEmpty(existingClass)
                ? className
                : $"{existingClass} {className}");
        }
    }
}
