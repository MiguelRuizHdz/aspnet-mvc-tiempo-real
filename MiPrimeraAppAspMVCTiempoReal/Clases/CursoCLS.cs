using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MiPrimeraAppAspMVCTiempoReal.Clases
{
    public class CursoCLS
    {
        public int IdCurso { get; set; }
        public string NombreCurso { get; set; }
        public string NombreCategoria { get; set; }
        public decimal Precio { get; set; }
        public int IdCategoriaCurso { get; set; }
        public string Cupon { get; set; }
        public string Foto { get; set; }
        public string Descripcion { get; set; }
    }
}