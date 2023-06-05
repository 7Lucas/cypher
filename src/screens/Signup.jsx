import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native' 
import { useSafeAreaInsets } from 'react-native-safe-area-context' 
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';

import { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Signup() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [efetuandoCadastro, setEfetuandoCadastro] = useState(false)

  function handleSignup() {
    if (email === '' || senha === '') {
      Alert.alert('Atenção⚠', 'Informe um email e senha para efetuar o cadastro')
      return
    }
    if (senha.length < 6) {
      Alert.alert('Atenção⚠', 'A senha deve ter no mínimo 6 caracteres')
      return
    }
    setEfetuandoCadastro(true)
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        Alert.alert('Aviso', 'Usuário criado com sucesso! Efetue o login')
        navigation.navigate('Login')
      })
      .catch((error) => {
        Alert.alert('Erro', `Erro ao criar o novo usuário: ${error.message}`)
      })
      .finally(() => {
        setEfetuandoCadastro(false)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/spycam.png')} />
        <Text style={styles.title}>Cypher</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        {efetuandoCadastro && <ActivityIndicator size="large" color="#ff0000" />}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Já é um usuário? Efetue o login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 80,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    marginRight: 264,
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1976d2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    marginTop: 80,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    marginTop: 0,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
