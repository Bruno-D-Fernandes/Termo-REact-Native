import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-web';
import styles from './style.js';
import React, { useEffect, useRef, useState } from 'react';

const Input = ({ value, onChangeText, inputColor, inputRefCallback }) => {
  return(
      <View style={styles.input}>   
        <TextInput 
          onChangeText={onChangeText}
          value={value}
          keyboardType="numeric"
          maxLength={1}
          style={{height: '100%', fontSize: 40, textAlign: 'center', ...inputColor}}
          ref={inputRefCallback}
        />
      </View>
  );
};

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
};

export default function App() {

function submitGuess() {
  if(currentGuess.includes('')){
    alert('Preencha todos os campos');
    return;
  }

  console.log(inputColors)



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

  if (currentGuess.join('') === sortedNum) {
    alert("Parabéns! Você acertou o número.");
    return;
}

if (pastGuesses.length + 1 === 5) {
    alert(`Fim de jogo! O número correto era ${sortedNum}.`);
    return;
}



  setPastGuesses(prevGuesses => [...prevGuesses, { guess: currentGuess.join(''), colors }]);
  setCurrentGuess(Array(sortedNum.length).fill(''));
  setInputColors(Array(sortedNum.length).fill({})); 


}

useEffect(() => {
  sortNumber();
}, []);

function sortNumber() {
  let randomNum = Math.floor(Math.random() * 100000).toString();
  if(randomNum.length < 5){ randomNum = (parseInt(randomNum) * 10).toString()}
  setSortedNum(randomNum);
  
}

const [sortedNum, setSortedNum] = useState(Array(5).fill(''));
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
              if (index < sortedNum.length - 1 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
              }
            }}
            inputColor={inputColors[index]} 
            inputRefCallback={(element) => { 
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

