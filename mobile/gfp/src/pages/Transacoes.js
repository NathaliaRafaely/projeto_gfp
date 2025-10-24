import React, { useState, useEffect, useLayoutEffect} from 'react';
import  {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos, { corPrincipal } from '../styles/Estilos';
import {calcularDatasPeriodo, enderecoServidor, formatarData} from '../utils';
import { IsFocused, useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


export default function Transacoes({navigation}) {
    const [dadosLista, setDadosLista] = useState([]);
    const [usuario, setUsuario] = useState([]);

    //Guardando os dados dos filtros
      const [pesquisa, setPesquisa] = useState('');
        const [filtro, setFiltro] = useState({
            tipo: 'Todos',
            status: 'Todos',
            periodo: 'esteMes'
        });
   

    //Hook para verificar se a tela está em foco, visível para ver
    const IsFocused = useIsFocused()

    const buscarDadosAPI = async () => {
        try {
            setUsuario(await buscarUsuarioLogado());
             //calcula e gera as datas de acordo com o filtro período selecionado
                const { dataInicio, dataFim } = calcularDatasPeriodo(filtro.periodo);
                        const parametros = new URLSearchParams();
                        parametros.append('dataInicio', dataInicio);
                        parametros.append('dataFim', dataFim);
           
                        const resposta = await fetch(`${enderecoServidor}/transacoes?${parametros.toString()}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${usuario.token}`
                            }
                        });
            const dados = await resposta.json();
            setDadosLista(dados);
            console.log('dados', dados);
           
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }
    //executa essa função quando o componente é criado [] vazio
    useEffect(() => {
        buscarUsuarioLogado();
    }, [])

     useEffect(() => {
        if (IsFocused == true){
         buscarDadosAPI()
        }
    }, [usuario, IsFocused. filtro.periodo])

          const buscarUsuarioLogado = async () =>{
        const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
            if(usuarioLogado){
                setUsuario(JSON.parse(usuarioLogado));
            } else {
                navigation.navigate('Login')
            }
        }
    // const botaoLogout =() =>{
    //     AsyncStorage.removeItem('UsuarioLogado');
    //     navigation.navigate('Login');
    // }

    const botaoExcluir = async (id)  =>{
        try{
            if(!confirm("Tem certeza que deseja excluir esta transação")) return;

            const resposta = await fetch(`${enderecoServidor}/transacoes/${id}`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer${usuario.token}`
                }
            });
             if (resposta.ok) {
                buscarDadosAPI();
             }

        }catch(error){
            console.error('Erro ao excluir:',error)
        }
    }

     const montarStatus = (item) => {
            const hoje = new Date();
            const vencimento = new Date(item.data_vencimento);
            let status = {};
   
            if (item.data_pagamento != null) {
                status = {
                    cor: '#27ae60',
                    icone: 'check-cicle',
                    texto: `Pago em ${formatarData(item.data_pagamento)}`
                }
            } else if (vencimento < hoje) {
                status = {
                    cor: '#e74c3c',
                    icone: 'error',
                    texto: `Vencido em ${formatarData(item.data_vencimento)}`
                }
            } else {
                status = {
                    cor: '#f39c12',
                    icone: 'acess-time',
                    texto: `Vence em ${formatarData(item.data_vencimento)}`
                }
            }
            return status;
        }

    const exibirItemLista = ({item}) => {
        const status = montarStatus(item)
        return (
            <TouchableOpacity style={Estilos.itemLista}>
                 {/* icone de categoria    */}
                <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                    backgroundColor: item.cor
                }}>
                    <MaterialIcons name={item.icone} size={20} color={'#fff'}/>
                </View>

                {/* Informação da transação */}
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold',color:'#333'}}>{item.descricao}</Text>
                    <Text style={{fontSize:13, color:'#777'}}>{item.nome_subcategoria}</Text>
                    <Text style={{fontSize:13, color:'#777'}}>{item.nome_conts}</Text>
                   {/*  Status */}
                    <View style= {{flexDirection: 'row', alignItems:'center'}}>
                        <MaterialIcons name= {status.icone} color={status.cor} size={14}/>
                        <Text style={{ fontSize:12, marginLeft: 4, fontWeight: 500, color: status.cor}}>{status.texto}</Text>
                    </View>
                </View>
            <View>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: item.tipo == 'ENTRADA'? '#27ae60' : '#e74c3c'}}>R$ {item.valor}</Text>
                <View style= {{flexDirection: 'row', alignItems:'center'}}>
                <MaterialIcons name='edit' size={24} color={corPrincipal}
                    onPress={() => navigation.navigate('CadContas', {conta: item})}
                />
                <MaterialIcons name='delete' size={24} color={corPrincipal}
                onPress={() => botaoExcluir (item.id_conta)}
                />
                </View>
            </View>
            </TouchableOpacity>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('CadContas')}>
                    <MaterialIcons name="add" size={28} color="#fff"  
                        style={{marginRight: 15}} />                    
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
                <FlatList
                    data={dadosLista}
                    renderItem={exibirItemLista}
                    keyExtractor={(item) => item.id_transacao}
                />
            </View>
        </View>
    )
}