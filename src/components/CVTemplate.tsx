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
import { renderToStaticMarkup } from "react-dom/server";
import { Email } from "@mui/icons-material";

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

Font.register({
  family: "Segoe UI",
  fonts: [
    {
      src: "src/assets/fonts/Segoe-ui/Segoe-ui-regular.ttf",
      fontWeight: 400,
    },
    {
      src: "src/assets/fonts/Segoe-ui/Segoe-ui-semibold.ttf",
      fontWeight: 600,
    },
    {
      src: "src/assets/fonts/Segoe-ui/Segoe-ui-bold.ttf",
      fontWeight: 700,
    },
    {
      src: "src/assets/fonts/Segoe-ui/Segoe-ui-bold-italic.ttf",
      fontStyle: "italic",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Alibaba PuHuiTi",
  fonts: [
    {
      src: "src/assets/fonts/Alibaba-Puhuiti/Alibaba-Puhuiti-regular.ttf",
      fontWeight: 400,
    },
    {
      src: "src/assets/fonts/Alibaba-Puhuiti/Alibaba-Puhuiti-bold.ttf",
      fontWeight: 700,
    },
  ],
});

// Function to convert MUI Icon to raw SVG code
const renderSvgIcon = (IconComponent: React.ElementType): string => {
  const svgMarkup = renderToStaticMarkup(<IconComponent />);
  return svgMarkup; // Return raw SVG code
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Roboto",
    backgroundColor: "#f5f7fa",
    color: "#1a202c",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    borderBottom: "2px solid #2d3748",
    marginBottom: 20,
  },
  nameTitle: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3748",
  },
  title: {
    fontSize: 16,
    color: "#718096",
    marginTop: 5,
  },
  contactContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    border: "2px solid #2d3748",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: 5,
    marginBottom: 10,
    color: "#2d3748",
  },
  content: {
    fontSize: 11,
    lineHeight: 1.6,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillChip: {
    backgroundColor: "#edf2f7",
    color: "#2d3748",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 10,
  },
  experience: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: "1px solid #e2e8f0",
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2d3748",
  },
  experienceCompany: {
    fontSize: 10,
    color: "#4a5568",
    fontStyle: "italic",
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 15, // Indent bullet point text
    textIndent: -7, // Adjust indent for the bullet itself
  },
  projectLocation: {
    fontSize: 11,
    lineHeight: 1.4,
  },
  icon: {
    width: 15,
    height: 15,
  },
});

const Chip = () => <></>;

interface CVTemplateProps {
  selectedCV: PreviewCV | CV | CVFormData;
}

const CVTemplate: React.FC<CVTemplateProps> = ({ selectedCV }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.nameTitle}>
            <Text style={styles.name}>Rocío Díaz</Text>
            <Text style={styles.title}>{selectedCV.jobTitle}</Text>
          </View>
          <View style={styles.contactContainer}>
            <Image style={styles.image} src={CvImage} />
            <View style={styles.contactItem}>
              {/* Email Icon */}
              <Image style={styles.icon} src={renderSvgIcon(Email)} />
              <Text>rory.d.dev@gmail.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>+1 408-757-0660</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>Campbell, CA</Text>
            </View>
            <View style={styles.contactItem}>
              {" "}
              <Link src="https://www.linkedin.com/in/rory-diaz/">
                in/rory-diaz/
              </Link>
            </View>
          </View>
        </View>

        {/* Introduction Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Introduction</Text>
          <Text style={styles.content}>
            {selectedCV.introduction || "Introduction not provided."}
          </Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Core Skills</Text>
          {selectedCV.skills.length > 0 ? (
            <View style={styles.skills}>
              {selectedCV.skills.map((skill, index) => (
                <Text key={index} style={styles.skillChip}>
                  {skill}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={styles.content}>Skills not provided.</Text>
          )}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Experience</Text>
          {selectedCV.experiences.map((experience) => (
            <View key={experience.id} style={styles.experience}>
              {/* Title, Company, and Project */}
              <Text style={styles.experienceTitle}>
                {experience.title} @ {experience.company}
              </Text>
              {/* Date Range and Hire Type */}
              <Text style={styles.projectLocation}>
                {experience.project} | {experience.location}
              </Text>
              <Text style={styles.experienceCompany}>
                {experience.dateFrom} - {experience.dateTo} (
                {experience.hireType})
              </Text>

              {/* Bullet Points */}
              {(experience.bulletPoints?.length ?? 0) > 0 && (
                <View style={{ marginTop: 5 }}>
                  {experience.bulletPoints?.map((point, index) => (
                    <Text key={index} style={styles.bulletPoint}>
                      • {point}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CVTemplate;
