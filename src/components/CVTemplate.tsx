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
import { CV, CVFormData, PreviewCV } from "../store/types";
import { link } from "fs";

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
    borderBottom: "1px solid #73808D",
    paddingBottom: 5,
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
  experienceSection: {
    flexDirection: "column",
    marginBottom: 10,
  },
  positionTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  company: {
    fontSize: 11,
    fontStyle: "italic",
  },
  bulletPoint: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 2,
  },
  link: {
    fontSize: 11,
    color: "#0077B5",
  },
});

interface CVTemplateProps {
  selectedCV: PreviewCV | CV | CVFormData;
}

const CVTemplate: React.FC<CVTemplateProps> = ({ selectedCV }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Rocío Díaz</Text>
            <Text style={styles.title}>{selectedCV.jobTitle}</Text>
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

        {/* Introduction Section */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Introduction</Text>
          <Text style={styles.content}>
            {selectedCV.introduction || "Introduction not provided."}
          </Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Core Skills</Text>
          {selectedCV.skills.length > 0 ? (
            <Text style={styles.content}>{selectedCV.skills.join(", ")}</Text>
          ) : (
            <Text style={styles.content}>Skills not provided.</Text>
          )}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Experience</Text>
          {selectedCV.experiences.map((experience) => (
            <View key={experience.id} style={styles.experienceSection}>
              {/* Title, Company, and Date */}
              <Text style={styles.positionTitle}>
                {experience.title} - {experience.company}
              </Text>
              <Text style={styles.date}>{experience.date}</Text>

              {/* Project (if available) */}
              {experience.project && (
                <Text style={styles.content}>
                  Project: {experience.project}
                </Text>
              )}

              {/* Bullet Points (if available) */}
              {experience.bulletPoints?.length ? (
                experience.bulletPoints.map((point, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    • {point}
                  </Text>
                ))
              ) : (
                <Text style={styles.content}>
                  {experience.prompt || "No additional details provided."}
                </Text>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CVTemplate;
