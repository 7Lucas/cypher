import React from 'react'
import Navigation from './src/components/navegation' // Importação do useNavegation para navegações entre telas como visto em aula
import {SafeAreaProvider} from 'react-native-safe-area-context' // Melhor otimização da vizualização através da "Área Segura"
import { StatusBar } from 'react-native' // Barra de Status

export default function App(){
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content"/>
      <Navigation />
    </SafeAreaProvider>
  )
}