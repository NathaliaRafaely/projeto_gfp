// import express from 'express';
// import { testarConexao } from './db.js';
// import cors from 'cors';
// import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js';
// import rotasCategorias from './routes/rotasCategorias.js';
// import rotasSubCategorias from './routes/rotasSubCategorias.js';
// import rotasContas from './routes/rotasContas.js'
// import rotasTransacaos from './routes/rotasTransacao.js'

// import swaggerUI from 'swagger-ui-express';
// import swaggerSpec from './swagger.js';

// const app = express();
// testarConexao();

// app.use(cors())
// app.use(express.json())

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// app.get('/', (req, res) => {
//     res.redirect('/api-docs')
// })

// // Rotas de Usuários {autenticarToken}
// app.get("/usuarios",  rotasUsuarios.listarUsuarios);
// app.post("/usuarios", rotasUsuarios.novoUsuario);
// app.post('/usuarios/login', rotasUsuarios.login);
// app.delete('/usuarios/:id', autenticarToken, rotasUsuarios.deletarUsuario);
// app.patch('/usuarios/:id', autenticarToken, rotasUsuarios.atualizar);
// app.put('/usuarios/:id', autenticarToken, rotasUsuarios.atualizarTodosCampos);
// app.get('/usuarios/:id', autenticarToken, rotasUsuarios.consultaPorId);


// // Rotas de categorias {autenticarToken}
// app.get("/categorias", autenticarToken, rotasCategorias.listarCategorias);
// app.get("/categorias/filtrarCategoria/:tipo_transacao", autenticarToken, rotasCategorias.filtrarCategorias);
// app.post("/categorias", autenticarToken, rotasCategorias.novaCategoria);
// app.delete('/categorias/:id', autenticarToken, rotasCategorias.deletarCategoria);
// app.get('/categorias/:id',  autenticarToken, rotasCategorias.consultaPorId);
// app.put('/categorias/:id', autenticarToken, rotasCategorias.atualizarTodosCampos);
// app.patch('/categorias/:id', autenticarToken, rotasCategorias.atualizar);

// // Rotas de subcategorias {autenticarToken}
// app.get('/subcategorias', autenticarToken, rotasSubCategorias.listarSubCategorias);
// app.post('/subcategorias', autenticarToken, rotasSubCategorias.novaSubCategoria);
// app.delete('/subcategorias/:id', autenticarToken, rotasSubCategorias.deletarSubCategoria);
// app.get('/subcategorias/:id', autenticarToken, rotasSubCategorias.consultaPorId);
// app.put('/subcategorias/:id', autenticarToken, rotasSubCategorias.atualizarTodosCampos);
// app.patch('/subcategorias/:id', autenticarToken, rotasSubCategorias.atualizar);

// // Rotas de contas {autenticarToken}
// app.get('/contas', autenticarToken,  rotasContas.listarContas);
// app.post('/contas', autenticarToken, rotasContas.novoConta);
// app.delete('/contas/:id', autenticarToken, rotasContas.deletarContas);
// app.get('/contas/:id', autenticarToken, rotasContas.consultaPorId);
// app.put('/contas/:id', autenticarToken, rotasContas.atualizarTodosCampos);
// app.patch('/contas/:id', autenticarToken, rotasContas.atualizar);

// // Rotas de transação {autenticarToken}
// app.get('/transacoes/dadosDashboard', autenticarToken, rotasTransacaos.dadosDashboard); 
// app.get('/transacoes', autenticarToken, rotasTransacaos.listarTransacao);
// app.post('/transacoes', autenticarToken, rotasTransacaos.novaTransacao);
// app.delete('/transacoes/:id', autenticarToken, rotasTransacaos.deletarTransacao);
// app.get('/transacoes/:id', autenticarToken, rotasTransacaos.consultaPorId);
// app.put('/transacoes/:id', autenticarToken, rotasTransacaos.atualizarTodosCampos);
// app.patch('/transacoes/:id', autenticarToken, rotasTransacaos.atualizar);


// const porta = 3000;
// app.listen(porta, () => {
//     console.log(`Api http://localhost:${porta}`)
// });

import express from "express";
import cors from "cors";
import { testarConexao } from "./db.js";
import rotasUsuarios, { autenticarToken } from "./routes/rotasUsuarios.js";
import rotasCategorias from "./routes/rotasCategorias.js";
import rotasSubCategorias from "./routes/rotasSubCategorias.js";
import rotasContas from "./routes/rotasContas.js";
import rotasTransacao from "./routes/rotasTransacao.js";

const app = express();
app.use(cors());
app.use(express.json());

// Teste de conexão
app.get("/testar", testarConexao);

// Rotas de usuários
app.get("/usuarios", rotasUsuarios.listarUsuarios);

// Rotas de categorias
app.get("/categorias", autenticarToken, rotasCategorias.listarCategorias);

// Rotas de transações
app.post("/transacoes", autenticarToken, rotasTransacao.novaTransacao);
app.get("/dashboard", autenticarToken, rotasTransacao.dadosDashboard);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
