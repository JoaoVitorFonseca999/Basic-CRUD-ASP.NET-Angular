import { Component, Input, Output, ViewChild } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css'
})
export class FuncionariosComponent {
  @Input() funcionarios: Funcionario[] = [];
  @Input() funcionariosGeral: Funcionario[] = []; 



  funcionarioEditado: Funcionario = {"nome": "", "sobrenome": "", "departamento": 0, "turno": 0, "dataCriacao": new Date(), "dataAlteracao": new Date(), "ativo": true};
  funcionarioParaAdicionar: Funcionario = {"nome": "", "sobrenome": "", "departamento": 0, "turno": 0, "dataCriacao": new Date(), "dataAlteracao": new Date(), "ativo": true};
  
  idFuncionarioParaExcluir: any;

  opcoesDepartamento: any[] = [
    {"label": "RH", "value": "RH"},
    {"label": "Financeiro", "value": "Financeiro"},
    {"label": "Compras", "value": "Compras"},
    {"label": "Atendimento", "value": "Atendimento"},
    {"label": "Zeladoria", "value": "Zeladoria"}
  ];

  constructor(private funcionarioservice: FuncionarioService) { }

  ngOnInit(): void {
  }

  editarFuncionario(): void {

    this.funcionarioservice.atualizarFuncionario(this.funcionarioEditado).subscribe((response) => {
      this.funcionarios = response.dados;
      this.funcionariosGeral = response.dados;
      console.log(this.funcionarios);
    });
  }
  deletarFuncionario(idFuncionario:number): void {
    this.funcionarioservice.deletarFuncionario(idFuncionario).subscribe((response) => {
      this.funcionarios = response.dados;
      this.funcionariosGeral = response.dados;
      console.log(this.funcionarios);
    });
  }
  adicionarFuncionario(): void {
    this.funcionarioservice.adicionarFuncionario(this.funcionarioParaAdicionar).subscribe((response) => {
      this.funcionarios = response.dados;
      this.funcionariosGeral = response.dados;
      console.log(this.funcionarios);
    });
    this.closeModalAdicionarFuncionario();
  }


  

  openModalEditarFuncionario(): void {
    const modal = document.getElementById('modalEdit');
    if(modal){
      modal.style.display = 'block';
      modal.style.opacity = '1';
    }
    console.log(this.funcionarioEditado);
  }
  closeModalEditarFuncionario(): void {
    const modal = document.getElementById('modalEdit');
    if(modal){
      modal.style.display = 'none';
      modal.style.opacity = '0';  
    }
  }
  openModalAdicionarFuncionario(): void {
    const modal = document.getElementById('modalAdd');
    if(modal){
      modal.style.display = 'block';
      modal.style.opacity = '1';
    }
    console.log(this.funcionarioEditado);
  }
  closeModalAdicionarFuncionario(): void {
    const modal = document.getElementById('modalAdd');
    if(modal){
      modal.style.display = 'none';
      modal.style.opacity = '0';  
    }
    this.funcionarioParaAdicionar=this.novoFuncionarioVazio();
  }
  openModalExcluirFuncionario(idFuncionario:number|undefined|null): void {
    this.idFuncionarioParaExcluir = idFuncionario;
    const modal = document.getElementById('modalExcluir');
    if(modal){
      modal.style.display = 'block';
      modal.style.opacity = '1';
    }
  }
  closeModalExcluirFuncionario(): void {
    const modal = document.getElementById('modalExcluir');
    if(modal){
      modal.style.display = 'none';
      modal.style.opacity = '0';  
    }
  }

  ObterCorPorTurno(turno: any): any {
    switch (turno) {
      case "Tarde":
        return 'rgb(0, 150, 255)';    // Verde para Manhã
      case "Manha":
        return  'rgb(0, 150, 150)'
      case "Noite":
        return 'blue';     // Azul para Noite
      default:
        return 'gray';     // Cinza se nenhum turno corresponder
    }
  }
  obterLabelPorTurno(turno: any): string {
    switch (turno) {
      case "Tarde":
        return 'Tarde';    // Verde para Manhã
      case "Manha":
        return 'Manhã';   // Laranja para Tarde
      case "Noite":
        return 'Noite';     // Azul para Noite
      default:
        return '-';     // Cinza se nenhum turno corresponder
    }
  }

  novoFuncionarioVazio(): Funcionario {
    return {"nome": "", "sobrenome": "", "departamento": 0, "turno": 0, "dataCriacao": new Date(), "dataAlteracao": new Date(), "ativo": true};
  }
}
