export const enderecoServidor = 'http://localhost:3000'

import {MdCategory, MdDryCleaning, MdShoppingCart, MdWallet, Md4K, MdSchool, MdFavorite, MdSportsSoccer, MdRestaurant, MdFitnessCenter, MdPets, MdHome, MdOutlineDirectionsCar, MdOutlineMedicalServices, MdFastfood, MdCreditCard,MdAccountBalance, MdMail, MdFeaturedPlayList, MdAttachMoney, MdAutoGraph  } from 'react-icons/md';

export const listaCores = ['#ff0707ff', '#FFC300', '#dcf3b2ff', '#33FF57', '#33a1ffff', '#8D33FF', '#FF33EC', '#ff33a1ff', '#33FFF6', '#FF7F50'];
export const listaIcones = ['restaurant', 'Car', 'school', 'home', 'sports-soccer', 'shopping-cart', 'pets', 'favorite','fitness-center', 'wallet', '4k', 'Cleaning', 'Medic', 'Food', 'Category'];

   
    export const iconesCategoria ={
            'shopping-cart': <MdShoppingCart className = "w-6 h-6" />,
            'Wallet': <MdWallet className = "w-6 h-6" />,
            '4k': <Md4K className = "w-6 h-6" />,
            'school': <MdSchool className = "w-6 h-6" />,
            'favorite': <MdFavorite className = "w-6 h-6" />,
            'sports-soccer': <MdSportsSoccer className = "w-6 h-6" />,
            'restaurant': <MdRestaurant className = "w-6 h-6" />,
            'home': <MdHome className = "w-6 h-6" />,
            'fitness-center': <MdFitnessCenter className = "w-6 h-6" />,
            'pets': <MdPets className = "w-6 h-6" />,
            'Car': <MdOutlineDirectionsCar className = "w-6 h-6" />,
            'Medic': <MdOutlineMedicalServices className = "w-6 h-6" />,
            'Food': <MdFastfood className = "w-6 h-6" />,
            'Cleaning': <MdDryCleaning className = "w-6 h-6" />,
            'Category': <MdCategory className = "w-6 h-6" />,

   
        }

    export const iconesTipoConta ={
            'CONTA_CORRENTE': <MdAccountBalance className = "w-6 h-6" />,
            'POUPANCA': <MdMail className = "w-6 h-6" />,
            'CARTÃO_CREDITO': <MdCreditCard className = "w-6 h-6" />,
            'CARTÃO_DEBITO': <MdFeaturedPlayList className = "w-6 h-6" />,
            'DINHEIRO': <MdAttachMoney className = "w-6 h-6" />,
            'INVESTIMENTO': <MdAutoGraph className = "w-6 h-6" />,
        }
    
       
    export const nomesTipoConta ={
            'CONTA_CORRENTE': 'Conta Correte',
            'POUPANCA': 'Poupança' ,
            'CARTÃO_CREDITO': 'Cartão Credito',
            'CARTÃO_DEBITO': 'Cartão Debito',
            'DINHEIRO': 'Dinheiro',
            'INVESTIMENTO': 'Investimento',
    
        }
