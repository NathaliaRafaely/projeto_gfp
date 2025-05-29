import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos, { corPrincipal } from '../styles/Estilos';
import { enderecoServidor } from '../utils';
import { useIsFocused } from '@react-navigation/native';
import CadContas from './CadContas';

export default function Contas({ navigation }) {
    const [dadosLista, setDadosLista] = useState([]);
    const [usuario, setUsuario] = useState([]);

    const isFocused = useIsFocused();

    const buscarDadosAPI = async () => {
        try {
            console.log('token', usuario.token);
            
            const resposta = await fetch(`${enderecoServidor}/contas`, {
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

    useEffect(() => {
        buscarUsuarioLogado()
    }, [])

    useEffect(() => {
        if (isFocused == true) {
            buscarDadosAPI()
        }
    }, [usuario, isFocused])

    const buscarUsuarioLogado = async () => {
        const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
        console.log(usuarioLogado);
        
        if (usuarioLogado) {
            setUsuario(JSON.parse(usuarioLogado));
        } else {
            navigation.navigate('Login');
        }
    }

    const UsuarioLogado = async () => {
        const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
        if (UsuarioLogado) {
            setUsuario(JSON.parse(UsuarioLogado));
        } else {
            navigation.nagate('Login')
        }
    }
    const botaoLogout = () => {
        AsyncStorage.removeItem('UsuarioLogado');
        navigation.navigate('Login');
    }

    const botaoExcluir = async (id_conta) => {
    try {
        const resposta = await fetch(`${enderecoServidor}/contas/${id_conta}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${usuario.token}`
            }
        });
        if (resposta.ok) {
            buscarDadosAPI();
        } else {
            console.error('Falha ao excluir. Status:', resposta.status);
        }
    } catch (error) {
        console.error('Erro ao excluir:', error);
    }
}


    const exibirItemLista = ({ item }) => {
        return (
            <TouchableOpacity style={Estilos.itemLista}>
                <Image source={require('../assets/logo.png')}
                    style={Estilos.imagemLista} />
                <View style={Estilos.textContainer}>
                    <Text>{item.tipo_conta}</Text>
                    <Text style={Estilos.nomeLista}>{item.nome}</Text>
                </View>
                <MaterialIcons name='edit' size={24} color={corPrincipal}
                    onPress={() => navigation.navigate('CadContas', { Conta: item })} />

                <MaterialIcons name='delete' size={24} color={corPrincipal}
                    onPress={() => botaoExcluir(item.id_conta)}
                />
            </TouchableOpacity>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('CadContas')}>
                    <MaterialIcons name="add" size={28} color="#fff"
                        style={{ marginRight: 15 }} />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
                <Text>Contas</Text>
                <FlatList
                    data={dadosLista}
                    renderItem={exibirItemLista}
                    keyExtractor={(item) => item.id_conta}
                />
            </View>
        </View>
    )
}

