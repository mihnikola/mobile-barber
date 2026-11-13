import { ScrollView } from "react-native";
import AboutUsInfo from "@/components/home/AboutUsInfo";
import ListAboutUs from "@/components/home/ListAboutUs";
import ContactUs from "@/components/home/ContactUs";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { useCompany } from "@/context/CompanyContext";
import { withScreen } from "@/components/ui";
import { makeStyles } from "@/theme";

/** About us (Phase 5.6): DS header with the company's about title, text card, contact and hours groups. */
const AboutUsScreen = () => {
  const styles = useStyles();
  const { company } = useCompany();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <HeaderCoverImageContainer title={company?.aboutUs?.title} />
      <AboutUsInfo
        text={company?.aboutUs?.text}
        textTwo={company?.aboutUs?.textTwo}
        textThree={company?.aboutUs?.textThree}
      />
      <ListAboutUs contact={company?.contact} />
      <ContactUs
        workDays={company?.aboutUs?.workDays}
        workSaturday={company?.aboutUs?.workSaturday}
        holidays={company?.aboutUs?.holidays}
      />
    </ScrollView>
  );
};

const useStyles = makeStyles((colors) => ({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 32 },
}));

export default withScreen(AboutUsScreen);
