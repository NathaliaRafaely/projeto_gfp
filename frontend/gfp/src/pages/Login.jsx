import { useNavigate, Link, Navigate } from "react-router-dom";
import React, {useState, Router} from "react";
import Estilos from "../styles/Estilos";
import { enderecoServidor } from "../utils";

export default function Login() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [lembrar, setLembrar] = useState(false);


    async function botaoEntrar() {
       try{
          if(email == '' || senha == ''){
          throw new Error ('Preencha todos os campos')}
          //Autenticar utilizando a API de backend com o fetch
          const resposta = await fetch(`${enderecoServidor}/usuarios/login`,
              {
                  method: 'POST',
                  headers: {'Content-Type': 'applicantion/json'},
                  body: JSON.stringify({
                  email: email,
                  senha: senha
                  })
              }
              )
                
                if(resposta.ok){
                    const dados = await resposta.json();
                    setMensagem(`login bem-sucedido! ✅`)
                    localStorage.setItem('UsuarioLogado', JSON.stringify(...dados, lembrar));
                    navigate("/principal")
                }else{
                    setMensagem('Email ou senha incorretos ❌');
                    throw new Error('Email ou senha incorretos ❌')
                }
            } catch (error) {
                console.error('Error ao realizar login:', error)
                alert(error.mensage);
                return;
            }
            
        }
        function botaoLimpar(){
            setEmail('');
            setSenha('');
        }
    
        useEffect(() => {
          const buscarUsuarioLogado = async () => {
              const usuarioLogado = await localStorage.getItem('UsuarioLogado');
              if (usuarioLogado){
                  SetUsuario = (JSON.parse(usuarioLogado));
              }else {
                navigate('/');
              }
          };

          buscarUsuarioLogado();
      }, [])
      
      const botaoLogout = () => {
        try{
          localStorage.removeItem('UsuarioLogado')
          navigate('/');
        }catch(error){
          console.error('Error ao deslegar:', error)
        }
      }
    return (
<div style={Estilos.fundo}>
  <div className="card" style={Estilos.divLogin}>
    <h1 style={Estilos.textoPrincipal}>Tela de Login</h1>

    <div style={Estilos.campo}>
      <label htmlFor="email" style={Estilos.label}>Digite seu Email:</label>
      <input id="email" type="email" placeholder="name@example.com" value={email}
        onChange={(e) => setEmail(e.target.value)} style={Estilos.input} />
    </div>

    <div style={Estilos.campo}>
      <label htmlFor="senha" style={Estilos.label}>Digite sua Senha:</label>
      <input
        id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} 
        style={Estilos.input} aria-describedby="passwordHelpBlock"
      />
    </div>

    <div className={StyleSheet.between}>
      <div style={{display: flex, alignItems: 'center'}}>
      <input type="checkbox" style={{marginRight: '5px'}} checked={lembrar} onChange={(e) => setLembrar(e.target.checked)}/>
      <label>Lembrar-me</label>
      </div>
    </div>

    <a href="#" className={StyleSheet.forgotPassword}>Esqueceu a senha?</a>

    <div style={Estilos.botoes}>
      <button onClick={botaoEntrar} type="button" style={Estilos.botao}>Entrar</button>
      <button onClick={botaoLimpar} type="button" style={{...Estilos.botao, ...Estilos.botaoLimpar}}>Limpar</button>
    </div>
  </div>
</div>
);
}
