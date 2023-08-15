import {View, StyleSheet, Text, TouchableOpacity,ToastAndroid} from 'react-native';
import {TextInput} from "@react-native-material/core";
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addBuget } from '../Store/Slice/BugetSlice';
const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const [planned, setPlanned] = useState('');
  const [actual, setActual] = useState('');

  const [nameError,setNameError]=useState('');
  const [plannedError,setPlannedError]=useState('');
  const [actualError,setActualError]=useState('');

  const dispatch=useDispatch()


  const plannedValidation=()=>
  {
    const amountRegex=/^[0-9\b]+$/;
    if(planned==='')
    {
      setPlannedError('planned amount is required')
      return true
    }
    else if(planned!=='' && !amountRegex.test(planned))
    {
      setPlannedError('invalid planned amount')
      return true
    }
    else{
      setPlannedError('')
      return false
    }
  }
  const nameValidation=()=>
  {
    
    const nameRegx=/^[A-Za-z\s]*$/;
    if(name==='')
    {
      setNameError('item name is required')
      return true
    }
    else if(name!=='' && !nameRegx.test(name))
    {
      setNameError('invalid item name')
      return true
    }
    else
    {
      setNameError('')
      return false
    }
  }

  const actualValidation=()=>
  {
 const amountRegex=/^[0-9\b]+$/;
    if(actual==='')
    {
      setActualError('actual amount is required')
     return true
    }
    else if(actual!=='' && !amountRegex.test(actual))
    {
      setActualError('invalid actual amount')
      return true
    }
    else
    {
      setActualError('')
      return false
    }
  }

  const saveBuget=()=>
  {
    if(nameValidation() || plannedValidation()|| actualValidation())
    {
      console.log('error')
    }
    else
    {
      dispatch(addBuget({name,planned,actual}))
      ToastAndroid.showWithGravity("Successfully Saved",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM)
      setActual('')
      setName('')
      setPlanned('')
    }

  }

  return (
    <>
   <View style={Instyle.container}>
        <View style={Instyle.inputCtr}>
            <TextInput variant="outlined" 
                      label="Item Name"
                      value={name}  
                      onChangeText={text => setName(text)}  
                      />
             {nameError === '' ? null : (
            <Text style={Instyle.error}>{nameError}</Text>
          )}
        </View>
        <View style={Instyle.inputCtr}>
          <TextInput
            variant="outlined"
            label="Planned Amount"
            value={planned}
            onChangeText={text => setPlanned(text)}
           
          />
          {plannedError === '' ? null : (
            <Text style={Instyle.error}>{plannedError}</Text>
          )}
        </View>
        <View style={Instyle.inputCtr}>
          <TextInput
          variant='outlined'
            label="Actual Amount"
            value={actual}
            onChangeText={text => setActual(text)}
          />
          {actualError === '' ? null : (
            <Text style={Instyle.error}>{actualError}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => saveBuget()}
          style={[Instyle.btn, {backgroundColor: 'blue'}]}
          activeOpacity={0.7}>
          <Text style={Instyle.btnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Instyle.btn, {backgroundColor: 'green'}]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('List')}>
          <Text style={Instyle.btnText}>Show Items</Text>
        </TouchableOpacity>
        <></>
      </View>
    </>
  );
};

const Instyle = StyleSheet.create({
  container: {
    margin: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 45,
    color: 'black',
    fontWeight: '600',
    marginBottom: 35,
  },
  inputCtr: {
    marginBottom: 30,
  },
  btn: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 5,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 25,
  },
  error: {
    color: 'red',
    fontSize: 15,
  },
  modal:
  {
  }
});

export default Home;
