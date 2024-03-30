//Rota é uma micro aplicação express que se encarrega de processar
// requisições em um determinado endpoint
// Por exemplo: http://localhost:3000/cliente < --- cliente é um endpoint
// dominio da aplicação endpoint

import {Router} from "express";
import clienteCTRL from "../controles/clienteCTRL.js";

const rotaCliente = new Router();
const cliCTRL = new clienteCTRL();

rotaCliente
.get('/', cliCTRL.consultar)  // Atribuindo a função consultar como parametro do que executar quando receber um metodo GET na rota.get("/",cliCTRL.listar)
.get('/:termo', cliCTRL.consultar)  // Atribuindo a função consultar como parametro do que executar quando receber um metodo GET na rota
.post('/', cliCTRL.gravar)  //Cadastra um novo cliente
.put('/:codigo', cliCTRL.atualizar)   //Atualiza os dados do cliente
.patch('/:codigo', cliCTRL.atualizar)    //Apenas atualiza o campo especificado
.delete('/:codigo', cliCTRL.excluir);   //Exclui o cliente com esse código

export default rotaCliente;