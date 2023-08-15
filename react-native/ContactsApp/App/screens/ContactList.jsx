import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ToastAndroid,
  Modal,
  Button,
  Alert
} from 'react-native';
import {FAB, IconButton, TextInput} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
import {useIsFocused} from '@react-navigation/native';
import {createTable, deleteContact, updateFavourite} from '../Database/Db';

let db = openDatabase({name: 'ContactDatabase.db'});

export default function ContactList({navigation}) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search,setSearch]=useState([])
  const [filterData,setFilterData]=useState([])

  const isFocused = useIsFocused();

  const [visible, setVisible] = useState(false);



  
  const searchFilter=(searchText)=> {
    const nameRegx=/^[A-Za-z\s]*$/;
    const mobileRegex=/^[0-9\b]+$/;
    let newData = [];
    if (searchText && nameRegx.test(searchText)) {
      newData = search.filter((item)=> {
        const itemName = item.name.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemName.includes(textData);
      });
      setFilterData([...newData]);
    }

      else if(searchText && mobileRegex.test(searchText))
      {
        newData = search.filter((item)=> {
          const itemMobile = item.mobile;
          const textData = searchText;
          return itemMobile.includes(textData);
        });
        setFilterData([...newData]);
      }
     
     else {
      setFilterData([...search]);
    }
  }

  const onDelete = mobile => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this contact',
        [
        {text: 'Cancel', onPress: () =>console.log('cancel'), style: 'cancel'},
        {text: 'OK', onPress: () =>{
          deleteContact(mobile);
          getContacts();
          ToastAndroid.showWithGravity(
            'Successfully Deleted',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }}
       ])
  };
  const getContacts = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM contacts',
        [],
        (sqlTxn, res) => {
          if (res.rows.length > 0) {
            let results = [];
            for (let i = 0; i < res.rows.length; i++) {
              let item = res.rows.item(i);
              results.push({
                id: item._id,
                mobile: item.mobile,
                name: item.name,
                landline: item.landline,
                imagepath: item.imagepath,
                favourite: item.favourite,
              });
            }
            setSearch(results)
            // setfilterData(results)
            let sectionsMap = results.reduce((acc, item) => {
              const [firstName] = item.name.split(' ');

              return Object.assign(acc, {
                [firstName[0]]: [...(acc[firstName[0]] || []), item],
              });
            }, {});
            setContacts(
              Object.entries(sectionsMap)
                .map(([letter, items]) => ({
                  letter,
                  items,
                }))
                .sort((a, b) => a.letter.localeCompare(b.letter)),
            );
          } else {
            setContacts([]);
          }
        },
        error => {
          console.log('error on GET.... ', error);
        },
      );
    });
  };
  const onClose=()=>
  {
    setVisible(false)
    setFilterData([])
  }

  const onFavourite = (id, favourite) => {
    if (favourite === 0) updateFavourite(id, 1);
    if (favourite === 1) updateFavourite(id, 0);
    getContacts();
  };

  useEffect(() => {
    if (isFocused) {
      createTable();
      getContacts();
      setLoading(true);
    }
  }, [isFocused]);

  if (!loading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  if (contacts.length === 0)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Contact Lists</Text>
          <Text style={styles.cardTitle}>No contacts availables</Text>
          <FAB
            icon="plus"
            style={styles.add}
            onPress={() => navigation.navigate('AddContact')}
            variant="surface"
          />
        </View>
      </View>
    );
  return (
    <SafeAreaView style={{backgroundColor: '#f2f2f2'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Contact Lists</Text>
        </View>
        {contacts.map(({letter, items}) => (
          <View style={styles.section} key={letter}>
            <Text style={styles.sectionTitle}>{letter}</Text>
            <View style={styles.sectionItems}>
              {items.map(({id, imagepath, name, mobile, favourite}, index) => {
                return (
                  <View key={index} style={styles.cardWrapper}>
                    <View style={styles.card}>
                      {imagepath ? (
                        <Image
                          alt=""
                          resizeMode="cover"
                          source={{uri: imagepath}}
                          style={styles.cardImg}
                        />
                      ) : (
                        <View style={[styles.cardImg, styles.cardAvatar]}>
                          <Text style={styles.cardAvatarText}>{name[0]}</Text>
                        </View>
                      )}
                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{name}</Text>
                        <Text style={styles.cardPhone}>{mobile}</Text>
                      </View>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <IconButton
                          icon="star"
                          containerColor={favourite == 0 ? 'white' : 'yellow'}
                          mode="outlined"
                          size={20}
                          onPress={() => onFavourite(id, favourite)}
                        />
                        <IconButton
                          containerColor="lightgreen"
                          icon="delete"
                          mode="outlined"
                          size={20}
                          onPress={() => onDelete(mobile)}
                        />
                        <IconButton
                          containerColor="skyblue"
                          icon="account-edit"
                          mode="outlined"
                          size={20}
                          onPress={() =>
                            navigation.navigate('UpdateContact', {id})
                          }
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
      <FAB
        icon="search-web"
        style={styles.search}
        onPress={() => setVisible(true)}
        variant="surface"
      />
      <FAB
        icon="plus"
        style={styles.add}
        onPress={() => navigation.navigate('AddContact')}
        variant="surface"
      />
      <Modal transparent={true} visible={visible} animationType="slide">
        <View style={styles.modal}>
          <View
            style={{
              backgroundColor: '#ffffff',
              margin: 50,
              padding: 40,
              borderRadius: 40,
              flex: 1,
            }}>
            <IconButton
              icon="close"
              size={30}
              onPress={onClose}
              style={{    position: 'absolute',
              margin: 24,
              right: 0,}}
            />
            <TextInput label={'Search'} mode="outlined" style={{marginBottom:10,marginTop:30}} onChangeText={(text)=>searchFilter(text)} />
            {
              filterData.map((item,index)=>(
                <View style={{margin:10}} key={index}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardPhone}>{item.mobile}</Text>
                </View>
              ))
            }
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 12,
    paddingLeft: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  sectionItems: {
    marginTop: 8,
  },
  container: {
    paddingVertical: 24,
    paddingRight: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginRight: 'auto',
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardPhone: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#616d79',
    marginTop: 3,
  },
  cardAction: {
    paddingRight: 16,
  },
  search: {
    position: 'absolute',
    margin: 24,
    right: 70,
  },
  add: {
    position: 'absolute',
    margin: 24,
    right: 0,
  },
  modal: {
    backgroundColor: '#0000000aa',
    flex: 1,
  },
});
