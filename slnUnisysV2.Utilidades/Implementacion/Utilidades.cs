using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using slnUnisysV2.Utilidades.Interfaces;

namespace slnUnisysV2.Utilidades.Implementacion
{
    public class Utilidades : IUtilidades
    {
        public List<Dictionary<string, object>> ParseSoapResponse(object response)
        {
            // Verificamos si la respuesta es nula o está vacía
            if (response == null || string.IsNullOrEmpty(response.ToString()))
            {
                // Si no hay datos, devolvemos una lista vacía
                return new List<Dictionary<string, object>>();
            }

            try
            {
                // Parseamos el XML solo si hay datos
                var xdoc = XDocument.Parse(response.ToString());

                // Extraemos las tablas (si las hay)
                var tables = xdoc.Descendants("Table")
                    .Select(table => table.Elements()
                        .ToDictionary(
                            el => el.Name.LocalName,  // La clave será el nombre del elemento XML
                            el => (object)(el.Value)  // El valor será el valor del elemento
                        ))
                    .ToList();

                return tables;
            }
            catch (Exception ex)
            {
                // En caso de error, como problemas en el formato XML, devolvemos una lista vacía
                // O podrías registrar el error si es necesario
                return new List<Dictionary<string, object>>();
            }
        }
    }
}
