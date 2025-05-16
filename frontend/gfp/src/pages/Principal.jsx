export default function Principal() {

    useEffect(() => {
          const buscarUsuarioLogado = async () => {
              const usuarioLogado = await localStorage.getItem('UsuarioLogado');
              if (usuarioLogado){
                  SetUsuario = (JSON.parse(usuarioLogado));
              }else {
                navigate('/principal');
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
    return(
        <div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <p>Usuário: {usuario.nome} </p>
                <button onClick={botaoLogout}>Sair</button>
            </div>
            <div style={{padding: '20px'}}>
                <h2>Principal</h2>
            </div>
        </div>
    );
}