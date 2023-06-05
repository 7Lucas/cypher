import React, {useState, useEffect, useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native' 
import { MotiView } from 'moti' // Importação do MotiView para animações "simples" como visto no vídeo referência para a realização da tarefa
import { useSafeAreaInsets } from 'react-native-safe-area-context' 
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import {auth, database} from '../../config/firebase'
import {collection, onSnapshot, orderBy, query, where} from 'firebase/firestore'
import Local from '../components/Local/'       


export default function Locais() {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    const [busca, setBusca] = useState('')
    const [locais, setLocais] = useState([])
    const [carregaLocais, setCarregaLocais] = useState(false)
   
    useEffect(() => {
        setCarregaLocais(true)
        const collectionRef = collection(database, 'locais')
        const q = query(collectionRef)
        const getLocais = onSnapshot(q, querySnapshot => {
            setLocais(
                querySnapshot.docs.map(doc => ({
                    id: doc.id, 
                    rua: doc.data().rua,
                    cidade: doc.data().cidade,
                    cep: doc.data().cep,
                    latitude: doc.data().latitude,
                    longitude: doc.data().longitude,
                    createdAt: doc.data().createdAt
                }))
            )
        })
        setCarregaLocais(false)
        return getLocais
       }, [])

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
           
            <ScrollView contentContainerStyle={{
                paddingBottom: 64
            }}>
             <Text style={styles.headerText}>Consultas</Text>           
            {carregaLocais && 
            <ActivityIndicator size="large"
            color='#FFF'/>}
            
            <TextInput
                placeholder='🔎Filtrar...'
                autoFocus
                placeholderTextColor='#fff'
                style={styles.headerText}
    
    onChangeText={(text)=> setBusca(text)}
    />

            {/*<Text>{JSON.stringify(locais)}</Text>*/} 
            {
            locais
            .filter((local) =>
            local.cidade.toLocaleLowerCase()
               .includes(busca.toLocaleLowerCase()))
            .map(dadolocal => 
            <Local key={dadolocal.id} {...dadolocal} />)           
            }
            
         </ScrollView>
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
        marginBottom: 8,
        alignSelf: 'center'
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