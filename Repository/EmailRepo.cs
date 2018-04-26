using System;
using System.Configuration;
using System.Data.SqlClient;
using WebApi.Models;

namespace WebApi.Repository
{
    public class EmailRepo : IEmailRepo
    {
        public void GenerateEmailHistoryEntry(EmailHistory emailHistoryEntry)
        {
            string cs = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            try
            {
                using (SqlConnection cn = new SqlConnection(cs))
                {
                    cn.Open();
                    string storedProc = "email_history_insert";
                    using (SqlCommand cmd = new SqlCommand(storedProc, cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch
            {
                throw new Exception("Failed to insert record");
            }
        }
    }
}