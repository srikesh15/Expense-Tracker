import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTransactionStore from '../store/useTransactionStore';
import useSettingsStore from '../store/useSettingsStore';

export default function SettingsScreen() {
  const { currency, setCurrency, theme, setTheme } = useSettingsStore();
  const transactions = useTransactionStore((state) => state.transactions);

  const totalTransactions = transactions.length;

  const currencies = ['₹', '$', '€', '£'];
  const themes = ['light', 'dark', 'system'];

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <SafeAreaView>
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 24 }}>
          Settings
        </Text>

        {/* Currency */}
        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 12 }}>
          Currency
        </Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
          {currencies.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setCurrency(c)}
              style={{
                borderWidth: currency === c ? 2 : 0.5,
                borderColor: currency === c ? '#6366f1' : '#e5e7eb',
                borderRadius: 8,
                padding: 12,
                minWidth: 50,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: currency === c ? '#6366f1' : '#000',
                  fontWeight: currency === c ? '600' : '400',
                }}
              >
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Theme */}
        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 12 }}>
          Theme
        </Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
          {themes.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTheme(t)}
              style={{
                borderWidth: theme === t ? 2 : 0.5,
                borderColor: theme === t ? '#6366f1' : '#e5e7eb',
                borderRadius: 8,
                padding: 12,
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: theme === t ? '#6366f1' : '#000',
                  fontWeight: theme === t ? '600' : '400',
                  textTransform: 'capitalize',
                }}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 12 }}>
          Data
        </Text>
        <View
          style={{
            padding: 16,
            borderWidth: 0.5,
            borderRadius: 8,
            borderColor: '#e5e7eb',
            marginBottom: 16,
          }}
        >
          <Row label="Total Transactions" value={String(totalTransactions)} />
        </View>

        {/* Clear all data */}
        <ClearDataButton />

      </SafeAreaView>
    </ScrollView>
  );
}

function Row({ label, value }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
      <Text style={{ color: '#888' }}>{label}</Text>
      <Text style={{ fontWeight: '500' }}>{value}</Text>
    </View>
  );
}

function ClearDataButton() {
  const clearAll = useTransactionStore((state) => state.clearAll);

  return (
    <TouchableOpacity
      onPress={clearAll}
      style={{
        backgroundColor: '#fee2e2',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 32,
      }}
    >
      <Text style={{ color: '#dc2626', fontWeight: '500' }}>
        Clear All Transactions
      </Text>
    </TouchableOpacity>
  );
}