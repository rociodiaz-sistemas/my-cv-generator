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
import { CV } from "../store/types";

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

interface CVTemplateProps {
  selectedCV: CV | null;
}

const CVTemplate: React.FC<CVTemplateProps> = ({ selectedCV }) => {
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
            {selectedCV?.introduction || "Introduction not provided."}
          </Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Core Skills</Text>
          <Text style={styles.content}>
            {selectedCV?.skills || "Skills not provided."}
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
            {(selectedCV?.web4Realty || "").split("\n").map((line, index) => (
              <Text key={index} style={styles.content}>
                • {line}
              </Text>
            ))}
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
            {(selectedCV?.glofy || "").split("\n").map((line, index) => (
              <Text key={index} style={styles.content}>
                • {line}
              </Text>
            ))}
          </View>

          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>React Developer</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>WeDevelop</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Contract</Text>
            </View>
            {(selectedCV?.weDevelop1 || "").split("\n").map((line, index) => (
              <Text key={index} style={styles.content}>
                • {line}
              </Text>
            ))}
          </View>

          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>Lead React Developer</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>CFOTech</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Contract</Text>
            </View>
            {(selectedCV?.cfotech || "").split("\n").map((line, index) => (
              <Text key={index} style={styles.content}>
                • {line}
              </Text>
            ))}
          </View>

          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>React Developer</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Baufest</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Employee</Text>
            </View>
            {(selectedCV?.baufest1 || "").split("\n").map((line, index) => (
              <Text key={index} style={styles.content}>
                • {line}
              </Text>
            ))}
          </View>

          <View style={styles.experienceSection}>
            <View style={styles.experienceTitleContainer}>
              <Text style={styles.positionTitle}>React Developer</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Baufest</Text>
              <Text style={styles.content}> - </Text>
              <Text style={styles.company}>Employee</Text>
            </View>
            {(selectedCV?.baufest2 || "").split("\n").map((line, index) => (
              <Text key={index} style={styles.content}>
                • {line}
              </Text>
            ))}
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
            {(selectedCV?.baufest3 || "").split("\n").map((line, index) => (
              <Text key={index} style={styles.content}>
                • {line}
              </Text>
            ))}
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
          {(selectedCV?.streamCoder || "").split("\n").map((line, index) => (
            <Text key={index} style={styles.content}>
              • {line}
            </Text>
          ))}
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
