import React from 'react'
import { MotiView } from 'moti' // Importação do MotiView para animações "simples" como visto no vídeo referência para a realização da tarefa
import { useNavigation } from '@react-navigation/native' 
import { useSafeAreaInsets } from 'react-native-safe-area-context' 
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function Cypher() {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    return (
      <View style={styles.container}>
      <View style={styles.content}>
      <MotiView
        from={{ rotateZ: '0deg' }} // Valor inicial da animação
        animate={{ rotateZ: '360deg' }} // Valor final da animação
        transition={{ loop: true, type: 'timing', duration: 5000 }} // "Especificações" da animação
      >
        <Image
          source={require('../../assets/chapeu.png')}
          style={styles.chapeu}
        />
      </MotiView>
            <Text style={styles.headerText}>Cypher.exe</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ultimate')}>
              <Text style={styles.buttonText}>Obter Localização</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
              <Text style={styles.buttonText}>Sobre Mim</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#0e1219',
        justifyContent: 'center',
        alignItems: 'center',
      },
      content: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerText: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 40,
      },
      button: {
        backgroundColor: '#1976d2',
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
        width: '100%',
      },
      buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
      },
      chapeu: {
        width: 240,
        height: 160,
        marginVertical: 16
    },
    });