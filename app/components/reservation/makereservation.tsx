import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import ReservationContext from "@/context/ReservationContext";
import Button from "@/shared-components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addMinutesToTime, convertDate } from "@/helpers";

const makereservation = () => {
  const { reservation } = useContext(ReservationContext)!;
  const navigation = useNavigation();
   const route = useRoute(); // Get the route object
    const { responseData } = route.params;
    console.log("makereservation",responseData)

  const submitReservationHandler = async () => {
    navigation.navigate("(tabs)", { screen: "explore" });
    
  };
  if(!responseData){
    return navigation.navigate("(tabs)", { screen: "explore" });
  }

  if (reservation && responseData) {
    return (
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/coverImage.jpg")}
          style={styles.coverImage}
        />
        <Image
          source={require("@/assets/images/logoImage.png")}
          style={styles.coverLogo}
        />
        <View style={styles.coverContent}>
          <Text style={styles.timeData}>
            {reservation?.timeData?.value} -{" "}
            {addMinutesToTime(reservation?.timeData?.value, reservation?.service?.duration)}
          </Text>
          <Text style={styles.dateData}>
            {convertDate(reservation?.dateReservation?.dateString || reservation?.dateReservation)}
          </Text>
        </View>
        <View style={styles.whiteLine} />

        <View style={{ display: "flex", flexDirection: "column" }}>
          <View style={{ display: "flex" }}>
            <Text style={styles.message}>
              Your appointment is successfully booked!
            </Text>
          </View>
          <View style={styles.reservation}>
            <Button text="Ok" onPress={submitReservationHandler} />
          </View>
        </View>
        
      </View>
    );
  }
};

export default makereservation;

const styles = StyleSheet.create({
  coverLogo: {
    position: "absolute",
    display: "flex",
    alignSelf: "center",
    marginTop: 20,
  },
  checkbox: {
    marginRight: 10, // Space between checkbox and label
  },
  message: {
    fontSize: 30,
    padding: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
  },

  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  timeData: {
    fontSize: 30,

    color: "#fff",
    fontWeight: "900",
    display: "flex",
    justifyContent: "center",
  },
  position: {
    fontSize: 20,
    color: "grey",
    fontStyle: "italic",
    padding: 12,
  },
  coverContent: {
    alignItems: "center",
    position: "absolute",
    top: 250,
    width: "100%",
  },
  dateData: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
  },
  data: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    backgroundColor:"black"

  },
  coverImage: {
    width: "100%",
    opacity: 0.25,
  },
  whiteLine: {
    width: "100%",
    height: 4, // Adjust the height for the thickness of the line
    backgroundColor: "#fff", // Set the line color to white
    marginTop: -1, // Optional: You can adjust this to fine-tune the position
  },
});
