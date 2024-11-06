import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  Link,
} from "@react-pdf/renderer";
import CvImage from "../assets/images/cv-image.png";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "src/assets/fonts/Roboto/Roboto-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "src/assets/fonts/Roboto/Roboto-Bold.ttf",
      fontWeight: 700,
    },
    {
      src: "src/assets/fonts/Roboto/Roboto-Italic.ttf",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Roboto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    width: "60%",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 5,
    width: "60%",
  },
  subtitle: {
    fontSize: 7,
    color: "#73808D",
    letterSpacing: 2,
    textTransform: "uppercase",
    paddingBottom: 10,
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
    alignItems: "center",
  },
  contactDetails: {
    textAlign: "left",
    width: "40%",
    fontSize: 11,
    flexDirection: "column",
    gap: 5,
  },
  section: {
    marginBottom: 10,
    borderBottom: "1px solid #73808D", // Optional: adds a separator line for sections
    paddingBottom: 5, // Spacing before the next section
  },
  image: {
    width: 77,
    height: 77,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 5,
    textDecoration: "underline",
  },
  content: {
    fontSize: 11,
    lineHeight: 1.6,
  },
  date: {
    fontSize: 9,
    color: "#73808D",
  },
  experienceTitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  positionTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  company: {
    fontSize: 11,
    fontStyle: "italic",
  },
  experienceSection: {
    flexDirection: "column",
    gap: 5,
    paddingBottom: 10,
  },
  link: {
    color: "blue",
    textDecoration: "underline",
  },
});

const CVTemplate: React.FC = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Rocío Díaz</Text>
            <Text style={styles.title}>React Frontend Developer</Text>
          </View>
          <View style={styles.contactContainer}>
            <View style={styles.contactDetails}>
              <Text>rory.d.dev@gmail.com</Text>
              <Text>+1 408-757-0660</Text>
              <Text>Campbell, CA</Text>
              <Link
                style={styles.link}
                src="https://www.linkedin.com/in/rory-diaz/"
              >
                in/rory-diaz/
              </Link>
            </View>
            <Image style={styles.image} src={CvImage} />
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Introduction</Text>
          <Text style={styles.content}>
            Experienced React Developer with over six years in front-end
            development and project migration. Skilled in leading transitions to
            modern technologies, enhancing user interfaces, and optimizing
            system performance. Strong advocate for design thinking, mentorship,
            and cross-functional collaboration to deliver scalable, user-centric
            products. Versatile in adapting to new tools and committed to
            continuous learning.
          </Text>
          {/* <Text style={styles.content}>
            <strong>Lead React Developer</strong> - Web4Realty (Mar 2024 - May
            2024)
            {"\n"}• Led frontend development for a real estate CMS, optimizing
            load times by 80%.
            {"\n"}• Migrated from PHP to ReactJS/Next, enhancing UI
            responsiveness.
          </Text>
          <Text style={styles.content}>
            <strong>React Developer</strong> - Glofy (Oct 2023 - Feb 2024)
            {"\n"}• Managed Droprack’s migration from PHP to React TypeScript.
            {"\n"}• Developed a React media player with Spotify API integration.
          </Text> */}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Core Skills</Text>
          <Text style={styles.content}>
            React (Hooks, Context API, Redux, Sagas), JavaScript, TypeScript,
            HTML, CSS, SCSS, Jest, React Testing Library, API Integration
            (Google Maps, Spotify), Webpack, Rollup, Storybook, Bootstrap,
            Material UI, Chakra UI, Node.js, PHP, Git (GitHub, Bitbucket),
            Agile, Scrum, Kanban.
            {"\n"}Additional Skills: Docker, Next.js, Jenkins, Formik, Yup,
            Canvas API, Fabric JS, Cordova, AWS, Azure, Figma, Adobe XD,
            Bilingual (English/Spanish).
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Experience</Text>
          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>Lead React Developer</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Web4Realty</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Contract</Text>
            </View>
            <Text style={styles.content}>
              • Led frontend development for a real estate CMS, optimizing load
              times by 80%.
              {"\n"}• Migrated from PHP to ReactJS/Next, enhancing UI
              responsiveness.
            </Text>
          </View>

          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>
                React Typescript Developer
              </Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Glofy</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Contract</Text>
            </View>
          </View>

          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>React Developer</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>WeDevelop</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Contract</Text>
            </View>
          </View>

          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>Lead React Developer</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>CFOTech</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Contract</Text>
            </View>
          </View>

          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>React Developer</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Baufest</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Employee</Text>
            </View>
          </View>

          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>React Developer</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Baufest</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Employee</Text>
            </View>
          </View>

          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>
                Full Stack Developer .NET | Angular
              </Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Baufest</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Employee</Text>
            </View>
          </View>

          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>
                Frontend Engineer / Project Manager / UX Designer
              </Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>StreamCoder</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Self-employed</Text>
            </View>
          </View>
        </View>

        {/* Additional Sections (Education, Certifications, etc.) */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Education</Text>
          <Text style={styles.content}>
            Systems Analyst - Escuela Da Vinci (2017) - Argentina
          </Text>
        </View>

        {/* You can add more sections as needed */}
      </Page>
    </Document>
  );
};

export default CVTemplate;
