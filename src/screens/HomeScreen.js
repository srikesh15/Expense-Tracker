import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTransactionStore from '../store/useTransactionStore';



export default function HomeScreen({navigation}) {
  
  const [selectedDate,setSelectedDate] = useState(new Date());

  // read transactions directly first
  const transactions = useTransactionStore((state) => state.transactions);
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const monthName = selectedDate.toLocaleString('default', { month: 'long' });
  
   // then filter in the component
  const monthlyTransactions = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> {monthName} {year}</Text>
  
      <FlatList
              data={monthlyTransactions}
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


