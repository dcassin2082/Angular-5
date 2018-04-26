using WebApi.Models;
using WebApi.Repository;

namespace WebApi.Transaction
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApiDbContext dbContext;
        private IRepository<Contact> contactRepo;
        private IRepository<Customer> customerRepo;
        private IRepository<Employee> employeeRepo;
        private IRepository<Product> productRepo;
        private IRepository<Supplier> supplierRepo;
        private IRepository<State> stateRepo;

        public UnitOfWork(ApiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IRepository<Contact> ContactRepository => contactRepo ?? (contactRepo = new Repository<Contact>(dbContext));

        public IRepository<Customer> CustomerRepository => customerRepo ?? (customerRepo = new Repository<Customer>(dbContext));

        public IRepository<Employee> EmployeeRepository => employeeRepo ?? (employeeRepo = new Repository<Employee>(dbContext));

        public IRepository<Product> ProductRepository => productRepo ?? (productRepo = new Repository<Product>(dbContext));

        public IRepository<Supplier> SupplierRepository => supplierRepo ?? (supplierRepo = new Repository<Supplier>(dbContext));

        public IRepository<State> StateRepository => stateRepo ?? (stateRepo = new Repository<State>(dbContext));

        public void Commit()
        {
            dbContext.SaveChanges();
        }

        public void Dispose()
        {
            dbContext.Dispose();
        }
    }
}