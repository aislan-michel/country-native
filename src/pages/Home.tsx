import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Platform, Alert, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';
import {ICountry} from "../interfaces/ICountry";
import {Delete} from "../components/buttons/Delete";
import {Add} from "../components/buttons/Add";
import {IsNullOrEmpty} from "../validations/IsNullOrEmpty";

export function Home() {
    const storage: string = 'countries:storage';
    
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const [countries, setCountries] = useState<ICountry[]>([]);

    useEffect(() => {
        async function loadStorage(){
            const storagedCountries = await AsyncStorage.getItem(storage);

            if(storagedCountries){
                setCountries(JSON.parse(storagedCountries));
            }
        }

        loadStorage();
    }, []);

    useEffect(() => {
        async function removeAll(){
            await AsyncStorage.removeItem(storage);
        }

        removeAll();
    }, [countries]);

    useEffect(() => {
        async function saveStorage(){
            await AsyncStorage.setItem(storage, JSON.stringify(countries));
        }

        saveStorage();
    }, [countries]);
    
    function handleAddNewCountry():void {
        if(!validations()){
            return;
        }
        
        const data: ICountry = {
            code: code,
            name: name
        }

        setCountries([...countries, data]);

        setCode('');
        setName('');
    }
    
    function handleRemoveCountry(code: string):void {
        setCountries(countries.filter(c => c.code !== code));
    }
    
    function codeExists():boolean {
        return countries.filter(c => c.code === code).length > 0;
    }
    
    function validations():boolean {
        const title: string = 'oh no...';
        const messages: string[] = [];
        
        if(codeExists()){
            messages.push('code already exists');
            setCode('');
        }
        
        if(IsNullOrEmpty(code)){
            messages.push('code is empty');
        }
        
        if(IsNullOrEmpty(name)){
            messages.push('name is empty');
        }
        
        if(messages.length > 0){
            Alert.alert(title, messages.join('\n'));
            return false;
        }
        
        return true;
    }
    
    return (
        <>            
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to your countries list  🇧🇷 </Text>

                <TextInput value={code} placeholder={'code'} placeholderTextColor={'#555'} style={styles.input}
                           onChangeText={value => setCode(value)} keyboardType={"phone-pad"} />

                <TextInput value={name} placeholder={'name'} placeholderTextColor={'#555'} style={styles.input}
                           onChangeText={value => setName(value)} />

                <Add onPress={handleAddNewCountry} />

                <DataTable style={styles.tableContainer}>
                    <DataTable.Header>
                        <DataTable.Title>
                            <Text style={styles.tableItem}>
                                Code
                            </Text>
                        </DataTable.Title>
                        
                        <DataTable.Title>
                            <Text style={styles.tableItem}>
                                Name
                            </Text>
                        </DataTable.Title>
                        
                        <DataTable.Title>
                            <Text style={styles.tableItem}>
                                
                            </Text>
                        </DataTable.Title>
                    </DataTable.Header>
                    
                    <ScrollView>
                        {
                            countries && countries.length > 0 ?
                                countries.map(item => {
                                    return (
                                        <DataTable.Row key={item.code}>
                                            <DataTable.Cell>
                                                <Text style={styles.tableItem}>
                                                    {item.code}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                                <Text style={styles.tableItem}>
                                                    {item.name}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                                <Delete onPress={() => handleRemoveCountry(item.code)} />
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    )
                                })
                                :
                                false
                        }
                    </ScrollView>
                </DataTable>
                
                <Text style={styles.totalCount}>total of countries: {countries.length}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 70
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1f1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 12,
        marginTop: 30,
        borderRadius: 7
    },
    tableContainer: {
        paddingTop: 20,
        padding: 15,
        borderRadius: 7,
        marginTop: 30
    },
    tableItem: {
        fontSize: 16,
        color: '#fff'
    },
    totalCount: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 20
    }
});