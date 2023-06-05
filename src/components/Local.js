import React from 'react'
import { View, Text, StyleSheet, Platform, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { deleteDoc, doc } from 'firebase/firestore'
import { database } from '../../config/firebase'
import { useNavigation } from '@react-navigation/native' 
import { useSafeAreaInsets } from 'react-native-safe-area-context' 

export default function Local({...local}) {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    const onDelete = () => {
        if (Platform.OS !== 'web') {
            Alert.alert('Confirma a exclusão?',
                'Confirma a exclusão deste registro?\nA operação não poderá ser desfeita',
                [
                    { text: 'Não', style: 'cancel' },
                    {
                        text: 'Sim', onPress: () => {
                            const docRef = doc(database, 'locais', local.id)
                            deleteDoc(docRef)
                        }
                    }
                ]
            )
        } else {
            let confirma = confirm('Confirma a exclusão?')
            if (confirma) {
                const docRef = doc(database, 'locais', local.id)
                deleteDoc(docRef)
            }
        }

    }

    return (
        <View style={styles.localContainer}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={styles.cidade}>{local.cidade}</Text>
                <MaterialCommunityIcons name="circle-edit-outline" size={32}
                    onPress={() =>
                        navigation.navigate('EditLocal', local)}
                    color='#008000' />
                <MaterialCommunityIcons name="trash-can" size={32}
                    onPress={onDelete}
                    color='#ff0000' />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start'
            }}>
                <Text style={{ fontSize: 24, marginRight: 8 }}>
                    {local.rua}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    localContainer: {
        padding: 8,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8
    },
    cidade: {
        fontSize: 24, marginRight: 8, fontWeight: 'bold'
    }

})