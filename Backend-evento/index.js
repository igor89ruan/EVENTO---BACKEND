/*
//Todas as linhas desse programa são executadas de forma síncrona
//ou seja, de forma sequencial

import Evento from "./modelos/evento.js";


const evento = new Evento(3,
    "Festival Brasileiro",
    "Claúdia Leite",
    100,
    80,
    "Presidente Prudente",
    "SP",
    "Rua jardim cambuci, 80",
    "01/09/2024"
    );
    
//Nos métodos assíncronos é preciso manipular as promises  (Promessas)
//Então, em algum momento o método trará uma resposta e o nosso programa
//Não saberá quando isso irá acontecer.

/*
//GRAVAR NOVO EVENTO!

evento.gravar().then(() => {
    console.log("Evento gravado com sucesso no banco de dados!");
})
.catch((erro) => {
    console.error("Erro ao gravar evento:", erro.message);
});

*/

/*
//ATUALIZAR EVENTO JÁ EXISTENTE

evento.atualizar()
.then(() => {
    console.log("Evento atualizado com sucesso!");
}).catch((erro) => {
    console.log("Erro ao atualizar evento:", erro.message);
});
*/

/*

//EXCLUIR EVENTO

evento.excluir()
.then(() => {
    console.log("Evento excluído com sucesso!");
}).catch((erro) => {
    console.log("Erro ao excluir evento:", erro.message);
});



const clienteQQ = new Evento();


clienteQQ.consultar(3).then((listaEventos)=>{
    console.log("Evento encontrado: " + listaEventos.length);
    for (const Evento of listaEventos){
        console.log(Evento.toJSON());
    }
}).catch((erro) => {
    console.log("Não foi possivel consultar o evento: ", erro);
});



//console.log(evento.toJson());

*/


import express from "express";
import rotaEvento from './rotas/rotaEvento.js';
import cors from 'cors';

const host = '0.0.0.0'; //IP genérico que representa todas as interfaces (placas de rede)
const porta = 5000; // Sempre utilize portas com valor maior que 1024

const app = express();

app.use(cors({
    origin:'*'
}));

app.use(express.json()); //Permite ler dados enviados no formato JSON
app.use(express.urlencoded({extended: true})); // Permite ler dados enviados pelo metodo POST em formulário, como por exemplo os campos do formulário 

app.use('/eventos', rotaEvento);
app.listen(porta, host, () => {
    console.log(`Servidor executando em http://${host}:${porta}`);
});