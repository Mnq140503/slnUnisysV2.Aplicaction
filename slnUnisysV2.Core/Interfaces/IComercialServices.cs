using srvGestionComercial;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace slnUnisysV2.Core.Interfaces
{
    public interface IComercialServices
    {
        Task<List<Dictionary<string, object>>> ListarSolictud(string V_AMBIENTE, string V_FILTRO, string V_CEO, string V_UND_OPER, string V_FEC_STR_INI, string V_FEC_STR_FIN, string UserName);

        Task<string> GenerarSolicitud(SolicitudBE oSolicitudBE);
    }
}
