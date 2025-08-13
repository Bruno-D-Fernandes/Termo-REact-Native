import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-web';
import styles from './style.js';
import { useRef, useState } from 'react';

export default function App() {

const Input = ({ value, onChangeText, inputColor, inputRef }) => {
  return(
      <View style={styles.input}>   
        <TextInput 
          onChangeText={onChangeText}
          value={value}
          keyboardType="numeric"
          maxLength={1}
          style={{height: '100%', fontSize: 40, textAlign: 'center', ...inputColor}}
          ref={inputRef}
        />
      </View>
  );
}

const Row = ({ guess, colors }) => {
  return (
    <View style={styles.fila}>
      {guess.split('').map((char, index) => (
        <Input
          key={index}
          value={char}
          onChangeText={() => {}}
          inputColor={colors[index]}
          editable={false}
        />
      ))}
    </View>
  );
}

function submitGuess() {
  if (currentGuess.length !== sortedNum.length) { // Arruma aqui Bruno do futuro
    alert('Preencha todos os campos');
    return;
  }

  const colors = [];
  const sortedNumArray = sortedNum.split('');

  currentGuess.forEach((value, index) => {
    if(value === sortedNumArray[index]){
      colors[index] = {backgroundColor: 'green'};
    } else if(sortedNumArray.includes(value)){
      colors[index] = {backgroundColor: 'yellow'};
    } else {
      colors[index] = {backgroundColor: 'red'};
    }
  });

  setPastGuesses(prevGuesses => [...prevGuesses, { guess: currentGuess.join(''), colors }]);
  setCurrentGuess(Array(sortedNum.length).fill(''));
  setInputColors(Array(sortedNum.length).fill({})); 
}

const sortedNum = "12345";
const [currentGuess, setCurrentGuess] = useState(Array(sortedNum.length).fill(''));
const [inputColors, setInputColors] = useState(Array(sortedNum.length).fill({}));
const [pastGuesses, setPastGuesses] = useState([]);
const inputRefs = useRef([]);

return (
  <View style={styles.main}>

    {pastGuesses.map((item, index) => (
      <Row key={index} guess={item.guess} colors={item.colors} />
    ))}

    <FlatList
      contentContainerStyle={styles.fila}
      data={currentGuess}
      renderItem={({ item, index }) => {   
        return (
          <Input 
            value={item}
            onChangeText={(valor) => {
              const newGuess = [...currentGuess];
              newGuess[index] = valor;
              setCurrentGuess(newGuess);
              if(inputRefs.current[index + 1]){inputRefs.current[index + 1].focus();}
            }}
            inputColor={inputColors[index]} 
            inputRef={(element) => { 
              inputRefs.current[index] = element;
            }}
          />
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />



    <Pressable  style={styles.button} onPress={submitGuess}><Text>Tentar</Text></Pressable>

    <StatusBar style="auto" />
  </View>
);
}
