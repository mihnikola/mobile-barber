import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import NotificationActive from "./NotificationActive";
import NotificationNon from "./NotificationNon";
import { getData } from "@/api/apiService";

const NotificationComponent = () => {
  const [check, setCheck] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState(null);
  const checkUnreadNotifications = () => {
    setCheck(false);
  };
  const checkReadNotifications = () => {
    setCheck(true);
  };
  useEffect(() => {
    getNotificationData();
  }, [check]);

  const getNotificationData = async () => {
    try {
      const response = await getData("/notifications", { check });
      setNotifications(response);
    } catch (error) {
    }
  };

  const detailHandler = async (data) => {
    try {
      const response = await getData(`/notifications/{data._id}`,{params: {id: data._id}});
      setNotification(response);
    } catch (error) {
    }
  };

  if (notification) {
    return (
    <ScrollView style={styles.container}>
        <Image
          source={require("@/assets/images/coverImageNotification.jpg")}
          style={styles.coverImage}
        />
      
        <View style={styles.greyLine} />

        <View style={{ display: "flex" }}>
          <View>
            <Text></Text>
          </View>
          <View>
            <Text style={{color: 'white'}}>{notification?.text}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  if (!notification) {
    return (
      <ScrollView style={styles.container}>
        <Image
          source={require("@/assets/images/coverImageNotification.jpg")}
          style={styles.coverImage}
        />
        <View style={styles.containerCapture}>
          <Text
            style={[styles.capture, !check && styles.active]}
            onPress={checkUnreadNotifications}
          >
            Unread
          </Text>
          <Text
            style={[styles.capture, check && styles.active]}
            onPress={checkReadNotifications}
          >
            Read
          </Text>
        </View>
        <View style={styles.greyLine} />

        <View style={{ display: "flex" }}>
          {notifications && notifications.length > 0
            ? notifications.map((item) => {
                return (
                  <NotificationActive
                    key={item.id}
                    data={item}
                    showNotification={detailHandler}
                  />
                );
              })
            : notifications.length === 0 && <NotificationNon />}
        </View>
      </ScrollView>
    );
  }
};

export default NotificationComponent;
const styles = StyleSheet.create({
  active: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  containerCapture: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
    position: "absolute",
    top: 240,
  },
  coverImage: {
    width: "100%",
    height: 300,
    opacity: 0.2,
  },
  capture: {
    fontSize: 32,
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    fontStyle: "italic",
  },
  greyLine: {
    width: "100%",
    height: 4, // Adjust the height for the thickness of the line
    backgroundColor: "grey", // Set the line color to white
    marginTop: -1, // Optional: You can adjust this to fine-tune the position
  },
});
