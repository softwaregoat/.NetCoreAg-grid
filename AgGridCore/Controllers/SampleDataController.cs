using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AgGridCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SampleDataController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<SampleData> Get()
        {
            List<SampleData> items = null;
            using (StreamReader r = new StreamReader("json.json"))
            {
                string json = r.ReadToEnd();
                items = JsonConvert.DeserializeObject<List<SampleData>>(json);
            }
            return items;
        }
    }

}
