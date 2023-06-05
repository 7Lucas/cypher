import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { database, auth } from '../../config/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import moment from 'moment'
const hoje = moment()


export default function EditLocal({ route }) {
    const navigation = useNavigation()
    const [editarLocal, setEditarLocal] = 
          useState(route.params)

    const validaLocal = async () => {
        if(editarLocal.rua === ''){
            Alert.alert('⚠ Atenção',
            'O campo rua é obrigatório')
            alert('O campo rua é obrigatório')
            return
        }
        if(editarLocal.cidade === ''){
          Alert.alert('⚠ Atenção',
          'O campo cidade é obrigatório')
          alert('O campo cidade é obrigatório')
          return
        }
        if(editarLocal.cep === ''){
          Alert.alert('⚠ Atenção',
          'O campo cep é obrigatório')
          alert('O cep rua é obrigatório')
          return
        }
        const docRef = doc(database, 'locais',
        editarLocal.id)

        updateDoc(docRef, {
            rua: editarLocal.rua,
            cidade: editarLocal.cidade,
            cep: editarLocal.cep,          
            updateAt: hoje.format()   
        })
            navigation.goBack()
    } 
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Alterar local 
            </Text>
            
             <TextInput
                style={styles.input}
                placeholder='Rua'
                value={editarLocal.rua}
                keyboardType='default'                
                onChangeText={(text) => setEditarLocal(
                    { ...editarLocal, rua: text })}
            />
            
            <TextInput
                style={styles.input}
                placeholder='Cidade'
                value={editarLocal.cidade}
                keyboardType='default'                
                onChangeText={(text) => setEditarLocal(
                    { ...editarLocal, cidade: text })}
            />

            <TextInput
                style={styles.input}
                placeholder='CEP'
                value={editarLocal.cep}
                keyboardType='default'                
                onChangeText={(text) => setEditarLocal(
                    { ...editarLocal, cep: text })}
            />

            <Pressable onPress={validaLocal} style={styles.botao}>
                <Text styles={styles.textoBotao}>Alterar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#FFF',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
         fontWeight: '700'
    },
    input: {
        width: '90%', 
        padding: 8, 
        marginVertical: 4,
        borderWidth: 1, 
        borderColor: '#DDD', 
        borderRadius: 8
    },
    botao: {
        borderRadius: 4,
        padding: 16,
        marginTop: 8
    },
    textoBotao: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
})