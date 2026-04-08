import { View, Text } from 'react-native';
import {useState} from 'react';

export default function HomeScreen() {

  const [selectedDate,setSelectedDate] = useState(new Date());

  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
    </View>
  );
}