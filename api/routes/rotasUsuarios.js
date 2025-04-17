import {BD} from '../db.js'
import bcrypt from 'bcrypt'


class rotasUsuarios{
    static async novoUsuario(req, res){
        const{nome, email, senha,  tipo_acesso}= req.body;

        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        try{
            const usuario = await BD.query(`
                INSERT INTO usuarios(nome, email, senha, tipo_acesso)
                VALUES($1, $2, $3, $4)`,
            [nome, email, senhaCriptografada, tipo_acesso])

            res.status(201).json("Usúarios Cadastrado com sucesso✔")
        }catch(error){
            console.error('Erro ao criar usuario', error);
            res.status(500).json({message: 'Erro ao criar', error: error.message})
        }
    }

    static async login(req, res){
        const {email, senha} = req.body;

        try{
            const resultado = await BD.query(
                `SELECT id_usuario, nome, email, senha, tipo_acesso
                FROM usuarios
                WHERE email = $1 `,
                [email]
            );
            if(resultado.rows.length === 0){
                return res.status(401).json({message: 'Email ou senha inválidos'})
            }
            const usuario = resultado.rows[0];
            const senhaValida = await bcrypt.compare(senha, usuario.senha)

            if(!senhaValida){
                return res.status(410).json('Email ou senha inválidos')
            }
            //Gerar um novo token para o usuario
            // const token = jwt.sign(
            //     //payload
            //     {id: usuario.id_usuario, nome: usuario.nome, email: usuario.email},
            //     //signature
            //     SECRET_KEY,
            //     {expiresIn: '1h'}
            // )
            return res.status(200).json({message: 'Login realizado com sucesso'})
            // return res.status(200).json({message: 'Login realizado com sucesso', usuario})
        }
        catch(error){
            console.error('Erro ao realizar login:', error)
            return res.status(500).json({message: 'Erro ao realizar login', erro: error.message})
        }
    }

    static async listar(req, res){
        try{
            const usuarios = await BD.query('SELECT * FROM usuarios');
            res.status(200).json(usuarios.rows);
        }catch(error){
            res.status(500).json({message:
                'Erro ao listar os usuarios', error: error.message})
        }
    }

    static async consultarPorId(req, res){
        const {id_usuario} = req.params;
        try{
            const usuario = await BD.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario])
            res.status(200).json(usuario.rows[0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao consultar os usuarios', error: error.message})
        }
    }

    static async atualizar(req, res){
        const {id_usuario} = req.params;
        const {nome, email, senha, tipo_acesso} = req.body;

        try{
             const campos = [];
             const valores = [];

            //verificar quais campos foram fornecidos
            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`) //
                valores.push(nome);
            }
            if(email !== undefined){
                campos.push(`email = $${valores.length + 1}`)
                valores.push(email);
            }
            if(senha !== undefined){
                campos.push(`senha = $${valores.length + 1}`)
                valores.push(senha);
            }
            if(tipo_acesso !== undefined){
                campos.push(`tipo_acesso = $${valores.length + 1}`)
                valores.push(tipo_acesso);
            }
            if(campos.length === 0){
                return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
            }

            //Adicionar o id ao final de valores
            valores.push(id_usuario)

            //Montamos a query dinamicamente
            const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE id_usuario = ${id_usuario} RETURNING *`
            //Executando nossa query
            const usuario = await BD.query(query,valores)
            //Verifica se o usuario foi atualizando
            if(usuario.rows.length === 0){
                return res.status(404).json({message: 'Usuario não encontrado'})
            }

            return res.status(200).json(usuario.rows[0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao atualizar os usuarios', error: error.message})
        }
    }

    static async atualizarTodosCampos(req, res){
        const {id_usuario} = req.params;
        const {nome, email, senha, tipo_acesso} = req.body
        try{
            const usuario = await BD.query('UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo_acesso = $4 WHERE id_usuario = $5 RETURNING *', [nome, email, senha,tipo_acesso, id_usuario])
            res.status(200).json(usuario.rows [0])
        }catch(error){
            res.status(500).json({message:
                'Erro ao atualizar os usuarios', error: error.message})
        }

    }

   static async desativar(req, res){
    const { id_usuario } = req.params;
    try {
      const usuario = await db.query(
        'UPDATE usuarios SET ativo = FALSE WHERE id_usuario = $1 RETURNING *',
        [id_usuario]);
      res.json({ mensagem: 'Usuário desativado com sucesso.', usuario: usuario.rows[0] });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao desativar o usuário.' });
    }
  };
}
export default rotasUsuarios;