
import Evento from '../modelos/evento.js';
export default class eventoCTRL {
    // Esta classe te´ra a responsabilidade de traduzir pedidos HTTP em comandos internos da aplicação
    // A nossa aplicação sabe grvar, atualizar, excluir e consultar evento.
    // Será necessario manipular requisições HTTP
    // Requisições HTTP (GET, POST, PUT ou PATCH , DELETE)

    // Camada de controle será sincrona, então iremos resolver os metodos assincronos com promises

    gravar(requisicao, resposta){

        //preparar o metodo gravra para produzir uma resposta JSON
        resposta.type('application/json');
        //HTPP gravar um evento é enviar uma requisicao do tipo post
        // trazendo no formato do tipo JSON 
        if(requisicao.method === 'POST' && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome_evento = dados.nome_evento;
            const nome_artista = dados.nome_artista;
            const ingresso_disp = dados.ingresso_disp;
            const valor_ingresso = dados.valor_ingresso;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const endereco_evento = dados.endereco_evento;
            const data_evento = dados.data_evento;

            // pseudo validaão nos dados
            if(nome_evento && nome_artista && ingresso_disp && valor_ingresso && cidade && estado && endereco_evento && data_evento){
                const evento = new Evento(0,nome_evento, nome_artista, ingresso_disp, valor_ingresso, cidade, estado, endereco_evento, data_evento);
                evento.gravar().then(() => {
                    resposta.status(201);
                    resposta.json({
                        "status:": true,
                        "mensagem": "Evento gravado com sucesso",
                        "codigo_evento": evento.codigo
                    })
                }).catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status:": false,
                        "mensagem": "Não foi possível gravar o evento. Erro:" + erro.message
                    })
                });
            }else{
                resposta.status(400);
                resposta.json({
                    "status:": false,
                    "mensagem": "Por favor, informe os dados do evento, conforme documentação da API"
                })
            }
        }else{
            resposta.status(405);
            resposta.json({
                "status:": false,
                "mensagem": "Requisicao inválida ! Esperando o metodo POST e dados no formato JSON"
            });
        }
    };

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if(requisicao.method === 'PUT' || requisicao.method === 'PATCH' && requisicao.is('application/json')){
            const dados = requisicao.body;

            // o codigo será extraido da url, exemplo: http://localhost:3000/evento/1 1 é o codigo
            const codigo = requisicao.params.codigo;
            const nome_evento = dados.nome_evento;
            const nome_artista = dados.nome_artista;
            const ingresso_disp = dados.ingresso_disp;
            const valor_ingresso = dados.valor_ingresso;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const endereco_evento = dados.endereco_evento;
            const data_evento = dados.data_evento;
            if(codigo && codigo > 0 && nome_evento && nome_artista && ingresso_disp && valor_ingresso && cidade && estado && endereco_evento && data_evento){
            const evento = new Evento(codigo, nome_evento, nome_artista, ingresso_disp, valor_ingresso, cidade, estado, endereco_evento, data_evento);
            evento.atualizar().then(() => {
                resposta.status(200);
                resposta.json({
                    "status:": true,
                    "mensagem": "Evento atualizado com sucesso"
                })
            }).catch((erro) => {
                resposta.status(500);
                resposta.json({
                    "status:": false,
                    "mensagem": "Não foi possível atualizar o evento. Erro:" + erro.message
                })
            });
            }else{
                resposta.status(400);
                resposta.json({
                    "status:": false,
                    "mensagem": "Requisição Invalida! Esperando o metodo PUT ou PATCH e dados no formato JSON para atualizar o evento"
                })
            }
        }else{
            resposta.status(405);
            resposta.json({
                "status:": false,
                "mensagem": "Requisicao Invalida! Esperando o metodo PUT ou PATCH e dados no formato JSON para atualizar o evento"
            })
        }
    };

    excluir(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === 'DELETE'){
            
            const codigo = requisicao.params.codigo;
            if(codigo && codigo > 0){
                const evento = new Evento(codigo);
                evento.excluir().then(() => {
                    resposta.status(200);
                    resposta.json({
                        "status:": true,
                        "mensagem": "Evento excluído com sucesso"
                    })
                }).catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status:": false,
                        "mensagem": "Não foi possível excluir o evento. Erro:" + erro.message
                    })
                })
            }else{
                resposta.status(400);
                resposta.json({
                    "status:": false,
                    "mensagem": "Por favor, informe o código do evento que deseja excluir, conforme documentação da API"
                })
            }
        }else{
            resposta.status(405);
            resposta.json({
                "status:": false,
                "mensagem": "Requisicao Invalida! Esperando o metodo DELETE para excluir o evento"
            })
        };
    };

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === 'GET'){
            const termoDePesquisa = requisicao.params.termo;
            const evento = new Evento(0);
            evento.consultar(termoDePesquisa).then((Evento) => {
                resposta.status(200);
                resposta.json(Evento);
            }).catch((erro) => {
                resposta.status(500);
                resposta.json({
                    "status:": false,
                    "mensagem": "Não foi possível consultar os eventos. Erro:" + erro.message
                })
            });
        }else{
            resposta.status(405);
            resposta.json({
                "status:": false,
                "mensagem": "Metodo invalido! Esperando o metodo GET para consultar os eventos"
            })
        }
    };

}