import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTransactionStore from '../store/useTransactionStore';




export default function HomeScreen({navigation}) {
  
  const [selectedDate,setSelectedDate] = useState(new Date());

  const getMonthly = useTransactionStore((state)=> state.getMonthly);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const monthName = selectedDate.toLocaleString('default', { month: 'long' });


  const transactions = getMonthly(month,year);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> {monthName} {year}</Text>
  
      <FlatList
              data={transactions}
              keyExtractor={(item)=>item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={()=>navigation.navigate('TransactionDetail',{transaction:item})}>
                  <Text> {item.note} </Text>
                  <Text> {item.amount} </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text>No transactions this month</Text>}
              />
      <TouchableOpacity
            onPress={()=>navigation.navigate('AddTransaction')}
            style={{borderWidth:1}}>
        <Text> Add Transaction </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


