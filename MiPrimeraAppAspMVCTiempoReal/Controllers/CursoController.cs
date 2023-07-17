using MiPrimeraAppAspMVCTiempoReal.Clases;
using MiPrimeraAppAspMVCTiempoReal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAppAspMVCTiempoReal.Controllers
{
    public class CursoController : Controller
    {
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Agregar()
        {
            return View();
        }

        public ActionResult Editar()
        {
            return View();
        }

        public JsonResult listarCursos()
        {
            List<CursoCLS> lista= new List<CursoCLS>();
            using (BDCursoEntities bd = new BDCursoEntities())
            {
                lista = (from curso in bd.Curso
                        join categoriaCurso in bd.CategoriaCurso
                        on curso.IIDCATEGORIACURSO equals categoriaCurso.IIDCATEGORIACURSO
                        select new CursoCLS
                        {
                            IdCurso = curso.IIDCURSO,
                            NombreCurso = curso.NOMBRE,
                            NombreCategoria = categoriaCurso.NOMBRE,
                            Precio = curso.PRECIO
                        }).ToList();
            }
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}