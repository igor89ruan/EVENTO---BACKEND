//Classe é a abstração de uma entidade do mundo real
//Em orientação a objetos uma classe possui métodos e atributos
//Atributos são caracteristicas de um Objeto
//Métodos são as ações que um objeto pode executar
import EventoDAO from "../persistencia/eventoDAO.js";

export default class Evento {
    //atributos são privados
    //somente por meio de métodos públicos é que podemos acessar os atributos de uma classe
    //em javascript definimos atributos privados usando #
    #id;
    #nome_evento;
    #nome_artista;
    #ingresso_disp;
    #valor_ingresso;
    #cidade;
    #estado;
    #endereco_evento;
    #data_evento;

    constructor(id= 0, nome_evento= '', nome_artista= '', ingresso_disp= 0, valor_ingresso= 0, cidade= '', estado= '', endereco_evento= '', data_evento= ''){
        this.#id = id;
        this.#nome_evento = nome_evento;
        this.#nome_artista = nome_artista;
        this.#ingresso_disp = ingresso_disp;
        this.#valor_ingresso = valor_ingresso;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#endereco_evento = endereco_evento;
        this.#data_evento = data_evento;
    }
    //definir os métodos de acesso aos atributos de um evento
    get id(){
        return this.#id;
    }
    set id(novoid){
        this.#id = novoid;
    }
    get nome_evento(){
        return this.#nome_evento;
    }
    set nome_evento(novoNome){
        this.#nome_evento = novoNome;
    }
    get nome_artista(){
        return this.#nome_artista;
    }
    set nome_artista(novoNome){
        this.#nome_artista = novoNome;
    }
    get ingresso_disp(){
        return this.#ingresso_disp;
    }
    set ingresso_disp(novoIngresso){
        this.#ingresso_disp = novoIngresso;
    }
    get valor_ingresso(){
        return this.#valor_ingresso;
    }
    set valor_ingresso(novoValor){
        this.#valor_ingresso = novoValor;
    }
    get cidade(){
        return this.#cidade;
    }
    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }
    get estado(){
        return this.#estado;
    }
    set estado(novoEstado){
        this.#estado = novoEstado;
    }
    get endereco_evento(){
        return this.#endereco_evento;
    }
    set endereco_evento(novoEndereco_evento){
        this.#endereco_evento = novoEndereco_evento;
    }
    get data_evento(){
        return this.#data_evento;
    }
    set data_evento(novaData){
        this.#data_evento = novaData;
    }
//Como armazenar os eventos no Banco de Dados

async gravar(){
    const dao = new EventoDAO();
    await dao.gravar(this); //this pode ser compreendido como a seguinte expressão: grave a mim mesmo
}
async atualizar(){
    const dao = new EventoDAO();
    await dao.atualizar(this); 
}
async excluir(){
    const dao = new EventoDAO();
    await dao.excluir(this);
}
async consultar(termoDePesquisa){
    const dao = new EventoDAO();
    return await dao.consultar(termoDePesquisa);
}
    //Override do método toString da classe pai Object
    toString(){
        return `Evento código: ${this.#id} - artista: ${this.#nome_evento} - ingressos disponíveis: ${this.#ingresso_disp}`
    }
    toJSON(){
        return {
            "id": this.#id,
            "nome_evento": this.#nome_evento,
            "nome_artista": this.#nome_artista,
            "ingresso_disp": this.#ingresso_disp,
            "valor_ingresso": this.#valor_ingresso,
            "cidade": this.#cidade,
            "estado": this.#estado,
            "endereco": this.#endereco_evento,
            "data_evento": this.#data_evento    
        }
    }
}