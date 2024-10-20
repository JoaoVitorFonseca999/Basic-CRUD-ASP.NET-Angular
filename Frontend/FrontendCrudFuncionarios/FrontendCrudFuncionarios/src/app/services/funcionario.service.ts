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
  adicionarFuncionario(funcionario: Funcionario) {
    throw new Error('Method not implemented.');
  }

  ApiUrl = environment.UrlApi;  

  constructor(private http : HttpClient) { }

  getFuncionarios(): Observable<Response<Funcionario[]>>{

    return this.http.get<Response<Funcionario[]>>(this.ApiUrl);
  }
}
