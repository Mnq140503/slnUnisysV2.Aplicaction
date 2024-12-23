using System.Diagnostics;
using System.Reflection;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols.WsTrust;
using slnUnisysV2.Core.Interfaces;
using slnUnisysV2.Models;
using slnUnisysV2.Utilidades;

namespace slnUnisysV2.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly IGeneralServices _generalServices;
        private readonly VariablesSession _session;

        public HomeController(IGeneralServices generalServices, VariablesSession session)
        {
            _generalServices = generalServices;
            _session = session;
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> LineasNegocio() 
        {

            var codPersonal = User.FindFirst("NameIdentifier")?.Value;

            var soap = await _generalServices.LineasNegocios(codPersonal);

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> LineasNegocio2(string Valor)
        {

            var codPersonal = User.FindFirst("NameIdentifier")?.Value;

            var soap = await _generalServices.LineasNegocios(codPersonal);

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> BuscarCliente(string RazonSocial)
        {
            var soap = await _generalServices.BuscarCliente(RazonSocial, "mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> BuscarEmbarcacion(string V_NOMBRE)
        {
            var soap = await _generalServices.BuscarEmbarcacion(V_NOMBRE, "mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> BuscarCliente2(string RazonSocial, string Valor)
        {
            var soap = await _generalServices.BuscarCliente(RazonSocial, "mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> TipoSolicitud()
        {
            var soap = await _generalServices.TiposSolicitud("mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> TiposTrabajo()
        {
            var soap = await _generalServices.TiposTrabajo("mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> AreasUsuariasxLinea(string Linea)
        {
            var soap = await _generalServices.AreasUsuarias(Linea, "mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> ClaseTrabajo()
        {
            var soap = await _generalServices.ClaseTrabajo("mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> DiquesXCEO()
        {
            var soap = await _generalServices.DiquesXCEO("1", "mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> Tarifas()
        {
            var soap = await _generalServices.Tarifas("mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> CentrosPorPerfil()
        {
            var soap = await _generalServices.CentrosPorPerfil(_session.IdUsuario, _session.UserName);

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }
    }
}
