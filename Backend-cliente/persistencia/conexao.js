// O banco de dados escolhido será o MYSQL
import mysql from  'mysql2/promise';

// Nós vamos desenvolvedor código assíncrono, já que a nossa aplicação 
// não é o banco de dados e sim se comunica com um banco de dados que pode
// reponder de imediato, demorar para responder ou numca responder
// pos isso vamos usar o async e o await
export default async function conectar() {
    if (global.pool !== undefined) {
        return await global.pool.getConnection();
    } else {
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root', //não é recomendado usar o super usuario
            password: '',
            port: 3306,
            database: 'backend',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // Máximo de conexões inativas; o valor padrão é o mesmo que "connectionLimit"
            idleTimeout: 360000, // Tempo limite das conexões inativas em milissegundos; o valor padrão é "60000"
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });

        global.pool = pool;
        return await pool.getConnection();
    }
}