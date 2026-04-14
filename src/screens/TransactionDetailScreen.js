import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTransactionStore from '../store/useTransactionStore';

export default function TransactionDetailScreen({navigation, route}) {
  const transaction = route.params.transaction;
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);
  console.log(transaction);
  return (
    <SafeAreaView>
      <Text>{transaction.note}</Text>
      <Button title='delete' onPress={() => {
        deleteTransaction(transaction.id);
        navigation.goBack();
      }}/>
    </SafeAreaView>
  );
}
