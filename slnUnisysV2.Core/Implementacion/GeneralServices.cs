using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using slnUnisysV2.Core.Interfaces;
using slnUnisysV2.Utilidades.Interfaces;
using srvGeneral;

namespace slnUnisysV2.Core.Implementacion
{
    public class GeneralServices : IGeneralServices
    {
        private readonly GeneralSoapClient _generalSoap;
        private readonly IUtilidades _utilidades;

        public GeneralServices(GeneralSoapClient generalSoap, IUtilidades utilidades)
        {
            _generalSoap = generalSoap;
            _utilidades = utilidades;
        }

        public async Task<List<Dictionary<string, object>>> CentrosPorPerfil(string IdUsuario, string UserName)
        {
            var response = await _generalSoap.ListarCentroOperativoPorPerfilAsync(IdUsuario, UserName);

            var result = _utilidades.ParseSoapResponse(response.Any1.InnerXml);

            return result.ToList();
        }

        public async Task<List<Dictionary<string, object>>> LineasNegocios(string UserName)
        {
            // Llamada al servicio SOAP y obtención de la respuesta
            var response = await _generalSoap.ListaLineasAsync(UserName);

            // Procesar la respuesta XML usando el método ParseSoapResponse
            var result = _utilidades.ParseSoapResponse(response.Any1.InnerXml);

            // Devolver los datos como una lista de diccionarios
            return result.ToList();
        }

        public async Task<List<Dictionary<string, object>>> BuscarCliente(string RazonSocial, string UserName)
        {
            var response = await _generalSoap.ListaBuscarCliente2Async(RazonSocial, UserName);

            var result = _utilidades.ParseSoapResponse(response.Any1.InnerXml);

            return result.ToList();
        }

        public async Task<List<Dictionary<string, object>>> TiposSolicitud(string UserName)
        {
            var response = await _generalSoap.ListaTipo_SolTrabAsync(UserName);

            var result = _utilidades.ParseSoapResponse(response.Any1.InnerXml);

            return result.ToList();
        }

        public async Task<List<Dictionary<string, object>>> TiposTrabajo(string UserName)
        {
            var response = await _generalSoap.ListaTipo_TrabajoAsync(UserName);

            var result = _utilidades.ParseSoapResponse(response.Any1.InnerXml);

            return result.ToList();
        }

        public async Task<List<Dictionary<string, object>>> AreasUsuarias(string linea, string UserName)
        {
            var response = await _generalSoap.ListaAreasUsuariaxLNAsync(linea, UserName);

            var result = _utilidades.ParseSoapResponse(response.Any1.InnerXml);

            return result.ToList();
        }

        public async Task<List<Dictionary<string, object>>> ClaseTrabajo(string UserName)
        {
            var response = await _generalSoap.ListaClase_TrabajoAsync(UserName);

            var result = _utilidades.ParseSoapResponse(response.Any1.InnerXml);

            return result.ToList();
        }

        public async Task<List<Dictionary<string, object>>> DiquesXCEO(string Ceo, string UserName)
        {
            var response = await _generalSoap.ListaDiquesAsync(Ceo, UserName);

            var result = _utilidades.ParseSoapResponse(response.Any1.InnerXml);

            return result.ToList();
        }

        public async Task<List<Dictionary<string, object>>> Tarifas(string UserName)
        {
            var response = await _generalSoap.ListaTipo_TarifaDiqueAsync(UserName);

            var result = _utilidades.ParseSoapResponse(response.Any1.InnerXml);

            return result.ToList();
        }

        public async Task<List<Dictionary<string, object>>> BuscarEmbarcacion(string V_NOMBRE, string UserName)
        {
            var response = await _generalSoap.BusquedaEmbarcacionyClienteAsync(V_NOMBRE, UserName);

            var result = _utilidades.ParseSoapResponse(response.Any1.InnerXml);

            return result.ToList();
        }
    }
}
