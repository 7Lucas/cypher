import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function About() {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    return (

    <View style={styles.container}>
      <View style={styles.content}>
      <Image source={require('../../assets/cypher.png')} style={styles.cypher}/>
        <Text style={styles.headerText}>Codinome: Cypher</Text>
        <Text style={styles.text}>// FUNÇÃO SENTINELA</Text>
        <Text style={styles.headerText}>// BIOGRAFIA</Text>
        <Text style={styles.text}>
          Cypher, um vendedor de informações do Marrocos, é uma verdadeira rede de vigilância de um homem só que fica de olho em cada movimento dos inimigos. Nenhum segredo está a salvo. Nenhuma manobra passa despercebida. Cypher está sempre vigiando.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0e1219',
    },
    content: {
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 18,
      marginVertical: 8,
      color: '#fff',
    },
    text: {
      fontSize: 18,
      marginVertical: 8,
      color: '#fff',
    },
    cypher: {
      width: 280,
      height: 390,
      marginVertical: 16
  },
  });