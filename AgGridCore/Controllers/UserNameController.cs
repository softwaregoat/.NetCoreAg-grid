using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AgGridCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserNameController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            string userName = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
            List<string> usrnames = new List<string>();
            usrnames.Add(userName);
            return usrnames;
        }
    }
}
