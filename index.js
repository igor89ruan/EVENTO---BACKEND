//Todas as linhas desse programa são executadas de forma síncrona
//ou seja, de forma sequencial

import Evento from "./modelos/evento.js";


const evento = new Evento(3, "Falling in Reverse", "'Rua Ibiuna, 98'", "Sorocaba",
    "SP", "R$ 0.000,00", "ESGOTADO");
    
//Nos métodos assíncronos é preciso manipular as promises  (Promessas)
//Então, em algum momento o método trará uma resposta e o nosso programa
//Não saberá quando isso irá acontecer.


//GRAVAR NOVO EVENTO!

/*evento.gravar().then(() => {
    console.log("Evento gravado com sucesso no banco de dados!");
})
.catch((erro) => {
    console.error("Erro ao gravar evento:", erro.message);
});*/

//ATUALIZAR EVENTO JÁ EXISTENTE

evento.atualizar()
.then(() => {
    console.log("Evento atualizado com sucesso!");
}).catch((erro) => {
    console.log("Erro ao atualizar evento:", erro.message);
});

//EXCLUIR EVENTO

/*evento.excluir()
.then(() => {
    console.log("Evento excluído com sucesso!");
}).catch((erro) => {
    console.log("Erro ao excluir evento:", erro.message);
});*/

const clienteQQ = new evento();


clienteQQ.consultar('Ana Maria').then((listaClientes)=>{
    console.log("Clientes encontrados: " + listaClientes.length);
    for (const cliente of listaClientes){
        console.log(cliente.toJSON());
    }
}).catch((erro) => {
    console.log("Não foi possivel consultar o cliente: ", erro);
});

