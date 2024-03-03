// classe a abstracao do mundo real
// Em orientecao a objetos um classe possui metodos e atributos
// atributos sao caracteristicas de um objeto
// metodos sao as acoes que um objeto pode executar
import clienteDAO from "../persistencia/clienteDAO.js";
export default class cliente {
    // atributos privados
    // somente por meio de metodos publicos e que podemos alterar os atributos
    // em javascript definidos  privados usando

    #codigo;
    #cpf;
    #nome;
    #endereco;
    #bairro;
    #cidade;
    #estado;
    #telefone;
    #email;

    constructor(codigo = 0, cpf='', nome='', endereco='', bairro='', cidade='',  estado='', telefone='', email=''){
        this.#codigo = codigo;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#telefone = telefone;
        this.#email =  email;
    }

    //definir os metodos de acesso aos atributos de um cliente
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }
    
    get cpf(){
        return this.#cpf;
    }
    set cpf(novoCPF){
        this.#cpf=novoCPF;
    }
    get nome(){
        return this.#nome;
    }
    set nome(novoNome){
        this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get estado() {
        return this.#estado;
    }

    set estado(novoEstado) {
        this.#estado = novoEstado;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }1

    // como armazenar os clinetes no banco de dados ?

    async gravar(){
        const dao = new clienteDAO();
        await dao.gravar(this); // this pode ser compreendido com a seguinte expresão: grave a min mesmo
    }

    async atualizar(){
        const dao = new clienteDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new clienteDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa){
        const dao = new clienteDAO();
        return await dao.consultar(termoDePesquisa); 
    }

    //override do metodo toString da classe pai obejto
    toString() {
        return `Cliente = Codigo: ${this.#codigo}, Nome: ${this.#nome}`
    }

    toJSON() {
        return {
            'codigo': this.#codigo,
            'cpf' : this.#cpf,
            'nome' : this.#nome,
            'endereco' : this.#endereco,
            'bairro' : this.#bairro,
            'cidade' : this.#cidade,
            'estado' : this.#estado,
            'telefone' : this.#telefone,
            'email' : this.#email
        }
    }
}