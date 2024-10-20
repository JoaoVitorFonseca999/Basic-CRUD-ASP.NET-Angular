export interface Funcionario{
    id?: number;
    nome: string;
    sobrenome: string;
    departamento: number;
    turno: number;
    dataCriacao: Date;
    dataAlteracao: Date;
    ativo: boolean;
}