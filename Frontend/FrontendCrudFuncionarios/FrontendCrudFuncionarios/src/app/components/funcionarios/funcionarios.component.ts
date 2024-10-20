import { Component, Input } from '@angular/core';
import { Funcionario } from '../../models/funcionario';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [],
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css'
})
export class FuncionariosComponent {
  @Input() funcionarios: Funcionario[] = [];
  @Input() funcionariosGeral: Funcionario[] = []; 

  constructor() { }

  ngOnInit(): void {

    

  }

  editarFuncionario(idFuncionario:number): void {

    debugger;
    console.log(this.funcionarios);
  }
  deletarFuncionario(idFuncionario:number): void {
    console.log(this.funcionarios);
  }

  openModalEditarFuncionario(): void {
    const modal = document.getElementById('modalEdit');
    if(modal){
      modal.style.display = 'block';
      modal.style.opacity = '1';
    }
  }
  closeModalEditarFuncionario(): void {
    const modal = document.getElementById('modalEdit');
    if(modal){
      modal.style.display = 'none';
      modal.style.opacity = '0';  
    }
  }
}
