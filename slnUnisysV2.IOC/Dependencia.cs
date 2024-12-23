using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Abstractions;
using Microsoft.Extensions.DependencyInjection;
using slnUnisysV2.Core.Implementacion;
using slnUnisysV2.Core.Interfaces;
using slnUnisysV2.Utilidades.Interfaces;
using slnUnisysV2.Utilidades.Implementacion;
using srvGeneral;
using srvGestionComercial;
using srvSeguridad;

namespace slnUnisysV2.IOC
{
    public static class Dependencia
    {
        public static void InyectarDependencia(this IServiceCollection services)
        {
            services.AddTransient<IUtilidades, Utilidades.Implementacion.Utilidades>();

            services.AddScoped<GeneralSoapClient>(provider =>
            {
                var endpointConfiguration = GeneralSoapClient.EndpointConfiguration.GeneralSoap;
                return new GeneralSoapClient(endpointConfiguration);
            });

            services.AddScoped<SeguridadSoapClient>(provider =>
            {
                var endpointConfiguration = SeguridadSoapClient.EndpointConfiguration.SeguridadSoap;
                return new SeguridadSoapClient(endpointConfiguration);
            });

            services.AddScoped<SolicitudSoapClient>(provider =>
            {
                var endpointConfiguration = SolicitudSoapClient.EndpointConfiguration.SolicitudSoap;
                return new SolicitudSoapClient(endpointConfiguration);
            });

            services.AddScoped<IGeneralServices, GeneralServices>();
            services.AddScoped<ISeguridadServices, SeguridadServices>();
            services.AddScoped<IComercialServices, ComercialServices>();
        }
    }
}
