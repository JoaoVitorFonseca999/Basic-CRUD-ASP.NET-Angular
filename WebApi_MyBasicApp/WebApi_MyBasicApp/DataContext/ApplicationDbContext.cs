using Microsoft.EntityFrameworkCore;
using WebApi_MyBasicApp.Models;

namespace WebApi_MyBasicApp.DataContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<FuncionarioModel> Funcionarios { get; set; }
    }
}
