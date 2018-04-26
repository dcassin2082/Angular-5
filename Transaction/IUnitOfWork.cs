using System;
using WebApi.Models;
using WebApi.Repository;

namespace WebApi.Transaction
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Contact> ContactRepository { get; }
        IRepository<Customer> CustomerRepository { get; }
        IRepository<Employee> EmployeeRepository { get; }
        IRepository<Product> ProductRepository { get; }
        IRepository<Supplier> SupplierRepository { get; }
        IRepository<State> StateRepository { get; }

        void Commit();
    }
}