import express from 'express';
import { testarConexao } from './db.js';
import cors from 'cors';
import rotasUsuarios from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasSubCategorias from './routes/rotasSubCategorias.js';
import rotaslocalTransacao from './routes/rotaslocalTransacao.js'

const app = express();
testarConexao();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API Funcionando!!✔🎇')
})

//Rotas usuarios
app.post('/usuarios', rotasUsuarios.novoUsuario)
app.post('/usuarios/login', rotasUsuarios.login);
app.get('/usuarios', rotasUsuarios.listar);
app.get('/usuarios/:id_usuario', rotasUsuarios.consultarPorId)
app.patch('/usuarios/:id_usuario', rotasUsuarios.atualizar)
app.put('/usuarios/:id_usuario', rotasUsuarios.atualizarTodosCampos)
app.delete('/usarios/:id_usuario', rotasUsuarios.desativar)

//Rotas categorias
app.post('/categorias', rotasCategorias.novaCategoria)
app.get('/categorias', rotasCategorias.listar)
app.get('/categorias/:id_categoria', rotasCategorias.consultarPorId)
app.patch('/categorias/:id_categoria', rotasCategorias.atualizar)
app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodosCampos)
app.delete('/categorias/:id_categoria', rotasCategorias.desativar)

//rotas subcategorias
app.post('/subCategorias', rotasSubCategorias.novaSubCategoria)
app.get('/subCategorias', rotasSubCategorias.listar)
app.get('/subCategorias/:id_subcategoria', rotasSubCategorias.consultarPorId)
app.patch('/subcategorias/:id_subcategoria', rotasSubCategorias.atualizar)
app.put('/subcategorias/:id_subcategoria', rotasSubCategorias.atualizarTodosCampos)
app.delete('/subcategorias/:id_subcategoria', rotasSubCategorias.desativar)

// rotas local_transacao
app.post('/localTransacao', rotaslocalTransacao.novolocalTransacao)
app.get('/localTransacao', rotaslocalTransacao.listar)
app.get('/localTransacao/:id_local_transacao', rotaslocalTransacao.consultarPorId)
app.patch('/localTransacao/:id_local_transacao', rotaslocalTransacao.atualizar)
app.put('/localTransacao/:id_local_transacao', rotaslocalTransacao.atualizarTodosCampos)
app.delete('/localTransacao/:id_local_transacao', rotaslocalTransacao.desativar)

const porta = 3000;
app.listen(porta, () => {
    console.log(`Api http://localhost:${porta}`)
});