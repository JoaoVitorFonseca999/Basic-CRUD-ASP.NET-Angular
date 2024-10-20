using Microsoft.EntityFrameworkCore;
using WebApi_MyBasicApp.Constants;
using WebApi_MyBasicApp.DataContext;
using WebApi_MyBasicApp.Models;

namespace WebApi_MyBasicApp.Service.FuncionarioService
{
    public class FuncionarioService : IFuncionarioInterface
    {
        private readonly ApplicationDbContext _context;
        public FuncionarioService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ServiceResponse<List<FuncionarioModel>>> GetFuncionarios()
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();
            try
            {
                serviceResponse.Dados = _context.Funcionarios.ToList();
                if (serviceResponse.Dados.Count == 0)
                    serviceResponse.Mensagem = "Nenhum funcionário encontrado";
            }
            catch(Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;
        }
        public async Task<ServiceResponse<List<FuncionarioModel>>> CreateFuncionario(FuncionarioModel funcionario)
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();

            try
            {
                if (funcionario == null)
                    throw new Exception("Funcionário não pode ser nulo");

                _context.Add(funcionario);
                await _context.SaveChangesAsync();
                serviceResponse.Dados = _context.Funcionarios.ToList();
            }
            catch(Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<FuncionarioModel>>> DeleteFuncionario(int idFuncionarioToDelete)
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();

            try
            {
                FuncionarioModel funcionario = _context.Funcionarios.FirstOrDefault(f => f.Id == idFuncionarioToDelete);
                if (funcionario == null)
                    throw new Exception(ErrorMessages.FuncionarioNotFound);
                _context.Remove(funcionario);
                await _context.SaveChangesAsync();
                serviceResponse.Dados = _context.Funcionarios.ToList();

            }
            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<FuncionarioModel>> GetFuncionarioById(int idFuncionario)
        {
            ServiceResponse<FuncionarioModel> serviceResponse = new ServiceResponse<FuncionarioModel>();

            try
            {
                serviceResponse.Dados = _context.Funcionarios.FirstOrDefault(f => f.Id == idFuncionario);
                if(serviceResponse.Dados == null)
                    throw new Exception(ErrorMessages.FuncionarioNotFound);
            }
            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;
        }


        public async Task<ServiceResponse<List<FuncionarioModel>>> InativaFuncionario(int idFuncionarioToDisable)
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();
            try
            {
                FuncionarioModel funcionarioParaDesativar = _context.Funcionarios.FirstOrDefault(f => f.Id == idFuncionarioToDisable);
                if (funcionarioParaDesativar == null)
                    throw new Exception(ErrorMessages.FuncionarioNotFound);

                funcionarioParaDesativar.Ativo = false;
                funcionarioParaDesativar.DataAlteracao = DateTime.Now.ToLocalTime();
                
                _context.Funcionarios.Update(funcionarioParaDesativar);
                
                await _context.SaveChangesAsync();
                
                serviceResponse.Dados = _context.Funcionarios.ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<FuncionarioModel>>> UpdateFuncionario(FuncionarioModel funcionarioEditado)
        {
            ServiceResponse<List<FuncionarioModel>> serviceResponse = new ServiceResponse<List<FuncionarioModel>>();

            try
            {
                FuncionarioModel funcionarioParaEditar = _context.Funcionarios.AsNoTracking().FirstOrDefault(f => f.Id == funcionarioEditado.Id);
                if (funcionarioParaEditar == null)
                    throw new Exception(ErrorMessages.FuncionarioNotFound);

                funcionarioEditado.DataAlteracao = DateTime.Now.ToLocalTime();
                _context.Funcionarios.Update(funcionarioEditado);
                await _context.SaveChangesAsync();

                serviceResponse.Dados = _context.Funcionarios.ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }
            return serviceResponse;
        }
    }
}
