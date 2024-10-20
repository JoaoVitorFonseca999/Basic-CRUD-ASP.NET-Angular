using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi_MyBasicApp.Models;
using WebApi_MyBasicApp.Service.FuncionarioService;

namespace WebApi_MyBasicApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncionarioController : ControllerBase
    {
        private readonly IFuncionarioInterface _funcionarioService;
        public FuncionarioController(IFuncionarioInterface funcionarioService)
        {
            _funcionarioService = funcionarioService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<FuncionarioModel>>>> GetFuncionarios()
            {
            return Ok( await _funcionarioService.GetFuncionarios());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<FuncionarioModel>>> GetFuncionarioById(int id)
        {
            return Ok(await _funcionarioService.GetFuncionarioById(id));
        }
        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<FuncionarioModel>>>> CreateFuncionario(FuncionarioModel novoFuncionario)
        {
            return Ok(await _funcionarioService.CreateFuncionario(novoFuncionario));
        }

        [HttpPut("inativaFuncinario")]
        public async Task<ActionResult<ServiceResponse<List<FuncionarioModel>>>> InativaFuncionario(int id)
        {
            return Ok(await _funcionarioService.InativaFuncionario(id));
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<List<FuncionarioModel>>>> UpdateFuncionario(FuncionarioModel funcionario)
        {
            return Ok(await _funcionarioService.UpdateFuncionario(funcionario));
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<List<FuncionarioModel>>>> DeleteFuncionario(int id)
        {
            return Ok(await _funcionarioService.DeleteFuncionario(id));
        }

    }
}
    