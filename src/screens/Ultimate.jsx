import React, { useState } from 'react'
import * as Location from 'expo-location' // Imporatação do Expo Location para obter a localização "Bruta" do usuário (Latitude/Longitude).
import { useNavigation } from '@react-navigation/native' 
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import { database, auth } from '../../config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import moment from 'moment'
const hoje = moment()

export default function Ultimate(){
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    const [isChecked, setIsChecked] = useState(false);
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
      setNovoLocal({ ...novoLocal, latitude: location.coords.latitude, longitude: location.coords.longitude});
      
    };

    const [novoLocal, setNovoLocal] = useState({
      rua: '',
      cidade: '',
      cep: '',
      latitude: '',
      longitude: '',
      createdAt: hoje.format(),
      usuarioInclusao: auth.currentUser.uid
  })
  const validaLocal = async () => {
    if(novoLocal.rua === ''){
        Alert.alert('⚠ Atenção',
        'O campo rua é obrigatório')
        alert('O campo rua é obrigatório')
        return
    }
    if(novoLocal.cidade === ''){
      Alert.alert('⚠ Atenção',
      'O campo cidade é obrigatório')
      alert('O campo cidade é obrigatório')
      return
    }
    if(novoLocal.cep === ''){
      Alert.alert('⚠ Atenção',
      'O campo cep é obrigatório')
      alert('O cep rua é obrigatório')
      return
    }
    
    //Lógica para salvar no Firebase
    const docRef = await addDoc(
        collection(database, 'locais'), novoLocal)
        navigation.goBack()
}

    const [location, setLocation] = React.useState(null); // Para facilitar a identificação do item Location do Expo preservei os nomes
    const [endereco, setendereco] = React.useState(null);

    const ObterApi = async (cep) => { // Obter API recebe um array com as informações solicitadas a API, neste caso Cidade e Logradouro(Rua)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`); // O CEP obtido através do location (postalCode) é utilizado como parametro de consulta a API viacep.com.br
      if (response.ok) {
        const data = await response.json();
        if (data.erro) {
          // Caso o CEP não seja encontrado
          setendereco(null);
        } else {
          // Atualiza as propriedades com as informações obtida através do CEP
          setendereco((prevendereco) => ({
            ...prevendereco,
            cidade: data.localidade,
            logradouro: data.logradouro,
          }));
        }
      } else {
        // Caso haja algum erro na resposta da API
        setendereco(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        const endereco = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setendereco(endereco[0]); // Usando o primeiro resultado do array de endereços
        ObterApi(endereco[0].postalCode); // Busca o endereço com base no CEP
      }
    };
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/ue.png')}/>
      {endereco ? (
        <View style={styles.content}>
          <Text style={styles.headerText}>Sei exatamente onde você está!</Text>
          <TextInput style={styles.headerText} defaultValue={endereco.logradouro} onChangeText={(text) => setNovoLocal({ ...novoLocal, rua: text })} />
          <TextInput style={styles.headerText} defaultValue={endereco.cidade} onChangeText={(text) => setNovoLocal({ ...novoLocal, cidade: text })}/>
          <TextInput style={styles.headerText} defaultValue={endereco.postalCode} onChangeText={(text) => setNovoLocal({ ...novoLocal, cep: text })}/>
        </View>
      ) : (
        <Text style={styles.text}>Obtendo endereço...</Text>
      )}

      {location ? (
        <View style={styles.content}>
         

          <View style={styles.checkboxContainer}>
          <Text style={styles.headerText}>Exportar Latitude/Longitude?</Text>
          <Text style={styles.headerText}>   {location.coords.latitude}</Text> 
          <Text style={styles.headerText}>   {location.coords.longitude}</Text>
            <TouchableOpacity
                style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
                onPress={toggleCheckbox}
              >
                {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={validaLocal} >
              <Text style={styles.buttonText}>Salvar Localização</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.text}>Obtendo localização...</Text>
      )}
    </View>
  );
};


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
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 200,
  },
  checkedCheckbox: {
    backgroundColor: '#000',
  },
  checkmark: {
    color: '#fff',
  },
});
