import conectar from "./conexao.js"; //Não esquecer do .js no final
import evento from "../modelos/evento.js";
//DAO Data Access Object
export default class EventoDAO{
    async gravar(Evento){
        if (Evento instanceof evento){
            const conexao = await conectar();
            const sql = `INSERT INTO eventos (id, nome_evento, nome_artista, ingresso_disp, valor_ingresso, cidade, estado, endereco_evento, data_evento) 
            values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros =[
                Evento.id,
                Evento.nome_evento,
                Evento.nome_artista,
                Evento.ingresso_disp,
                Evento.valor_ingresso,
                Evento.cidade,
                Evento.estado,
                Evento.endereco_evento,
                Evento.data_evento
            ];
            const [resultados, campos] = await conexao.execute(sql, parametros);
            Evento.codigo = resultados.insertId;
        }
    }
    async atualizar(Evento){
        if (Evento instanceof evento){
            const conexao = await conectar();
            const sql = `UPDATE Eventos SET nome_evento = ?, nome_artista = ?, ingresso_disp = ?, valor_ingresso = ?, cidade = ?, estado = ?, endereco_evento = ?, data_evento = ?
            WHERE id = ?`;
            const parametros = [
                Evento.nome_evento,
                Evento.nome_artista,
                Evento.ingresso_disp,
                Evento.valor_ingresso,
                Evento.cidade,
                Evento.estado,
                Evento.endereco_evento,
                Evento.data_evento,
                Evento.id
            ];

        await conexao.execute(sql, parametros);
        }
    }
    async excluir(Evento){
        if (Evento instanceof evento) {
            const conexao = await conectar ();
            const sql = `DELETE FROM eventos WHERE id = ?`;
            const parametros = [
                Evento.id
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
            sql = `SELECT * FROM eventos WHERE nome_artista LIKE ?`;
            termoDePesquisa = `%${termoDePesquisa}%`; 
        }
        else{
            sql = `SELECT  * FROM eventos WHERE id = ?`;
        }
    const conexao = await conectar();
    const [registros] = await conexao.execute(sql,[termoDePesquisa]);
    //Utilizar os registros encontrados para novos objetos do tipo evento
    let listaEventos = [];
    for (const registro of registros){
        const Evento = new evento(
            registro.id,
            registro.nome_evento,
            registro.nome_artista,
            registro.ingresso_disp,
            registro.valor_ingresso,
            registro.cidade,
            registro.estado,
            registro.endereco_evento,
            registro.data_evento
        );
        listaEventos.push(Evento);
    }
        return listaEventos;
    }
}