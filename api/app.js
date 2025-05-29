import express from 'express';
import { testarConexao } from './db.js';
import cors from 'cors';
import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasSubCategorias from './routes/rotasSubCategorias.js';
import rotasContas from './routes/rotasContas.js'
import rotasTransacaos from './routes/rotasTransacao.js'

import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

const app = express();
testarConexao();

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.get('/', (req, res) => {
    res.redirect('/api-docs')
})

//Rotas usuarios
app.post('/usuarios', rotasUsuarios.novoUsuario)
app.post('/usuarios/login', rotasUsuarios.login);
app.get('/usuarios', autenticarToken, rotasUsuarios.listar);
app.get('/usuarios/:id_usuario',autenticarToken, rotasUsuarios.consultarPorId)
app.patch('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.atualizar)
app.put('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.atualizarTodosCampos)
app.delete('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.desativar)

//Rotas categorias
app.post('/categorias', autenticarToken, rotasCategorias.novaCategoria)
app.get('/categorias/filtrarCategoria',rotasCategorias.filtrarCategoria)
app.get('/categorias',autenticarToken, rotasCategorias.listar)
// app.get('/categorias/:id_categoria',autenticarToken, rotasCategorias.consultarPorId)
// app.patch('/categorias/:id_categoria', rotasCategorias.atualizar)
// app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodosCampos)
app.delete('/categorias/:id_categoria', autenticarToken, rotasCategorias.desativar)

// //rotas subcategorias
app.post('/subCategorias', rotasSubCategorias.novaSubCategoria)
app.get('/subCategorias', rotasSubCategorias.listar)
// app.get('/subCategorias/:id_subcategoria', rotasSubCategorias.consultarPorId)
// app.patch('/subcategorias/:id_subcategoria', rotasSubCategorias.atualizar)
// app.put('/subcategorias/:id_subcategoria', rotasSubCategorias.atualizarTodosCampos)
// app.delete('/subcategorias/:id_subcategoria', rotasSubCategorias.desativar)

// rotas Conta
app.post('/contas', rotasContas.novaconta)
app.get('/contas/filtrarNome',rotasContas.filtrarNome)
app.get('/contas', rotasContas.listar)
app.get('/contas/:id_conta', rotasContas.consultarPorId)
app.patch('/contas/:id_conta', rotasContas.atualizar)
app.put('/contas/:id_conta', rotasContas.atualizar)
// app.delete('/contas/:id_conta', rotasContas.desativar)

// rotas transacao
app.post('/transacao', rotasTransacaos.novaTransacao)
app.get('/transacao/somarTransacoes',rotasTransacaos.somarTransacoes)
app.get('/transacao/filtrarData',rotasTransacaos.filtrarPorData)
// app.get('/transacao/transacoesVencidas/:id_usuario',rotasTransacaos.transacoesVencidas)
// app.get('/transacao', rotasTransacaos.listar)
// app.get('/transacao/:id_transacao', rotasTransacaos.consultarPorId)
// app.patch('/transacao/:id_transacao', rotasTransacaos.atualizar)
// app.put('/transacao/:id_transacao', rotasTransacaos.atualizarTodosCampos)
// app.delete('/transacao/:id_transacao', rotasTransacaos.desativar)

const porta = 3000;
app.listen(porta, () => {
    console.log(`Api http://localhost:${porta}`)
});