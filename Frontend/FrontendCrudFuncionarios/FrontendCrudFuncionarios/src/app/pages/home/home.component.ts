import { Component, OnInit, ViewChild } from '@angular/core';
import { FuncionariosComponent } from '../../components/funcionarios/funcionarios.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    FuncionariosComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  funcionarios : Funcionario[] = [];
  funcionariosGeral : Funcionario[] = [];
  @ViewChild(FuncionariosComponent) funcionariosComponent!: FuncionariosComponent;


  constructor(private funcionarioservice: FuncionarioService) { }
 
  ngOnInit(): void {
      this.funcionarioservice.getFuncionarios().subscribe((response) => {
      this.funcionarios = response.dados;
      this.funcionariosGeral = response.dados;
      console.log(this.funcionarios);
    });
  }

  searchFuncionario( event: Event): void {
    const  target = event.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();


    this.funcionarios = this.funcionariosGeral.filter(
      (funcionario) => funcionario.nome.toLocaleLowerCase().includes(value) || funcionario.sobrenome.toLocaleLowerCase().includes(value)
    
    );
  }
    
  abrirModalAdicionarFuncionario(): void {
    this.funcionariosComponent.openModalAdicionarFuncionario();
  }

}
