import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import {
  getApiLevel,
  getModel,
  getDeviceName,
  getSystemVersion,
  getUniqueId,
  getBatteryLevel,
  getVersion,
  isLandscape,
  getBrand,
} from 'react-native-device-info';
const{height,width} = Dimensions.get('screen')
const DeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDeviceInfo = async () => {
      try {
        const model = await getModel();
        const apiLevel = await getApiLevel();
        const deviceName = await getDeviceName();
        const systemVersion = await getSystemVersion();
        const deviceId = await getUniqueId();
        const batteryLevel = await getBatteryLevel();
        const appVersion = await getVersion();
        const landscape = await isLandscape();
        const brand = await getBrand();

        const info = {
          model,
          apiLevel,
          deviceName,
          systemVersion,
          deviceId,
          batteryLevel,
          appVersion,
          landscape,
          brand,
        };

        setDeviceInfo(info);
      } catch (error) {
        setError(error.message);
      }
    };

    getDeviceInfo();
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        deviceInfo && (
          <View style={styles.infoContainer}>
            <View style={styles.column}>
              <Text style={styles.label}>Device Brand:</Text>
              <Text style={styles.label}>Device Model:</Text>
              <Text style={styles.label}>API Level:</Text>
              <Text style={styles.label}>System Version:</Text>
              <Text style={styles.label}>Device ID:</Text>
              <Text style={styles.label}>Battery Level:</Text>
              <Text style={styles.label}>App Version:</Text>
              <Text style={styles.label}>Orientation:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.value}>{deviceInfo.brand}</Text>
              <Text style={styles.value}>{deviceInfo.model}</Text>
              <Text style={styles.value}>{deviceInfo.apiLevel}</Text>
              <Text style={styles.value}>{deviceInfo.systemVersion}</Text>
              <Text style={styles.value}>{deviceInfo.deviceId}</Text>
              <Text style={styles.value}>{deviceInfo.batteryLevel}</Text>
              <Text style={styles.value}>{deviceInfo.appVersion}</Text>
              <Text style={styles.value}>
                {deviceInfo.landscape ? 'Landscape' : 'Portrait'}
              </Text>
            </View>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5FB49C',
    // padding: 10,
    elevation: 10,
    borderRadius: 10,
    width:width ,
    paddingTop:10,
    paddingBottom:10
  },
  column: {
    flex: 1,
  },
  label: {
    color: 'white',
    marginBottom: 10,
    marginHorizontal: 5,
    fontSize: 18,
  },
  value: {
    color: 'white',
    marginBottom: 10,
    marginHorizontal: 5,
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default DeviceInfo;
