using MiPrimeraAppAspMVCTiempoReal.Clases;
using MiPrimeraAppAspMVCTiempoReal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAppAspMVCTiempoReal.Controllers
{
    public class CategoriaCursoController : Controller
    {
        // GET: CategoriaCurso
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarCategoriaCurso()
        {
            List<CategoriaCursoCLS> lista = new List<CategoriaCursoCLS>();
            using(BDCursoEntities bd = new BDCursoEntities())
            {
                lista = bd.CategoriaCurso.Select(c => new CategoriaCursoCLS
                {
                    IdCategoriaCurso = c.IIDCATEGORIACURSO,
                    Nombre = c.NOMBRE
                }).ToList();
            }

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}