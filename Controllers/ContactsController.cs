using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;
using WebApi.Transaction;

namespace WebApi.Controllers
{
    public class ContactsController : ApiController
    {
        private ApiDbContext dbContext = new ApiDbContext();
        private IUnitOfWork unitOfWork;

        public ContactsController()
        {
            unitOfWork = new UnitOfWork(dbContext);
        }

        // GET: api/Contacts
        public IQueryable<Contact> GetContacts()
        {
            return unitOfWork.ContactRepository.GetAll();
        }

        // GET: api/Contacts/5
        [ResponseType(typeof(Contact))]
        public IHttpActionResult GetContact(int id)
        {
            Contact contact = unitOfWork.ContactRepository.GetSingle(id);
            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        // PUT: api/Contacts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContact(int id, Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contact.ContactID)
            {
                return BadRequest();
            }

            unitOfWork.ContactRepository.Update(contact);

            try
            {
                unitOfWork.Commit();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
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

        // POST: api/Contacts
        [ResponseType(typeof(Contact))]
        public IHttpActionResult PostContact(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.ContactRepository.Add(contact);
            unitOfWork.Commit();

            return CreatedAtRoute("DefaultApi", new { id = contact.ContactID }, contact);
        }

        // DELETE: api/Contacts/5
        [ResponseType(typeof(Contact))]
        public IHttpActionResult DeleteContact(int id)
        {
            Contact contact = unitOfWork.ContactRepository.GetSingle(id);
            if (contact == null)
            {
                return NotFound();
            }

            unitOfWork.ContactRepository.Delete(contact);
            unitOfWork.Commit();

            return Ok(contact);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactExists(int id)
        {
            return unitOfWork.ContactRepository.GetAll(c => c.ContactID.Equals(id)).Count() > 0;
        }
    }
}