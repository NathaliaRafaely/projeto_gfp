export const corPrincipal = '#1b2c4b'
export const corSecundaria = '#436dbb'
export const cortexto = '#54647c'
export const corFundo = '#dee8f2'
export const corFundo2 = '#bcc3d3'

const Estilos = {
  // fundo: {
  //   backgroundColor: corPrincipal,
  // },
    divLogin: {
        width: '350px',
        margin: '100px auto',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
      },
      textoPrincipal: {
        textAlign: 'center',
        marginBottom: '20px',
        color: corPrincipal,
      },
      campo: {
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
      },
      label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
      },
      input: {
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '14px',
      },
      botoes: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
      },
      botao: {
        flex: 1,
        padding: '10px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '6px',
        backgroundColor: corSecundaria,
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      },
      botaoLimpar: {
        backgroundColor: corPrincipal,
      },
      botaoCadastro: 'sm: w-auto bg-cyan-600 text-white px-4 py-2 rounded-lg houver:bg-cyan-900 flex items-center justify-center shadow-sm',
      linhaListagem: ' flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 my-2',
      botaoAlterar:  'flex items-center p-1 text-cyan-700 bg-cyan-100 hover:bg-cyan-200 rounded-md transition-colors',
      botaoExcluir:  'flex items-center p-1 text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors',
}

export default Estilos
