import React, { useState, useEffect, useContext } from 'react';
import { UsuarioContext } from '../UsuarioContext'
import { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import logo from '../assets/logo.png'
import { MdAdd, MdClose, MdGridView, MdLogout, MdPeople} from 'react-icons/md'

export default function Principal() {
    const { dadosUsuario, setDadosUsuario, carregando } = useContext(UsuarioContext);

const [menuAberto, setMenuAberto] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!dadosUsuario && !carregando) {
            navigate('/login');
        }
    }, [dadosUsuario, carregando, navigate]);

    const botaoLogout = () => {
        try {
            localStorage.removeItem('UsuarioLogado');
            setDadosUsuario(null);
            navigate('/');
        } catch (error) {
            console.error('Erro ao deslogar:', error);
        }
    };

    return (
        <div className='flex h-screen font-sans bg-gradient-to-b from-[#2c3e50] to-[#3498db]'>
            
        </div>
    );
}