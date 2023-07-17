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

        public int eliminarCategoriaCurso(int idCategoriaCurso)
        {
            int respuesta = 0;
            try
            {
                using (BDCursoEntities bd = new BDCursoEntities())
                {
                    CategoriaCurso categoriaCurso = bd.CategoriaCurso.Where(t => t.IIDCATEGORIACURSO == idCategoriaCurso).First();

                    categoriaCurso.HABILITADO = 0;
                    bd.SaveChanges();
                    respuesta = 1;
                }
            }
            catch (Exception ex)
            {
                respuesta = 0;
            }

            return respuesta;
        }

        public JsonResult obtenerCategoriaCursoPorId(int idCategoriaCurso)
        {
            using (BDCursoEntities bd = new BDCursoEntities())
            {
                CategoriaCursoCLS categoriaCurso = bd.CategoriaCurso.Where(t => t.IIDCATEGORIACURSO == idCategoriaCurso)
                                                    .Select(t => new CategoriaCursoCLS 
                                                    {
                                                        IdCategoriaCurso = t.IIDCATEGORIACURSO,
                                                        Nombre = t.NOMBRE
                                                    }).First();

                return Json(categoriaCurso, JsonRequestBehavior.AllowGet);
            }
        }

        public int GuardarDatos(CategoriaCursoCLS obj)
        {
            int respuesta = 0;

            try
            {
                using (BDCursoEntities bd = new BDCursoEntities())
                {
                    if (obj.IdCategoriaCurso == 0)
                    {
                        CategoriaCurso categoriaCurso = new CategoriaCurso();
                        categoriaCurso.NOMBRE = obj.Nombre;
                        categoriaCurso.HABILITADO = 1;
                        bd.CategoriaCurso.Add(categoriaCurso);
                        bd.SaveChanges();
                        respuesta = 1;
                    } else
                    {
                        CategoriaCurso categoriaCurso = bd.CategoriaCurso.Where(t => t.IIDCATEGORIACURSO == obj.IdCategoriaCurso).First();
                        categoriaCurso.NOMBRE = obj.Nombre;
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

        public JsonResult listarCategoriaCurso()
        {
            List<CategoriaCursoCLS> lista = new List<CategoriaCursoCLS>();
            using(BDCursoEntities bd = new BDCursoEntities())
            {
                lista = bd.CategoriaCurso.Where(p=> p.HABILITADO == 1).Select(c => new CategoriaCursoCLS
                {
                    IdCategoriaCurso = c.IIDCATEGORIACURSO,
                    Nombre = c.NOMBRE
                }).ToList();
            }

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}