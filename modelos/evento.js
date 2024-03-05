//Classe é a abstração de uma entidade do mundo real
//Em orientação a objetos uma classe possui métodos e atributos
//Atributos são caracteristicas de um Objeto
//Métodos são as ações que um objeto pode executar
import EventoDAO from "../persistencia/eventoDAO.js";

export default class Evento {
    //atributos são privados
    //somente por meio de métodos públicos é que podemos acessar os atributos de uma classe
    //em javascript definimos atributos privados usando #
    #codigo;
    #artista;
    #endereco;
    #cidade;
    #estado;
    #preco;
    #ingressos;

    constructor(codigo=0, artista="", endereco="", cidade="", estado="", preco="", ingressos="") {
        this.#codigo = codigo;
        this.#artista = artista;
        this.#endereco= endereco;
        this.#cidade= cidade;
        this.#estado= estado;
        this.#preco = preco;
        this.#ingressos = ingressos;
    }
    
    //definir os métodos de acesso aos atributos de um evento
    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }
    get artista(){
        return this.#artista;
    }
    set artista(novoArtista){
        this.#artista = novoArtista;
    }
    get endereco(){
        return this.#endereco;
    }
    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
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
    get preco(){
        return this.#preco;
    }
    set preco(novoPreco){
        this.#preco = novoPreco;
    }
    get ingressos(){
        return this.#ingressos;
    }
    set ingressos(novoIngressos){
        this.#ingressos = novoIngressos;
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
        return `Evento código: ${this.#codigo} - artista: ${this.#artista}`
    }
    toJson(){
        return {
            "codigo": this.#codigo,
            "artista": this.#artista,
            "endereco": this.#endereco,
            "cidade": this.#cidade,
            "estado": this.#estado,
            "preco": this.#preco,
            "ingressos": this.#ingressos,
        }
    }
}