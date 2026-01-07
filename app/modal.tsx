import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const Modal = () => {
  return (
    <View className="flex-1 p-5 ">
      <View className="gap-2">
        <TextInput
          placeholder="Update your list"
          className="rounded-lg border border-gray-500 px-4 py-3"
        />
        <TouchableOpacity className="rounded-lg bg-blue-500 px-4 py-3">
          <Text className="text-center font-semibold text-white">Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Modal;
