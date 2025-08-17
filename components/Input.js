import { View, TextInput } from 'react-native';
import styles from '../style.js';

const Input = ({ value, onChangeText, inputColor, inputRefCallback }) => {
  return(
      <View style={styles.input}>   
        <TextInput 
          onChangeText={onChangeText}
          value={value}
          keyboardType="numeric"
          maxLength={1}
          className={`h-full w-full text-[40px] text-center ${inputColor ? inputColor : 'bg-[#116ABD]/20'}`}
          ref={inputRefCallback}
        />
      </View>
  );
};

export default Input;