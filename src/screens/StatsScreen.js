import { View, Text } from 'react-native';
import {useState} from 'react';
import useTransactionStore from '../store/useTransactionStore';


export default function StatsScreen() {
  const [selectedDate,setSelectedDate] = useState(new Date());

  const transactions = useTransactionStore((state) => state.transactions);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const monthName = selectedDate.toLocaleString('default', { month: 'long' });

  const monthlyTransactions = transactions.filter((tx) => {
    const d = new Date(tx.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        {monthName} {year}
      </Text>
    </View>
  );
}
    