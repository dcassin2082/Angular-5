using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;
using WebApi.Transaction;

namespace WebApi.Controllers
{
    public class ProductsController : ApiController
    {
        private ApiDbContext dbContext = new ApiDbContext();
        private IUnitOfWork unitOfWork;

        public ProductsController()
        {
            unitOfWork = new UnitOfWork(dbContext);
        }
        // GET: api/Products
        public IQueryable<Product> GetProducts()
        {
            return unitOfWork.ProductRepository.GetAll();
        }

        // GET: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProduct(int id)
        {
            Product product = unitOfWork.ProductRepository.GetSingle(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.ProductId)
            {
                return BadRequest();
            }

            unitOfWork.ProductRepository.Update(product);

            try
            {
                unitOfWork.Commit();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.ProductRepository.Add(product);
            unitOfWork.Commit();

            return CreatedAtRoute("DefaultApi", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = unitOfWork.ProductRepository.GetSingle(id);
            if (product == null)
            {
                return NotFound();
            }

            unitOfWork.ProductRepository.Delete(product);
            unitOfWork.Commit();

            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return unitOfWork.ProductRepository.GetAll(p => p.ProductId.Equals(id)).Count() > 0;
        }
    }
}