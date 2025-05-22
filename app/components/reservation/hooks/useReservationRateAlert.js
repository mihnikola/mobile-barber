import { View, Text, Alert } from 'react-native'
import React, { useCallback } from 'react'

const useReservationRateAlert = (onConfirm) => {
 const rateAlert = useCallback(() => {
         Alert.alert(
             "Information",
             "Are you sure to rate this appointment?",
             [
                 {
                     text: "Cancel",
                     onPress: () => console.log("Cancel Pressed"),
                     style: "cancel",
                 },
                 {
                     text: "Ok",
                     onPress: () => {
                         onConfirm();
                     },
                 },
             ]
         );
     }, [onConfirm]);
 
    
 
 
 
     return { rateAlert };
}

export default useReservationRateAlert