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
        public int guardarDatos(CursoCLS cursoCLS)
        {
            int respuesta = 0;

            try
            {
                using (BDCursoEntities bd = new BDCursoEntities())
                {
                    if (cursoCLS.IdCurso == 0)
                    {
                        Curso curso = new Curso();
                        curso.NOMBRE = cursoCLS.NombreCurso;
                        curso.DESCRIPCION = cursoCLS.Descripcion;
                        curso.IIDCATEGORIACURSO = cursoCLS.IdCategoriaCurso;
                        curso.PRECIO = cursoCLS.Precio;
                        curso.CUPON = cursoCLS.Cupon;
                        curso.IMAGEN = cursoCLS.Foto;
                        curso.BHABILITADO = 1;
                        bd.Curso.Add(curso);
                        bd.SaveChanges();
                        respuesta = 1;
                    }
                    else
                    {
                        Curso curso = bd.Curso.Where(t => t.IIDCATEGORIACURSO == cursoCLS.IdCategoriaCurso).First();
                        curso.NOMBRE = cursoCLS.NombreCurso;
                        bd.SaveChanges();
                        respuesta = 1;
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta = 0;
            }

            return respuesta;
        }
    }
}