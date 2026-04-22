import { View, Text,TextInput,TouchableOpacity } from 'react-native';
import {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {CATEGORIES} from '../constants/Categories';
import useTransactionStore from '../store/useTransactionStore';




export default function AddTransactionScreen({navigation}) {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
 
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  return (

    <SafeAreaView style={{ flex: 1,}}>
      <Text style={{fontSize:20,fontWeight:'600'}}>Add Transactions</Text>

      <View style={{flex:1,alignItems:'center'}}>
        <Text style={{fontSize:16,fontWeight:'500'}}>Amount</Text>
        <TextInput style={{borderWidth:1,width:'50%',marginBottom:20}}
                  onChangeText={(text) => setAmount(text)}
                  value={amount}/>

        <Text style={{fontSize:16,fontWeight:'500'}}>Note</Text>
        <TextInput style={{borderWidth:1,width:'50%',marginBottom:20}}
                    onChangeText={(text) => setNote(text)}
                    value={note}/>

        <Text style={{fontSize:16}}> Select Type : </Text>
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
        
        <Text style={{fontSize:16}}> Select Category : </Text>
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
              onPress={()=>{
                    addTransaction({
                        amount : Number(amount),
                        note,
                        type,
                        category,
                        date : new Date().toISOString().split('T')[0],
                      });
                    // navigation.goBack();
                  }
              }
                          style={{borderWidth:1,marginTop:50}}>
          <Text style={{fontSize:16}}> Save </Text>
        </TouchableOpacity>
        <TouchableOpacity
                  onPress={()=>navigation.goBack()}
                  style={{borderWidth:1,marginTop:200}}>
          <Text style={{fontSize:16}}> Back </Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}