using WebApi_MyBasicApp.Models;

namespace WebApi_MyBasicApp.Service.FuncionarioService
{
    public interface IFuncionarioInterface
    {
        Task<ServiceResponse<List<FuncionarioModel>>> GetFuncionarios();
        Task<ServiceResponse<List<FuncionarioModel>>> CreateFuncionario(FuncionarioModel funcionario);
        Task<ServiceResponse<FuncionarioModel>> GetFuncionarioById(int idFuncionario);
        Task<ServiceResponse<List<FuncionarioModel>>> UpdateFuncionario(FuncionarioModel funcionarioToEdit);
        Task<ServiceResponse<List<FuncionarioModel>>> DeleteFuncionario(int idFuncionarioToDelete);
        Task<ServiceResponse<List<FuncionarioModel>>> InativaFuncionario(int idFuncionarioToDisable);



    }
}
