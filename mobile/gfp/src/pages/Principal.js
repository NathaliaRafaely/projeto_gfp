import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect} from 'react';
import { Text, View, Button } from 'react-native';
import Estilos from '../styles/Estilos';

export default function Principal({ navigation }){

    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
            if (usuarioLogado) {
                setUsuario(JSON.parse(usuarioLogado));
            } else {
                navigation.navigate('Login');
            }
        }
        buscarUsuarioLogado();
    }, [])

    const botaoLogout = () => {
        AsyncStorage.removeItem('UsuarioLogado');
        navigation.navigate('Login');
    }
    return(
        <View>
            <View style={{flexDirection: 'row',
                           alignItems:'center',
                           justifyContent: 'space-between'}}>
                <Text>Usuário: {usuario.nome}</Text>
                <button title='Sair' onPress={botaoLogout} style={Estilos.botao1}>Sair</button>
            </View>
            <Text>Principal</Text>
        </View>
        
    )
}

