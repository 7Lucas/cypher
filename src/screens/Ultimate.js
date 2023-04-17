import React from 'react';
import * as Location from 'expo-location' // Imporatação do Expo Location para obter a localização "Bruta" do usuário (Latitude/Longitude).
import { useNavigation } from '@react-navigation/native' 
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function Ultimate(){
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

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
          <Text style={styles.headerText}>Rua: {endereco.logradouro}</Text>
          <Text style={styles.headerText}>Cidade: {endereco.cidade}</Text>
          <Text style={styles.headerText}>CEP: {endereco.postalCode}</Text>
        </View>
      ) : (
        <Text style={styles.text}>Obtendo endereço...</Text>
      )}

      {location ? (
        <View style={styles.content}>
          <Text style={styles.headerText}>Latitude: {location.coords.latitude}</Text>
          <Text style={styles.headerText}>Longitude: {location.coords.longitude}</Text>
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
});
