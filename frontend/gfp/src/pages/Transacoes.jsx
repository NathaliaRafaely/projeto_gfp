import React, { useState, useEffect, useContext } from 'react';
import { UsuarioContext } from '../UsuarioContext'
import { enderecoServidor, nomesTipoConta, iconesTipoConta, iconesCategoria } from '../utils'
import { MdAdd, MdEdit, MdDelete, MdCreditCard, MdAccountBalance, MdEmail, MdFeaturedPlayList, MdAttachMoney, MdAutoGraph, MdDone, MdCheckCircle, MdError, MdAccessTime } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'
import Estilos from '../styles/Estilos'

export default function Transacoes() {
    //Guarda os dados do usuario logado, nome, id, email, token
    const { dadosUsuario, setDadosUsuario, carregando } = useContext(UsuarioContext);
    //Guardar os dados da lista vinda da API
    const [dadosLista, setDadosLista] = useState([]);

    const navigate = useNavigate();

    const buscarDadosAPI = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/transacoes`, {
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
        if (!carregando || dadosUsuario) {
            buscarDadosAPI();
        }
    }, [dadosUsuario])

    const botaoExcluir = async (id) => {
        try {
            if (!window.confirm("Tem certeza que deseja excluir esta transação?")) return;

            const resposta = await fetch(`${enderecoServidor}/transacoes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${dadosUsuario.token}`
                }
            });

            if (resposta.ok) buscarDadosAPI();

        } catch (error) {
            console.error('Erro ao excluir:', error);
        }
    }

   
    const botaoQuitar = async (id) => {
        try {
            if (!window.confirm("Tem certeza que deseja quitar essa conta?")) return;
             
            //Criando objeto para atualizar a data de pagamento de transação

            const resposta = await fetch(`${enderecoServidor}/transacoes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${dadosUsuario.token}`
                },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) buscarDadosAPI();

        } catch (error) {
            console.error('Erro ao excluir:', error);
        }
    }

    const montarStatus = (item) =>{
        const hoje = new Date();
        const Vencimento = new Date (item.data_pagamento);
        let status ={};

        if (item.data_pagamento!= null){
            status ={
              cor : 'text-green-600',
              icone: <MdCheckCircle className='h-4 w-4'/>,
              texto: ` Pago em ${formatarData(item.data_pagamento)}`
            }
        } else if (Vencimento < hoje ){
            status ={
              cor : 'text-red-600',
              icone: <MdError className='h-4 w-4'/>,
              texto: ` Vencido em ${formatarData(item.data_vencimento)}`
            }
        } else {
            status ={
              cor : 'text-yellow-600',
              icone: <MdAccessTime className='h-4 w-4'/>,
              texto: ` vence em ${formatarData(item.data_vencimento)}`
            }
        }
        return status
    }

    const formatarData = (data) =>{
        const dataFormatada = new Date (data);
        return dataFormatada.toLocaleDateString('pt-BR',{day: '2-digit', month: '2-digit'});
    }

    const exibirItemLista = (item) => {
        const status = montarStatus(item);

        return (
            <section key={item.id_transacao} className={Estilos.linhaListagem}>
                <div className={`p-2 text-white rounded-full`} style={{backgroundColor: item.cor}}>
                    { iconesCategoria[item.icone] }
                </div>

                <div className='flex-1 p-2' >
                    {/* Descrições*/}
                    <p className='text-gray-800 font-semibold text-sm truncate'>{item.descricao}</p>
                    <div className='flex justify-between items-center'>
                        <div >
                            {/*SubCategoria */}
                            <p className='text-sm text-gray-500 truncate'>{item.nome_subcategoria}</p>

                            {/*Contas */}
                            <p className="text-sm text-gray-500 truncate">{item.nome_conta}</p>

                            {/*Status */}
                            <div className={`flex items-center text-xs gap-1 ${status.cor}`}>
                                {status.icone}
                                <span>{status.texto}</span>
                            </div>
                        </div>
                        <div className='flex flex-col items-end'>
                            {/*Valor*/}
                            <p className={`font-bold ${item.tipo == 'ENTRADA' ? 'text-green-600':  'text-red-600'}`}>
                                R${parseFloat(item.valor).toFixed(2)}
                            </p>

                            {/* Botões de Ações */}
                            <div className='flex items-center space-x-2'>
                                {/* Condiçao para exibir o botão de quitar */}
                                { !item.data_pagamento && <button className={Estilos.botaoQuitar} onClick={() => botaoQuitar(item.id_transacao) }> <MdDone className='h-6 w-6' /></button> }
                               
                                <button className={Estilos.botaoExcluir} onClick={() => botaoExcluir(item.id_conta)} > <MdDelete className='h-6 w-6' /></button>
                             </div>
                        </div>
                    </div>
                </div>        
            </section>
        )
    }

    return (
        <div>
            <p className='text-3xl font-bold mb-6' >Transações</p>
            <section className='bg-white p-4 rounded-lg shadow-md'>
                <div className='flex justify-between items-center mb-4'>
                   
                   
                </div>

                {/* Listas das Contas cadastradas */}
                <section>
                    {dadosLista.map(item => exibirItemLista(item))}
                </section>
            </section>
        </div>
    )
}
