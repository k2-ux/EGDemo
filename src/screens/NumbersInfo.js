import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SimData from 'react-native-sim-data';

const NumbersInfo = () => {
  const [simInfo, setSimInfo] = useState(null);

  useEffect(() => {
    const getSimInfo = async () => {
      try {
        const simData = await SimData.getSimInfo();
        setSimInfo(simData);
      } catch (error) {
        console.error('Error fetching SIM card information:', error);
      }
    };

    getSimInfo();
  }, []);

  return (
    <View style={styles.container}>
      {simInfo && simInfo.cards.length > 0 ? (
        <View>
          <Text>Sim 1 Mobile Number: {simInfo.cards[0]?.number}</Text>
          {simInfo.cards.length > 1 && (
            <Text>Sim 2 Mobile Number: {simInfo.cards[1]?.number}</Text>
          )}
        </View>
      ) : (
        <Text>No SIM card detected in the device.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default NumbersInfo;
