import React, {useState, useEffect, useLayoutEffect} from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Estilos, { corPrincipal } from "../styles/Estilos";
import {enderecoServidor} from '../utils.js'
import { Header } from "react-native/Libraries/NewAppScreen";



export default function Contas({navigation}) {
    const [dadosLista, setDadosLista] = useState([])
    const [usuario, setUsuario] = useState([])

    const botaoExcluir = async (id) => {
        try{
            const resposta = await fetch(`${enderecoServidor}/conta/${id}`,{
            method: 'DELETE',
            Header: {
                'Authorization': `Bearer${usuario.token}`
            }
            });

            if (resposta.ok) {
                buscarDadosAPI();
            }

        }catch (error){
            console.error('Erro ao excluir:', error);
        }
    } 

    const buscarDadosAPI = async () => {
        try{
        

            const resposta = await fetch(`${enderecoServidor}/conta`, {
            method: 'GET',
            Header: {
                'Authorization': `Bearer${usuario.token}`
            }
            });
            console.log(dados);
        }catch(error){
            console.error('Erro ao buscar dados:', error);
        }
    }
    useEffect(() => {
        buscarUsuarioLogado();
    }, [])

    useEffect(() => {
        buscarDadosAPI();
    }, [usuario])

    const buscarUsuarioLogado = async () => {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
            if (usuarioLogado) {
                setUsuario(JSON.parse(usuarioLogado));
            } else {
                navigation.navigate('Login');
            }
        }



    const exibirItemLista = ({item}) => {
        return(
            <TouchableOpacity style={Estilos.itemLista}>
                <Image source={require('../assets/logo.png')}
                    style={Estilos.imagemLista}/>
                <View style={Estilos.textContainer}>
                    <Text> {item.tipo_conta} </Text>
                    <Text style={Estilos.nomeLista}>{item.nome}</Text>
                </View>
                <MaterialIcons name="edit" size={24} color={corPrincipal}/>
                <MaterialIcons name="delet" size={24} color={corPrincipal} 
                    onPress={() => botaoExcluir(item.id_conta)}
                />
            </TouchableOpacity>
        )
    }
    return(
        <View>
            <View>
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