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

  const totalIncome = monthlyTransactions.filter((i) => i.type === 'income').reduce((acc,n) => n.amount+acc,0);
  const totalExpense = monthlyTransactions.filter((j) => j.type === 'expense').reduce((acc,n) => n.amount+acc,0);
  const totalBalance = totalIncome - totalExpense ;

  console.log(monthlyTransactions);

  return (
    <SafeAreaView style={{ flex: 1,}}>
      <Text style={{fontSize:20, fontWeight:'600'}}> This Month Expenses</Text>

      <View style={{flex:1, alignItems:'center',}}>
        <Text style={{fontSize:16,fontWeight:'500'}}> {monthName} {year}</Text>
        <Text>Total Income : {totalIncome}</Text>
        <Text>Total expenses : {totalExpense}</Text>
        <Text>Total Balance : {totalBalance}</Text>
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
              style={{borderWidth:1,marginBottom:20}}>
          <Text style={{fontSize:16}}> Add Transaction </Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}


