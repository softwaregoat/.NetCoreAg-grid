using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AgGridCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserResponseController : ControllerBase
    {
        // GET: api/UserResponse
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/UserResponse/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/UserResponse
        [HttpPost]
        public UserResponse Post([FromBody] UserResponse data)
        {

            return data;
        }

        // PUT: api/UserResponse/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
