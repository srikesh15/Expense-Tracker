import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTransactionStore from '../store/useTransactionStore';
import { getCategoryByKey } from '../constants/Categories';

export default function TransactionDetailScreen({ navigation, route }) {
  const transaction = route.params.transaction;
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  const category = getCategoryByKey(transaction.category);

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTransaction(transaction.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>
          {category.icon} {category.label}
        </Text>
        <Text style={{ fontSize: 14, color: '#888', marginTop: 4 }}>
          {transaction.date}
        </Text>
      </View>

      <View style={{ padding: 16, borderWidth: 0.5, borderRadius: 8, marginBottom: 16 }}>
        <Row label="Amount" value={`₹${transaction.amount}`} />
        <Row label="Type" value={transaction.type} />
        <Row label="Note" value={transaction.note || '—'} />
        <Row label="Category" value={category.label} />
      </View>

      <TouchableOpacity
        onPress={handleDelete}
        style={{
          backgroundColor: '#fee2e2',
          padding: 14,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#dc2626', fontWeight: '500' }}>Delete Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 12,
          padding: 14,
          borderRadius: 8,
          alignItems: 'center',
          borderWidth: 0.5,
        }}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

function Row({ label, value }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 0.5, borderColor: '#eee' }}>
      <Text style={{ color: '#888' }}>{label}</Text>
      <Text style={{ fontWeight: '500' }}>{value}</Text>
    </View>
  );
}