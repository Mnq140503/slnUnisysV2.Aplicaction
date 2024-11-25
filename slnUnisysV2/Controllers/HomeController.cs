using System.Diagnostics;
using System.Reflection;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols.WsTrust;
using slnUnisysV2.Core.Interfaces;
using slnUnisysV2.Models;

namespace slnUnisysV2.Controllers
{
    public class HomeController : Controller
    {
        private readonly IGeneralServices _generalServices;
        private readonly ISeguridadServices _seguridadServices;

        public HomeController(IGeneralServices generalServices, ISeguridadServices seguridadServices)
        {
            _generalServices = generalServices;
            _seguridadServices = seguridadServices;
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
        public async Task<IActionResult> ValidarUsuario(string login, string password)
        {
            var ad = await _seguridadServices.ValidateUserAD(login, password);

            if (ad != 0)
            {
                var idUsuario = await _seguridadServices.GetDatosUsuario(ad);

                List<Claim> claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, idUsuario.ApellidosyNombres),
                    new Claim(ClaimTypes.NameIdentifier, idUsuario.Login),
                    new Claim("CodPersonal", idUsuario.CodPersonal)
                };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                AuthenticationProperties properties = new AuthenticationProperties()
                {
                    AllowRefresh = true,
                    IsPersistent = true
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), properties);

                return RedirectToAction("Index", "Home");
            }
            else
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, "Usuario no encontrado");
            }
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
        public async Task<IActionResult> BuscarCliente2(string RazonSocial, string Valor)
        {
            var soap = await _generalServices.BuscarCliente(RazonSocial, "mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }
    }
}
