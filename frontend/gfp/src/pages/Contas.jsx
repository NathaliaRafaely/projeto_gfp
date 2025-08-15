import React, {useState, useEffect, useContext} from "react";
import { UsuarioContext } from "../UsuarioContext";
import {enderecoServidor} from '../utils.jsx';
import { MdAdd, MdEdit, MdDelete} from 'react-icons/md';

export default function Contas() {
    const { dadosUsuario, setDadosUsuario, carregando } = useContext(UsuarioContext);
    const [dadosLista, setDadosLista] = useState([]);

    const buscarDadosAPI = async () => {
            try {
                const resposta = await fetch(`${enderecoServidor}/contas`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${dadosUsuario.token}`
                    }
                });
                const dados = await resposta.json();
                setDadosLista(dados);
                console.log('dados', dados);
    
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
    
        useEffect(() => {
            if (carregando || dadosUsuario){
            buscarDadosAPI()
            }
        }, [dadosUsuario])

    return(
        <div>
            <p className='text-3x1 font-bold mb-6'>Contas</p>
            <section className='bg-white p-4 rounded-lg shadow-md'>
                <div className="flex justify-between items-center mb-4">
                    <h3 className='text-xl font-bold text-gray-800'>Gerenciar Contas</h3>
                    <button>
                        <MdAdd className="h-8 w-8"/>
                    </button>
                </div>
            </section>

        </div>
    )
}