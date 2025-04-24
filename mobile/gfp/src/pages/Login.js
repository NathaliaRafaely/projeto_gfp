import { View, Text, Button } from 'react-native';
import Estilos, { corSecundaria } from '../styles/Estilos';

export default function Login ({navigation}) {
    return(
        <View>
            <Text>Login</Text>
            <Button title='Entrar' color={corSecundaria}
            onPress={() => navigation.navigate('MenuDrawer')}/>
        </View>
    )
}