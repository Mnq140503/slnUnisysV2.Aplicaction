using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using srvSeguridad;

namespace slnUnisysV2.Core.Interfaces
{
    public interface ISeguridadServices
    {
        Task<int> ValidateUserAD(string login, string password);
        Task<UsuarioBE> GetDatosUsuario(int IdUsuario);
    }
}
