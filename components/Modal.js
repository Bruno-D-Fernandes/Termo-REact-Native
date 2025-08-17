import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';

const GameModal = ({ visible, onClose, title, message, buttonText = 'OK' }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-xl p-6 min-w-[250px] items-center">
          <Text className="text-xl font-bold mb-3">{title}</Text>
          <Text className="text-base mb-5 text-center">{message}</Text>
          <Pressable className="bg-green-400 rounded px-6 py-2" onPress={onClose}>
            <Text className="text-white font-bold text-base">{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default GameModal;
