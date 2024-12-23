using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using slnUnisysV2.Core.Interfaces;
using slnUnisysV2.Models;

namespace slnUnisysV2.Controllers
{
    public class SeguridadController : Controller
    {
        private readonly ISeguridadServices _seguridadServices;

        public SeguridadController(ISeguridadServices seguridadServices)
        {
            _seguridadServices = seguridadServices;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(VMUsuarioLogin modelo)
        {
            var ad = await _seguridadServices.ValidateUserAD(modelo.Correo, modelo.Clave);

            if (ad != 0)
            {
                var idUsuario = await _seguridadServices.GetDatosUsuario(ad);

                List<Claim> claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, idUsuario.ApellidosyNombres),
                    new Claim(ClaimTypes.NameIdentifier, idUsuario.Login),
                    new Claim("CodPersonal", idUsuario.CodPersonal),
                    new Claim("IdUsuario", ad.ToString()),
                    new Claim("UserName", idUsuario.Login),
                    new Claim("IdCentro", idUsuario.IdCentroOperativo.ToString())
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
    }
}
