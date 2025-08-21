import React, { useState, useEffect, useContext } from 'react';
import { UsuarioContext } from '../UsuarioContext'
import { enderecoServidor } from '../utils'
import { MdCreditCard, MdSave, MdClose } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom'
import Estilos from '../styles/Estilos'

export default function CadContas() {
    const { dadosUsuario } = useContext(UsuarioContext);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            Cadastro de Contas
        </div>
    )

}