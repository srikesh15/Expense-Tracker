import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import {useState} from 'react';
import useTransactionStore from '../store/useTransactionStore';



export default function HomeScreen({navigation}) {
  
  const [selectedDate,setSelectedDate] = useState(new Date());

  const getMonthly = useTransactionStore((state)=> state.getMonthly);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const monthName = selectedDate.toLocaleString('default', { month: 'long' });


  const transactions = getMonthly(year,month);

  console.log(transactions);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> {monthName} {year}</Text>
      
      <FlatList
              data={transactions}
              keyExtractor={(item)=>item.id}
              renderItem={({item}) => (
                <View>
                  <Text> {item.note} </Text>
                  <Text> {item.amount} </Text>
                </View>
              )}
              ListEmptyComponent={<Text>No transactions this month</Text>}
              />
      <TouchableOpacity
            onPress={()=>navigation.navigate('AddTransaction')}
            style={{borderWidth:1}}>
        <Text> Add Transaction </Text>
      </TouchableOpacity>
    </View>
  );
}


