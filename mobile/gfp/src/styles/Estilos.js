export const corPrincipal = '#7f077e';
export const corSecundaria = '#2980b9';
export const corTextos = '#f2f2f2';
export const corTextos2 = '#999';
export const corPreto = '#222';
export const corFundo = '#0d0d0d';
export const corFundo2 = '#262626';
export const corBorda = '#262626';
import { StyleSheet } from 'react-native';


const Estilos = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    logoText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: corTextos,
        marginLeft: 5,
    },
    headerSubTitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
        textAlign: 'center',
        flexDirection: 'column',
        marginLeft: 5,
    },
    loginCard: {
        width: '100%',
        backgroundColor: corTextos,
        borderRadius: 24,
        padding: 24,
        shadowColor: corPreto,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: corPreto,
        marginBottom: 20,
        textAlign: 'center'
    },
    
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    forgotPasswordText: {
        color: corPrincipal,
        fontSize: 14,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        color: corTextos2,
        fontSize: 14,
    },
    signUpLink: {
        color: corPrincipal,
        fontSize: 14,
        fontWeight: 'bold',
    },
    featuresContainer: {
        width: '100%',
        marginBottom: 20,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 15,
        borderRadius: 12,
    },
    featureText: {
        color: corTextos,
        marginLeft: 10,
        fontSize: 14,
    },
    conteudo : {
        flex : 1,
        width : '100%',
        backgroundColor: corFundo
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#f4f6f8',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 45,
        fontSize: 16,
        color: corPreto,
        borderWidth: 1,
        borderColor: corBorda,
    },
    inputActive: {
        borderColor: corPrincipal,
        backgroundColor: 'rgba(52, 152, 219, 0.05)',
    },
    inputIcon: {
        position: 'absolute',
        left: 15,
        top: 15,
        zIndex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 15,
        zIndex: 1,
    },
    botao: {
        width: '100%',
        height: 55,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 24,
    },
    degradeBotao: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoTexto: {
        color: corTextos,
        fontSize: 16,
        fontWeight: 'bold',
    }, 
    
    conteudoHearder: {
        flex: 1,
        backgroundColor: corSecundaria,
    }, 
    
    conteudoCorpo: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25
    }, 
    
    imagemLista: {
        width: 35, 
        height: 35,
        marginRight: 10
    }, 
    
    itemLista: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor:'#ccc',
        borderBottomWidth: 5,
        paddingVertical: 7,
    }, 
    
    textContainer: {
        flex: 1,
        backgroundColor: '#ccf'
    }, 
    
    nomeLista: {
        fontSize: 16,
        fontWeight: 'bold',
        color: corSecundaria,
    }

});

export default Estilos;

