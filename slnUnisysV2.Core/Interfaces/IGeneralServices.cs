using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using srvGeneral;

namespace slnUnisysV2.Core.Interfaces
{
    public interface IGeneralServices
    {
        Task<List<Dictionary<string, object>>> LineasNegocios(string UserName);

        Task<List<Dictionary<string, object>>> BuscarCliente(string RazonSocial, string UserName);

        Task<List<Dictionary<string, object>>> TiposSolicitud(string UserName);

        Task<List<Dictionary<string, object>>> TiposTrabajo(string UserName);

        Task<List<Dictionary<string, object>>> AreasUsuarias(string linea, string UserName);

        Task<List<Dictionary<string, object>>> ClaseTrabajo(string UserName);

        Task<List<Dictionary<string, object>>> DiquesXCEO(string Ceo, string UserName);

        Task<List<Dictionary<string, object>>> Tarifas(string UserName);

        Task<List<Dictionary<string, object>>> BuscarEmbarcacion(string V_NOMBRE, string UserName);

        Task<List<Dictionary<string, object>>> CentrosPorPerfil(string IdUsuario, string UserName);
    }
}
