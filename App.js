import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, FlatList, TextInput } from 'react-native-web';
import styles from './style.js';
import { useEffect, useState } from 'react';

export default function App() {
  const sortedNum = "12345";
  const [TriedNum, setTriedNum] = useState([]);

  useEffect(() => {
    console.log(TriedNum)
  });

  const Row = ({sortedNum}) => {

  }

  const Input = () => (
      <View style={styles.input}>   
        <TextInput onChangeText={(valor) => {setTriedNum([...TriedNum, valor])}}
          maxLength={1}
          style={{height: '100%', fontSize: 40, textAlign: 'center'}}
          />
      </View>
  );


  return (
    <View style={styles.main}>

      <FlatList
        contentContainerStyle={styles.fila}
        data={sortedNum}
        renderItem={() => <Input/>}
      />

    <Pressable  style={styles.button}>oi</Pressable>

      <StatusBar style="auto" />
    </View>
  );
}