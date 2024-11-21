using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using slnUnisysV2.Core.Interfaces;
using slnUnisysV2.Models;

namespace slnUnisysV2.Controllers
{
    public class HomeController : Controller
    {
        private readonly IGeneralServices _generalServices;

        public HomeController(IGeneralServices generalServices)
        {
            _generalServices = generalServices;
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
        public async Task<IActionResult> LineasNegocio() {

            var soap = await _generalServices.LineasNegocios("mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }

        [HttpGet]
        public async Task<IActionResult> BuscarCliente(string RazonSocial)
        {
            var soap = await _generalServices.BuscarCliente(RazonSocial, "mnunez");

            return StatusCode(StatusCodes.Status200OK, new { data = soap });
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
