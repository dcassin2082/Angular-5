using WebApi.Models;

namespace WebApi.Repository
{
    public interface IEmailRepo
    {
        void GenerateEmailHistoryEntry(EmailHistory emailHistoryEntry);
    }
}