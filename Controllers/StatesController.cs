using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;
using WebApi.Transaction;

namespace WebApi.Controllers
{
    public class StatesController : ApiController
    {
        private ApiDbContext dbContext = new ApiDbContext();
        private IUnitOfWork unitOfWork;

        public StatesController()
        {
            unitOfWork = new UnitOfWork(dbContext);
        }

        // GET: api/States
        public IQueryable<State> GetStates()
        {
            return unitOfWork.StateRepository.GetAll();
        }

        // GET: api/States/5
        [ResponseType(typeof(State))]
        public IHttpActionResult GetState(int id)
        {
            State state = unitOfWork.StateRepository.GetSingle(id);
            if (state == null)
            {
                return NotFound();
            }

            return Ok(state);
        }

        // PUT: api/States/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutState(int id, State state)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != state.Id)
            {
                return BadRequest();
            }

            unitOfWork.StateRepository.Update(state);

            try
            {
                unitOfWork.Commit();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StateExists(id))
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

        // POST: api/States
        [ResponseType(typeof(State))]
        public IHttpActionResult PostState(State state)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.StateRepository.Add(state);
            unitOfWork.Commit();

            return CreatedAtRoute("DefaultApi", new { id = state.Id }, state);
        }

        // DELETE: api/States/5
        [ResponseType(typeof(State))]
        public IHttpActionResult DeleteState(int id)
        {
            State state = unitOfWork.StateRepository.GetSingle(id);
            if (state == null)
            {
                return NotFound();
            }

            unitOfWork.StateRepository.Delete(state);
            unitOfWork.Commit();

            return Ok(state);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StateExists(int id)
        {
            return unitOfWork.StateRepository.GetAll(s => s.Id.Equals(id)).Count() > 0;
        }
    }
}