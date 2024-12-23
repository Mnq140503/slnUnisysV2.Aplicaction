using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using slnUnisysV2.Core.Interfaces;
using slnUnisysV2.Utilidades.Interfaces;
using srvGeneral;
using srvGestionComercial;

namespace slnUnisysV2.Core.Implementacion
{
    public class ComercialServices : IComercialServices
    {
        private readonly SolicitudSoapClient _solicitudSoap;
        private readonly IUtilidades _utilidades;

        public ComercialServices(SolicitudSoapClient solicitudSoap, IUtilidades utilidades)
        {
            _solicitudSoap = solicitudSoap;
            _utilidades = utilidades;
        }

        public async Task<List<Dictionary<string, object>>> ListarSolictud(string V_AMBIENTE, string V_FILTRO, string V_CEO, string V_UND_OPER, string V_FEC_STR_INI, string V_FEC_STR_FIN, string UserName)
        {
            var response = await _solicitudSoap.ListarSolicitudTrabajoAsync(V_AMBIENTE, V_FILTRO, V_CEO, V_UND_OPER, V_FEC_STR_INI, V_FEC_STR_FIN, UserName);

            // Procesar la respuesta XML usando el método ParseSoapResponse
            var result = _utilidades.ParseSoapResponse(response.Any1.InnerXml);

            // Devolver los datos como una lista de diccionarios
            return result.ToList();
        }

        public async Task<string> GenerarSolicitud(SolicitudBE oSolicitudBE)
        {
            var response = await _solicitudSoap.InsertarSolicitud2Async(oSolicitudBE, "mnunez");

            return response;
        }
    }
}
