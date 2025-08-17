import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { FlatList } from 'react-native-web';
import { useEffect, useRef, useState } from 'react';
import GameModal from './components/Modal';


import Input from './components/Input.js';
import Row from './components/Row.js';
import styles from './style.js';


export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const [sortedNum, setSortedNum] = useState(Array(5).fill(''));
  const [currentGuess, setCurrentGuess] = useState(Array(sortedNum.length).fill(''));
  const [inputColors, setInputColors] = useState(Array(sortedNum.length).fill(''));
  const [pastGuesses, setPastGuesses] = useState([]);
  const inputRefs = useRef([]);

  function submitGuess() {
    if(currentGuess.includes('')){
      setModalTitle('Atenção');
      setModalMessage('Preencha todos os campos');
      setModalVisible(true);
      return;
    }

    const colors = [];
    const sortedNumArray = sortedNum.split('');

    currentGuess.forEach((value, index) => {
      if(value === sortedNumArray[index]){
        colors[index] = 'bg-green-500';
      } else if(sortedNumArray.includes(value)){
        colors[index] = 'bg-yellow-500';
      } else {
        colors[index] = 'bg-red-500';
      }
    });

    if (currentGuess.join('') === sortedNum) {
      setModalTitle('Parabéns!');
      setModalMessage('Você acertou o número.');
      setModalVisible(true);
      return;
    }

    if (pastGuesses.length + 1 === 5) {
      setModalTitle('Fim de jogo!');
      setModalMessage(`O número correto era ${sortedNum}.`);
      setModalVisible(true);
      return;
    }

    setPastGuesses(prevGuesses => [...prevGuesses, { guess: currentGuess.join(''), colors }]);
    setCurrentGuess(Array(sortedNum.length).fill(''));
  setInputColors(Array(sortedNum.length).fill('')); 
  }

  useEffect(() => {
    sortNumber();
  }, []);

  function sortNumber() {
    let randomNum = Math.floor(Math.random() * 100000).toString();
    if(randomNum.length < 5){ randomNum = (parseInt(randomNum) * 10).toString()}
    setSortedNum(randomNum);
  }

  return (
    <View style={styles.main}>
      <GameModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        message={modalMessage}
      />

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

