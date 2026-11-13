import { View, TextInput, ScrollView, findNodeHandle } from "react-native";
import ImageCompress from "@/components/settings/ImageCompress";
import useUserChange from "@/components/infoapp/hooks/useUserChange";
import usePhoneNumber from "@/components/infoapp/hooks/usePhoneNumber";
import useName from "@/components/infoapp/hooks/useName";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useLocalization } from "@/context/LocalizationContext";
import { fonts, makeStyles } from "@/theme";
import { AppText, BackButton, Button, Icon, MessageDialog, PhoneField, TextField, withScreen } from "@/components/ui";

const UserProfileScreen = () => {
  const styles = useStyles();
  const { isLoading, userData, fetchUserData } = useAuth();
  const { localization } = useLocalization();
  const scrollRef = useRef(null);
  const scrollRef2 = useRef(null);
  const phoneNumberayoutY = useRef(0);

  const [changedImg, setChangedImg] = useState(undefined);
  const { name, handleNameChange, nameRef } = useName(userData?.name);

  const {
    message,
    isLoadingChange,
    errorChange,
    handleChangeUser,
    isMessage,
    setIsMessage,
    setErrorChange,
  } = useUserChange();

  const [isValidated, setIsValidated] = useState(false);
  const {
    phoneNumber,
    isValid,
    handlePhoneNumberChange,
    errorPhoneNumber,
    phoneNumberRefInput,
  } = usePhoneNumber(userData?.phoneNumber);

  useEffect(() => {
    setIsValidated(validationFields);
  }, [phoneNumber, name, changedImg]);

  const validationFields = () => {
    if (!isValid) {
      return false;
    }

    if (phoneNumber === null) {
      if (name !== userData?.name || changedImg !== userData?.image) {
        return true;
      } else {
        return false;
      }
    }
    if (phoneNumber !== null) {
      if (
        phoneNumber !== userData?.phoneNumber?.slice(4) ||
        name !== userData?.name ||
        changedImg !== userData?.image
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const selectedImgHandler = (imgData) => {
    if (imgData) {
      setChangedImg(imgData);
    }
  };

  const messageHandler = () => {
    setIsMessage(false);
    fetchUserData();
    router.back();
  };

  const submitChanges = () => {
    const data = {
      phoneNumber:
        phoneNumber !== userData?.phoneNumber?.slice(4) &&
        phoneNumber !== userData?.phoneNumber &&
        phoneNumber !== null &&
        phoneNumber !== "null"
          ? "+381" + phoneNumber
          : null,
      name: name !== userData?.name ? name : null,
      image: changedImg === userData?.image ? null : changedImg,
    };
    if (!data.name && !data.phoneNumber && !data.image) {
      setIsMessage(true);
      setErrorChange(localization.SETTINGS.PROFILE.notDataChanged);
      return;
    }
    handleChangeUser(data);
  };

  const messageHandler2 = () => {
    setIsMessage(false);
  };

  return (
    // keyboard handling comes from withScreen(..., "keyboard"); top inset from Screen
    <ScrollView
        ref={scrollRef}
        style={styles.screen}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <BackButton style={styles.back} />
        <View style={styles.profileRow}>
          <ImageCompress handlePickImage={selectedImgHandler} imageValue={userData?.image} />
          <View style={styles.profileText}>
            <AppText style={styles.profileName} numberOfLines={2}>
              {userData?.name}
            </AppText>
            <AppText variant="bodySm" color="inkMuted" numberOfLines={1}>
              {userData?.email}
            </AppText>
          </View>
        </View>
        <View style={styles.userDataContainer}>
          <View>
            <AppText variant="label" color="inkMuted" style={styles.label}>
              {localization.SETTINGS.PROFILE.email}
            </AppText>
            <TextInput
              style={styles.inputDisabled}
              defaultValue={userData?.email}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View>
            <PhoneField
              label={localization.SETTINGS.PROFILE.phoneNumber}
              placeholder="6x xxx xxxx"
              keyboardType="phone-pad"
              dataDetectorTypes="phoneNumber"
              value={
                phoneNumber !== null
                  ? phoneNumber
                  : userData?.phoneNumber === null
                    ? ""
                    : userData?.phoneNumber?.slice(4)
              }
              onChangeText={handlePhoneNumberChange}
              autoComplete="tel"
              error={errorPhoneNumber}
              returnKeyType="next"
              onSubmitEditing={() => {
                const node = findNodeHandle(nameRef.current);
                if (node) {
                  scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(
                    node,
                    200,
                    true,
                  );
                }
                nameRef.current?.focus();
              }}
            />
          </View>
          <View>
            <TextField alwaysShowError
              label={localization.SETTINGS.PROFILE.name}
              value={name}
              ref={nameRef}
              onChangeText={handleNameChange}
              placeholder={localization.SETTINGS.PROFILE.placeholderName}
              onFocus={() => {
                // keep the field above the keyboard (was inside SharedNameEdit)
                const node = findNodeHandle(nameRef.current);
                if (node) scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(node, 120, true);
              }}
            />
          </View>

          <View>
            <Button
              style={styles.submit}
              disabled={!isValidated}
              onPress={submitChanges}
              loading={isLoadingChange}
              title={localization.SETTINGS.PROFILE.btnText}
            />
          </View>
        </View>
        {isMessage && (
          <MessageDialog
            isOpen={isMessage}
            onClose={!errorChange ? messageHandler : messageHandler2}
            onConfirm={!errorChange ? messageHandler : messageHandler2}
            icon={
              <Icon name={errorChange ? "close" : "check"} size={32} />
            }
            title={
              message
                ? localization.SETTINGS.PROFILE.messageConfirm
                : errorChange
            }
            buttonText="Ok"
          />
        )}
    </ScrollView>
  );
};

const useStyles = makeStyles((colors) => ({
  screen: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: 32 },
  back: { marginLeft: 16, marginTop: 8 },
  // ds-profile: photo left, name + e-mail next to it
  profileRow: { flexDirection: "row", alignItems: "center", gap: 16, paddingHorizontal: 16, marginTop: 16 },
  profileText: { flex: 1 },
  profileName: { fontFamily: fonts.displaySemiBold, fontSize: 24, lineHeight: 28, textTransform: "uppercase", color: colors.ink },
  userDataContainer: { paddingHorizontal: 16, paddingTop: 8 },
  label: { marginTop: 16, marginBottom: 6 },
  // read-only field: sunken, muted text, no focus
  inputDisabled: {
    minHeight: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surfaceSunken,
    color: colors.inkMuted,
    fontFamily: fonts.sans,
    fontSize: 16,
  },
  submit: { marginTop: 32 },
}));

export default withScreen(UserProfileScreen, "keyboard");
