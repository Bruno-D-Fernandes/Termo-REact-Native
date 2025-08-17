import { View, TextInput } from 'react-native';
import styles from '../style.js';
import Input from './Input.js';
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

export default Row;