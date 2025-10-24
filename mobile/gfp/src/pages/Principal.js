import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Principal({ navigation }) {
    const [usuario, setUsuario] = useState({});
    useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
            if (usuarioLogado) {
                setUsuario(JSON.parse(usuarioLogado))
            } else {
                navigation.navigate('Login')
            }
        }
        buscarUsuarioLogado()
    }, [])


    const botaoLogout = () => {
        AsyncStorage.removeItem('UsuarioLogado');
        navigation.navigate('Login')
    }
    return(
        <View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text>Usuário: {usuario.nome}</Text>
                <Button title='Sair' onPress={botaoLogout}/>
            </View>
            <Text style={{color: "#ff4b9f", fontSize: 50, fontFamily: "Arial", justifyContent: 'center', display: 'flex'}}>Principal</Text>
        </View>
       
    )
}
