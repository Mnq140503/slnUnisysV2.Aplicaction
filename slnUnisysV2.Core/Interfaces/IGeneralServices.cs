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
    }
}
