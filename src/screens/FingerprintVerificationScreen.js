import React, { useState, useEffect } from 'react';
import { Text, View, DeviceEventEmitter, NativeModules, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FingerprintVerificationScreen = () => {
  const [status, setStatus] = useState('Scan your finger');
  const [message, setMessage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fingerprintListener = DeviceEventEmitter.addListener(
      'FINGERPRINT_SCANNER_AUTHENTICATION',
      (receivedMessage) => {
        setMessage(receivedMessage);
      }
    );

   
    return () => {
      fingerprintListener.remove();
    };
  }, []); 
  const authenticateFingerprint = async () => {
    try {
      const success = await NativeModules.ReactNativeFingerprintScanner.authenticate();
      if (success) {
        setStatus('Authentication success');
        navigation.navigate('Home');
      } else {
        setStatus('Authentication failed');
      }
    } catch (error) {
      console.error('Fingerprint authentication error:', error);
      setStatus('Authentication error');
    }
  };

  const renderImage = () => {
    switch (status) {
      case 'Authentication success':
        return <Image source={require('../assets/fingerprintSuccess.png')} style={styles.image} />;
      case 'Authentication failed':
        return <Image source={require('../assets/fingerprintFail.png')} style={styles.image} />;
      default:
        return <Image source={require('../assets/fingerprint.png')} style={styles.image} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderImage()}
      <Text style={styles.title}>{message ? message : 'Fingerprint Verification'}</Text>
      <Text style={styles.status}>Status: {status}</Text>
      <View style={styles.button} onPress={authenticateFingerprint}>
        <Text style={styles.buttonText}>Scan Fingerprint</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5FB49C',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FingerprintVerificationScreen;
