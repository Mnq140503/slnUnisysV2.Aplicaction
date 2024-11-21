using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace slnUnisysV2.Utilidades.Interfaces
{
    public interface IUtilidades
    {
        List<Dictionary<string, object>> ParseSoapResponse(object response);
    }
}
