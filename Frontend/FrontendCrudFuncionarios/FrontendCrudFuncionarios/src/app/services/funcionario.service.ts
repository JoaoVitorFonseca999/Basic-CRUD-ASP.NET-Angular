import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../models/funcionario';
import { Observable } from 'rxjs';
import { Response } from '../models/response';  

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  adicionarFuncionario(funcionario: Funcionario) : Observable<Response<Funcionario[]>> {
    return this.http.post<Response<Funcionario[]>>(this.ApiUrl, funcionario);
  }

  ApiUrl = environment.UrlApi;  

  constructor(private http : HttpClient) { }

  getFuncionarios(): Observable<Response<Funcionario[]>>{

    return this.http.get<Response<Funcionario[]>>(this.ApiUrl);
  }

  deletarFuncionario(idFuncionario: number): Observable<Response<Funcionario[]>>{
    return this.http.delete<Response<Funcionario[]>>(`${this.ApiUrl}?id=${idFuncionario}`);
  }

  atualizarFuncionario(funcionario: Funcionario): Observable<Response<Funcionario[]>>{
    return this.http.put<Response<Funcionario[]>>(this.ApiUrl, funcionario);
  }

  
}
