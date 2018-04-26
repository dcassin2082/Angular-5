using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class RoleController : ApiController
    {
        [Route("api/GetAllRoles")]
        [AllowAnonymous]
        public HttpResponseMessage GetRoles()
        {
            var roleStore = new RoleStore<IdentityRole>(new ApplicationDbContext());
            var roleManager = new RoleManager<IdentityRole>(roleStore);
            return Request.CreateResponse(HttpStatusCode.OK,
                roleManager.Roles.Select(x => new { x.Id, x.Name }).ToList());
        }

        //[Route("api/GetUserRoles")]
        //[Authorize("Admin")]
        //public HttpResponseMessage GetUserRoles(int userId)
        //{
        //    var roleStore = new RoleStore<IdentityRole>(new ApplicationDbContext());
        //    var roleManager = new RoleManager<IdentityRole>(roleStore);
        //    return null;
        //}
    }
}
