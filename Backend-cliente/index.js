
import express from "express";
import rotaCliente from './rotas/rotasCliente.js';
import cors from 'cors';

//todas as linhas desse progrma são executadas de forma assincroma
/*
const Cliente = new cliente(2,
    "123.456.789-10",
    "atualizou",
    "Rua primavera, 12",
    "Parque Cerejeiras",
    "Presidente Prudente",
    "SP",
    "(11) 99995-6789",
    "rogerio@email.com"
    );
*/
//console.log(Cliente.toJSON());

//nos metodos assincronos é preciso manipular as promessas (promises)
//então, em algum momento o metodo trata uma resposta e nosso programa
// não sabera quando isso ira acontecer

/*Cliente.gravar().then(() =>{
    console.log("Gravado com sucesso");
}).catch(function (erro) {
    console.log(erro.message); //exibe a mensagem do erro
});*/

/*Cliente.atualizar().then(() => {
    console.log("Atualizado com sucesso");
}).catch(function (erro) {
    console.log(erro.message);
});*/

/*Cliente.excluir().then(() => {
    console.log("Excluido com sucesso");
}).catch(function (erro) {
    console.log(erro.message);
});*/
/*
const clienteQQ = new cliente();


clienteQQ.consultar(1).then((listaClientes)=>{
    console.log("Clientes encontrados: " + listaClientes.length);
    for (const cliente of listaClientes){
        console.log(cliente.toJSON());
    }
}).catch((erro) => {
    console.log("Não foi possivel consultar o cliente: ", erro);
});

*/

//////////////////////////////////////////////////////////////////////////////////

const host = '0.0.0.0'; //IP genérico que representa todas as interfaces (placas de rede)
const porta = 3000; // Sempre utilize portas com valor maior que 1024

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json()); //Permite ler dados enviados no formato JSON
app.use(express.urlencoded({extended: true})); // Permite ler dados enviados pelo metodo POST em formulário, como por exemplo os campos do formulário 


app.use('/clientes', rotaCliente);
app.listen(porta, host, () => {
    console.log(`Servidor executando em http://${host}:${porta}`);
});