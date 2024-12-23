using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using slnUnisysV2.Core.Interfaces;
using slnUnisysV2.Utilidades;
using srvGestionComercial;

namespace slnUnisysV2.Controllers
{
    public class ComercialController : Controller
    {
        private readonly IComercialServices _comercialServices;
        private readonly VariablesSession _session;

        public ComercialController(IComercialServices comercialServices, VariablesSession session)
        {
            _comercialServices = comercialServices;
            _session = session;
        }

        public IActionResult Index()
        {
            return View("Solicitud/Index");
        }

        [HttpPost("[controller]/Solicitud/Listar")]
        public async Task<IActionResult> ListarSolicitud([FromForm] string filterCentro)
        {
            filterCentro = string.IsNullOrEmpty(filterCentro) ? _session.IdCentro : filterCentro;

            var soap = await _comercialServices.ListarSolictud("", "", filterCentro, "", "", "", "mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }


        [HttpPost("[controller]/Solicitud/Registrar")]
        public async Task<IActionResult> Registrar([FromForm]string modelo)
        {
            Utilidades.Implementacion.Utilidades.GenericResponse<SolicitudBE> gResponse =
                new Utilidades.Implementacion.Utilidades.GenericResponse<SolicitudBE>();

            try
            {
                SolicitudBE oSolicitudBE = JsonConvert.DeserializeObject<SolicitudBE>(modelo);

                oSolicitudBE.X_COD_CEO = "1";
                oSolicitudBE.X_EST_ATL = "SOL";
                oSolicitudBE.X_FEC_STR = DateTime.Now.ToString("dd/mm/yyyy");
                oSolicitudBE.X_HRA_RCP_STR = oSolicitudBE.X_FEC_RCP_STR + " " + DateTime.Now.ToString("HH:mm:ss");

                var gSolicitud = await _comercialServices.GenerarSolicitud(oSolicitudBE);

                gSolicitud.Replace("\n", "<br/>");

                gResponse.Estado = true;
                gResponse.Objeto = oSolicitudBE;
                gResponse.Mensaje = gSolicitud;
            }
            catch (Exception ex)
            {
                gResponse.Estado = false;
                gResponse.Mensaje = ex.Message;
            }

            return StatusCode(StatusCodes.Status200OK, gResponse);
        }
    }
}
