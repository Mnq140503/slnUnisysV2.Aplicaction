using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using slnUnisysV2.Core.Interfaces;
using slnUnisysV2.Utilidades.Interfaces;
using srvSeguridad;

namespace slnUnisysV2.Core.Implementacion
{
    public class SeguridadServices : ISeguridadServices
    {   
        private readonly SeguridadSoapClient _seguridadSoapClient;
        private readonly IUtilidades _utilidades;

        public SeguridadServices(SeguridadSoapClient seguridadSoapClient, IUtilidades utilidades)
        {
            _seguridadSoapClient = seguridadSoapClient;
            _utilidades = utilidades;
        }

        public async Task<int> ValidateUserAD(string login, string password)
        {
            var response = await _seguridadSoapClient.ValidateUserADAsync(login, password);

            return response;
        }

        public async Task<UsuarioBE> GetDatosUsuario(int idUsuario)
        {
            var response = await _seguridadSoapClient.GetDatosUsuarioAsync(idUsuario);

            return response;
        }
    }
}
