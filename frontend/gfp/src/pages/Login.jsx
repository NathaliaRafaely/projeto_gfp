import { useNavigate, Link, Navigate } from "react-router-dom";
import Estilos from "../styles/Estilos";

export default function Login() {
    const navigate = useNavigate();
    return(
        <div>
            <h1 style={Estilos.corSecundaria}>Tela de Login</h1>
            <button onClick={() => Navigate("/principal")}>Entrar</button>
        </div>
        
    );
}