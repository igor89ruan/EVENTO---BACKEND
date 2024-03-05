import conectar from "./conexao.js"; //Não esquecer do .js no final
import Evento from "../modelos/evento.js";
//DAO Data Access Object
export default class EventoDAO{
    async gravar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `INSERT INTO evento (artista, endereco, cidade, 
            estado, preco, ingressos) 
            values (?, ?, ?, ?, ?, ?)`;
        const parametros =[
            evento.artista,
            evento.endereco,
            evento.cidade,
            evento.estado,
            evento.preco,
            evento.ingressos
        ];
            const [resultados, campos] = await conexao.execute(sql, parametros); // Adicionado "=" aqui
            evento.codigo = resultados.insertId; // Recupero o ID gerado pelo DB
        }
    }
    async atualizar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `UPDATE Evento SET artista = ?, endereco = ?, cidade = ?, estado = ?, preco = ?, ingressos = ? WHERE id = ?`;
        const parametros = [
            evento.artista,
            evento.endereco,
            evento.cidade,
            evento.estado,
            evento.preco,
            evento.ingressos,
            evento.codigo,
        ];

        await conexao.execute(sql, parametros);
        }
    }
    async excluir(evento){
        if (evento instanceof Evento) {
            const conexao = await conectar ();
            const sql = `DELETE FROM evento WHERE id = ?`;
            const parametros = [
                evento.codigo
            ]
            await conexao.execute(sql, parametros);
        }

    }

    //Termo de pesquisa pode ser código do artista ou nome.
    //Se o termo for um número, pesquisar pelo código 
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql=""
        if (isNaN(termoDePesquisa)){ //Termo de pesquisa não é número (isNaN = Is Not a Number)
            sql = `SELECT * FROM cliente WHERE nome LIKE ?`;
            termoDePesquisa = `%${termoDePesquisa}%`; 
        }
        else{
            sql = `SELECT  * FROM evento WHERE id = ?`;
        }
    const conexao = await conectar();
    const [registros] = await conexao.execute(sql,[termoDePesquisa]);
    //Utilizar os registros encontrados para novos objetos do tipo evento
    let listaEventos = [];
    for (const registro of registros){
        const evento = new Evento(
            registro.id,
            registro.artista,
            registro.endereco,
            registro.cidade,
            registro.estado,
            registro.preco,
            registro.ingressos
        );
        listaEventos.push(evento);
    }
        return listaEventos;
    }
}