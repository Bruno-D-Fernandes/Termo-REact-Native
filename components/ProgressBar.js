import { View } from "react-native";
import { styled } from "nativewind";

const ProgressBar = ({ currentAttempts, maxAttempts }) => {
  const progressHeight = (currentAttempts / maxAttempts) * 100;

  return (
    <View className="w-2.5 h-4/5 bg-gray-700 absolute left-5 bottom-10 rounded-md overflow-hidden"> 
      <View className="w-full bg-blue-400 absolute bottom-0" style={{ height: `${progressHeight}%` }} />
    </View>
  );
};

export default ProgressBar;
