import Cliente from '../modelos/cliente.js';

export default class ClienteCTRL {
    // Esta classe te´ra a responsabilidade de traduzir pedidos HTTP em comandos internos da aplicação
    // A nossa aplicação sabe grvar, atualizar, excluir e consultar clientes.
    // Será necessario manipular requisições HTTP
    // Requisições HTTP (GET, POST, PUT ou PATCH , DELETE)

    // Camada de controle será sincrona, então iremos resolver os metodos assincronos com promises

    gravar(requisicao, resposta){

        //preparar o metodo gravra para produzir uma resposta JSON
        resposta.type('application/json');
        //HTPP gravar um cliente é enviar uma requisicao do tipo post
        // trazendo no formato do tipo JSON 
        if(requisicao.method === 'POST' && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const telefone = dados.telefone;
            const email = dados.email;
            const senha = dados.senha;

            // pseudo validaão nos dados
            if(cpf && nome && endereco && bairro && cidade && estado && telefone && email && senha){
                const cliente = new Cliente(0,cpf, nome, endereco, bairro, cidade, estado, telefone, email, senha);
                cliente.gravar().then(() => {
                    resposta.status(201);
                    resposta.json({
                        "status:": true,
                        "mensagem": "Cliente gravado com sucesso",
                        "codigo_cliente": cliente.codigo
                    })
                }).catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status:": false,
                        "mensagem": "Não foi possível gravar o cliente. Erro:" + erro.message
                    })
                });
            }else{
                resposta.status(400);
                resposta.json({
                    "status:": false,
                    "mensagem": "Por favor, informe os dados do cliente, conforme documentação da API"
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

            // o codigo será extraido da url, exemplo: http://localhost:3000/cliente/1 1 é o codigo
            const codigo = requisicao.params.codigo;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const telefone = dados.telefone;
            const email = dados.email;
            const senha = dados.senha;
            if(codigo && codigo > 0 && cpf && nome && endereco && bairro && cidade && estado && telefone && email && senha){
            const cliente = new Cliente(codigo, cpf, nome, endereco, bairro, cidade, estado, telefone, email, senha);
            cliente.atualizar().then(() => {
                resposta.status(200);
                resposta.json({
                    "status:": true,
                    "mensagem": "Cliente atualizado com sucesso"
                })
            }).catch((erro) => {
                resposta.status(500);
                resposta.json({
                    "status:": false,
                    "mensagem": "Não foi possível atualizar o cliente. Erro:" + erro.message
                })
            });
            }else{
                resposta.status(400);
                resposta.json({
                    "status:": false,
                    "mensagem": "Requisição Invalida! Esperando o metodo PUT ou PATCH e dados no formato JSON para atualizar o cliente"
                })
            }
        }else{
            resposta.status(405);
            resposta.json({
                "status:": false,
                "mensagem": "Requisicao Invalida! Esperando o metodo PUT ou PATCH e dados no formato JSON para atualizar o cliente"
            })
        }
    };

    excluir(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === 'DELETE'){
            
            const codigo = requisicao.params.codigo;
            if(codigo && codigo > 0){
                const cliente = new Cliente(codigo);
                cliente.excluir().then(() => {
                    resposta.status(200);
                    resposta.json({
                        "status:": true,
                        "mensagem": "Cliente excluído com sucesso"
                    })
                }).catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status:": false,
                        "mensagem": "Não foi possível excluir o cliente. Erro:" + erro.message
                    })
                })
            }else{
                resposta.status(400);
                resposta.json({
                    "status:": false,
                    "mensagem": "Por favor, informe o código do cliente que deseja excluir, conforme documentação da API"
                })
            }
        }else{
            resposta.status(405);
            resposta.json({
                "status:": false,
                "mensagem": "Requisicao Invalida! Esperando o metodo DELETE para excluir o cliente"
            })
        };
    };

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === 'GET'){
            const termoDePesquisa = requisicao.params.termo;
            const cliente = new Cliente(0);
            cliente.consultar(termoDePesquisa).then((clientes) => {
                resposta.status(200);
                resposta.json(clientes);
            }).catch((erro) => {
                resposta.status(500);
                resposta.json({
                    "status:": false,
                    "mensagem": "Não foi possível consultar os clientes. Erro:" + erro.message
                })
            });
        }else{
            resposta.status(405);
            resposta.json({
                "status:": false,
                "mensagem": "Metodo invalido! Esperando o metodo GET para consultar os clientes"
            })
        }
    };

}