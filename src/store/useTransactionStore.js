import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';


const useTransactionStore = create(
    persist(
        (set,get) => ({
            transactions:[], // my list of transactions

            addTransaction : (data) =>{
                const Newtx = {
                    id : uuidv4(),
                    createdAt: Date.now(),
                    ...data
                };
            
                set((state) =>({
                    transactions: [Newtx, ...state.transactions]
                }));
            },


            deleteTransaction : (id) =>{
                set((state) => ({
                    transactions: state.transactions.filter((tx) => tx.id !== id)
                }));
            },


            updateTransaction : (data,id)=>{
                set((state) =>({
                    transactions: state.transactions.map((tx.id === id)? {...tx, ...data} : tx)
                }));
            },


            getMonthly : (month, year) => {
                return get().transactions.filter((tx) => {
                    const d = new Date(tx.date);
                    return(
                        d.getFullYear() === year && d.getMonth === month
                    );
                });
            }
        }),
        {
            name: 'transactions-storage',
            storage: createJSONStorage(()=>AsyncStorage)
        }
    )
);

export default useTransactionStore;