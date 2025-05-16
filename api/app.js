import express from 'express';
import { testarConexao } from './db.js';
import cors from 'cors';
import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasContas from './routes/rotasContas.js'

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
app.get('/usuarios', autenticarToken, rotasUsuarios.listar);
app.get('/usuarios/:id_usuario', rotasUsuarios.consultarPorId)
app.patch('/usuarios/:id_usuario', rotasUsuarios.atualizar)
app.put('/usuarios/:id_usuario', rotasUsuarios.atualizarTodosCampos)
app.delete('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.desativar)

//Rotas categorias
app.post('/categorias',autenticarToken, rotasCategorias.novaCategoria)
app.get('/categorias',autenticarToken, rotasCategorias.listar)
app.get('/categorias/:id_categoria',autenticarToken, rotasCategorias.consultarPorId)
app.patch('/categorias/:id_categoria', rotasCategorias.atualizar)
// app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodosCampos)
app.delete('/categorias/:id_categoria', rotasCategorias.desativar)

// //rotas subcategorias
// app.post('/subCategorias', rotasSubCategorias.novaSubCategoria)
// app.get('/subCategorias', rotasSubCategorias.listar)
// app.get('/subCategorias/:id_subcategoria', rotasSubCategorias.consultarPorId)
// app.patch('/subcategorias/:id_subcategoria', rotasSubCategorias.atualizar)
// app.put('/subcategorias/:id_subcategoria', rotasSubCategorias.atualizarTodosCampos)
// app.delete('/subcategorias/:id_subcategoria', rotasSubCategorias.desativar)

// rotas Conta
app.post('/conta', rotasContas.novaconta)
app.get('/conta', rotasContas.listar)
app.get('/conta/:id_conta', rotasContas.consultarPorId)
app.patch('/conta/:id_conta', rotasContas.atualizar)
// app.put('/conta/:id_conta', rotasContas.atualizarTodosCampos)
// app.delete('/conta/:id_conta', rotasContas.desativar)

const porta = 3000;
app.listen(porta, () => {
    console.log(`Api http://localhost:${porta}`)
});