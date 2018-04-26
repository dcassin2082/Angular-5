using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;
using WebApi.Transaction;

namespace WebApi.Controllers
{
    public class EmployeesController : ApiController
    {
        private ApiDbContext dbContext = new ApiDbContext();
        private IUnitOfWork unitOfWork;

        public EmployeesController()
        {
            unitOfWork = new UnitOfWork(dbContext);
        }
        // GET: api/Employees
        public IQueryable<Employee> GetEmployees()
        {
            return unitOfWork.EmployeeRepository.GetAll();
        }

        // GET: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult GetEmployee(int id)
        {
            Employee employee = unitOfWork.EmployeeRepository.GetSingle(id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // PUT: api/Employees/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployee(int id, Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.EmployeeID)
            {
                return BadRequest();
            }

            unitOfWork.EmployeeRepository.Update(employee);

            try
            {
                unitOfWork.Commit();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Employees
        [ResponseType(typeof(Employee))]
        public IHttpActionResult PostEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.EmployeeRepository.Add(employee);
            unitOfWork.Commit();

            return CreatedAtRoute("DefaultApi", new { id = employee.EmployeeID }, employee);
        }

        // DELETE: api/Employees/5
        [ResponseType(typeof(Employee))]
        public IHttpActionResult DeleteEmployee(int id)
        {
            Employee employee = unitOfWork.EmployeeRepository.GetSingle(id);
            if (employee == null)
            {
                return NotFound();
            }

            unitOfWork.EmployeeRepository.Delete(employee);
            unitOfWork.Commit();

            return Ok(employee);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int id)
        {
            return unitOfWork.EmployeeRepository.GetAll(e => e.EmployeeID.Equals(id)).Count() > 0;
        }
    }
}