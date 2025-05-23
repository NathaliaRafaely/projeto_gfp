import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "./Principal";
import Contas from "./Contas";
import {corSecundaria} from '../styles/Estilos'

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
    return(
        <Drawer.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor: corSecundaria,
                elevation: 0
            },
            headerTintColor: '#fff'
        }}>
            <Drawer.Screen name="Principal" component={Principal}/>
            <Drawer.Screen name="Contas" component={Contas}/>
        </Drawer.Navigator>
    )
}