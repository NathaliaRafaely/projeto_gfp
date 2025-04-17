import { View, Text, Button } from 'react-native';
import Estilos from '../styles/Estilos';

export default function Login ({navigation}) {
    return(
        <View>
            <Text style={Estilos.colo} >Login</Text>
            <Button title='Entrar' 
            onPress={() => navigation.navigate('MenuDrawer')}/>
        </View>
    )
}