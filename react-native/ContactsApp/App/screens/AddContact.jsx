import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {TextInput, Button} from '@react-native-material/core';
import {useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {insertContact} from '../Database/Db';

const AddContact = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [landline, setLandline] = useState('');
  const [imagePath, setImagePath] = useState('');

  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [landlineError, setLandlineError] = useState('');

  const ImagePicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(options, response => {
      if (!response.didCancel) setImagePath(response.assets[0].uri);
    });
  };

  const saveContact = () => {
    const nameRegx = /^[A-Za-z\s]*$/;
    const mobileRegex = /^[0-9\b]+$/;
    if (
      mobile !== '' &&
      mobileRegex.test(mobile) &&
      mobile.length === 10 &&
      name !== '' &&
      nameRegx.test(name) &&
      landline !== '' &&
      mobileRegex.test(landline)
    ) {
      insertContact(mobile, name, landline, imagePath);
      setName('');
      setMobile('');
      setLandline('');
      setImagePath('');
      ToastAndroid.showWithGravity(
        'Successfully Saved',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      setLandlineError('')
      setMobileError('')
      setNameError('')
    } else {
      if (name === '') setNameError('this field is required');
      if (name !== '' && !nameRegx.test(name)) setNameError('Invaild name');
      if(name !== '' && nameRegx.test(name)) setNameError('');
      if (mobile === '') setMobileError('this field is required');
      if (mobile !== '' && !mobileRegex.test(mobile))
        setMobileError('Invalid moblie number');
      if (
        mobile !== '' &&
        mobileRegex.test(mobile) &&
        (mobile.length > 10 || mobile.length < 10)
      )
        setMobileError('Invalid moblie number');
        if (
          mobile !== '' &&
          mobileRegex.test(mobile) &&
          (mobile.length===10)
        )
          setMobileError('');
      if (landline === '') setLandlineError('this field is required');
      if (landline !== '' && !mobileRegex.test(landline))
        setLandlineError('Invalid landline number');

      if(landline !== '' && mobileRegex.test(landline))
      setLandlineError('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => ImagePicker()}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {imagePath === '' ? (
          <Avatar.Icon size={100} icon="camera" style={{margin: 16}} />
        ) : (
          <Image
            resizeMode="cover"
            source={{uri: imagePath}}
            style={styles.img}
          />
        )}
      </TouchableOpacity>

      <View style={{margin: 16}}>
        <TextInput
          variant="outlined"
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        {nameError === '' ? null : (
          <Text style={{color: 'red', margin: 0}}>{nameError}</Text>
        )}
      </View>

      <View style={{margin: 16}}>
        <TextInput
          variant="outlined"
          label="mobile"
          value={mobile}
          onChangeText={text => setMobile(text)}
        />
        {mobileError === '' ? null : (
          <Text style={{color: 'red', margin: 0}}>{mobileError}</Text>
        )}
      </View>
      <View style={{margin: 16}}>
        <TextInput
          variant="outlined"
          label="Landline"
          value={landline}
          onChangeText={text => setLandline(text)}
        />
        {landlineError === '' ? null : (
          <Text style={{color: 'red', margin: 0}}>{landlineError}</Text>
        )}
      </View>
      <Button title="Save" style={{margin: 16}} onPress={() => saveContact()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {height: 100, borderRadius: 50, width: 100, margin: 16},
});

export default AddContact;
