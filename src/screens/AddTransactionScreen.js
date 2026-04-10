import { View, Text,TextInput,TouchableOpacity } from 'react-native';
import {useState} from 'react';

import {CATEGORIES} from '../constants/Categories';
import useTransactionStore from '../store/useTransactionStore';


export default function AddTransactionScreen({navigation}) {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
 

  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Text>Amount</Text>
      <TextInput style={{borderWidth:1,width:'50%',marginBottom:20}}
                onChangeText={(text) => setAmount(text)}
                value={amount}/>

      <Text>Note</Text>
      <TextInput style={{borderWidth:1,width:'50%',marginBottom:20}}
                  onChangeText={(text) => setNote(text)}
                  value={note}/>

      <Text> Select Type : </Text>
      <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
        <TouchableOpacity onPress={() => setType('expense')}
                          style={{borderWidth: type==='expense' ? 3 : 0.5}}>
            <Text>
              Expense
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType('income')}
                          style={{borderWidth: type==='income' ? 3 : 0.5}}>
            <Text>
              Income
            </Text>
        </TouchableOpacity>
      </View>
      
      <Text> Select Category : </Text>
      <View style={{ flexDirection: 'column', flexWrap: 'wrap', gap: 15 }}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            onPress={() => setCategory(cat.key)}
            style={{ borderWidth: category === cat.key ? 3 : 0.5 }}
          >
            <Text>{cat.icon} {cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
            onPress={()=>addTransaction({
                      amount : Number(amount),
                      note,
                      type,
                      category,
                      date : new Date().toISOString().split('T')[0],

          })}
                        style={{borderWidth:1,marginTop:50}}>
        <Text> Save </Text>
      </TouchableOpacity>
      <TouchableOpacity
                onPress={()=>navigation.goBack()}
                style={{borderWidth:1,marginTop:200}}>
        <Text> Back </Text>
      </TouchableOpacity>
    </View>
  );
}