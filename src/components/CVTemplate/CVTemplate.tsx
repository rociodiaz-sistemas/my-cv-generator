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
import EmailIcon from "../../assets/icons/email-image.png";
import LinkedinIcon from "../../assets/icons/linkedin-image.png";
import { CV, CVFormData, PreviewCV } from "../../store/types";
import { COLORS, FONT_SIZES, ICON_PROPERTIES, SPACING } from "./Styles";

Font.registerHyphenationCallback((word) => [word]);

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
    {
      src: "src/assets/fonts/Segoe-ui/Segoe-ui-italic.ttf",
      fontStyle: "italic",
      fontWeight: 400,
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

const styles = StyleSheet.create({
  page: {
    fontFamily: "Segoe UI",
    color: COLORS.leanBlack,
    flexDirection: "row",
  },

  // Containers
  leftSectionContainer: {
    flex: 4,
    paddingLeft: SPACING.general.PAGE_PADDING_LEFT_RIGHT,
    paddingRight: SPACING.general.PAGE_PADDING_RIGHT,
    paddingTop: SPACING.general.PAGE_PADDING_TOP_BOTTOM,
    paddingBottom: SPACING.general.PAGE_PADDING_TOP_BOTTOM,
  },
  rightSectionContainer: {
    flex: 2,
    paddingTop: SPACING.general.PAGE_PADDING_TOP_BOTTOM,
    paddingLeft: SPACING.general.RIGHT_COLUMN_PADDING_LEFT,
    paddingRight: SPACING.general.PAGE_PADDING_LEFT_RIGHT,
    backgroundColor: COLORS.paperBlue,
    borderLeft: `1px solid ${COLORS.columnBorder}`,
  },
  leftSectionHeaderContainer: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING.title.gap,
    height: SPACING.header.HEADER_HEIGHT,
  },
  // Header
  rightSectionHeaderContainer: {
    height: SPACING.header.HEADER_HEIGHT,
  },
  contactInformationContainer: {
    fontSize: FONT_SIZES.BODY_TEXT_FONT_SIZE,
  },
  // Section
  sectionContainer: {
    paddingBottom: SPACING.section.SECTION_PADDING_BOTTOM,
  },
  subSectionContainer: {
    paddingBottom: SPACING.section.SUB_SECTION_PADDING_BOTTOM,
  },
  // Skills
  skillsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.general.CHIP_GAP,
  },

  // Experience

  experiencesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING.experience.EXPERIENCES_CONTAINER_GAP,
  },

  experienceDateProjectContainer: {
    display: "flex",
    flexDirection: "row",
    gap: SPACING.experience.PROJECT_DATE_GAP,
    alignItems: "baseline",
  },

  experienceBulletpointsContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: FONT_SIZES.BODY_TEXT_FONT_SIZE,
    gap: SPACING.experience.EXPERIENCE_BULLET_POINTS_GAP,
  },
  experienceContainer: {
    display: "flex",
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Align items to the top
    gap: SPACING.experience.EXPERIENCES_CONTAINER_GAP,
  },

  iconLinkedin: {
    width: ICON_PROPERTIES.ICON_WIDTH_HEIGHT_LINKEDIN,
    height: ICON_PROPERTIES.ICON_WIDTH_HEIGHT_LINKEDIN,
    marginRight: "2px",
  },
  iconEmail: {
    width: ICON_PROPERTIES.ICON_WIDTH_HEIGHT_EMAIL,
    height: ICON_PROPERTIES.ICON_WIDTH_HEIGHT_EMAIL,
  },
  chip: {
    display: "flex",
    backgroundColor: COLORS.accentFillBlue,
    padding: 5,
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: FONT_SIZES.BODY2_TEXT_FONT_SIZE,
    border: `1px solid ${COLORS.accentBorderBlue}`,
    gap: SPACING.general.CHIP_GAP,
    wordWrap: "no-wrap",
    maxHeight: "30px",
  },
  name: {
    fontSize: FONT_SIZES.TITLE_FONT_SIZE,
    fontWeight: 700,
    fontFamily: "Alibaba PuHuiTi",
    lineHeight: 1.3,
  },
  jobTitle: {
    fontSize: FONT_SIZES.JOB_TITLE_FONT_SIZE,
    fontFamily: "Segoe UI",
    fontWeight: 600,
  },
  contactInformationDetail: {
    gap: SPACING.icon.ICON_ROW_GAP,
    color: COLORS.leanBlack,
    display: "flex",
    flexDirection: "row",
    marginBottom: SPACING.icon.ICON_ROW_GAP,
    textDecorationColor: COLORS.accentBorderBlue,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.SECTION_TITLE_FONT_SIZE,
    fontWeight: 600,
    paddingBottom: SPACING.section.SECTION_TITLE_PADDING_BOTTOM,
  },
  sectionSubTitle: {
    paddingBottom: SPACING.section.SECTION_TITLE_PADDING_BOTTOM,
    fontSize: FONT_SIZES.SUB_SECTION_TITLE_FONT_SIZE,
  },
  bodyText: {
    fontSize: FONT_SIZES.BODY_TEXT_FONT_SIZE,
    lineHeight: SPACING.general.BODY_LINE_HEIGHT,
    textAlign: "left",
  },
  experienceTitleText: {
    fontSize: FONT_SIZES.EXPERIENCE_TITLE_FONT_SIZE,
    paddingBottom: SPACING.experience.EXPERIENCE_TITLE_PADDING_BOTTOM,
  },
  experienceProjectText: {
    fontSize: FONT_SIZES.PROJECT_FONT_SIZE,
  },
  experienceDateText: {
    fontSize: FONT_SIZES.BODY2_TEXT_FONT_SIZE,
    color: COLORS.leanGrey,
  },
  experienceLocationText: {
    fontStyle: "italic",
    fontSize: FONT_SIZES.BODY2_TEXT_FONT_SIZE,
    color: COLORS.leanGrey,
  },
  experienceHeader: {
    paddingBottom: SPACING.experience.EXPERIENCE_HEADER_PADDING_BOTTOM,
  },

  bulletPointContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  bulletPoint: {
    width: 5,
    fontSize: FONT_SIZES.BODY_TEXT_FONT_SIZE,
    marginRight: 5,
    marginTop: 2,
  },

  bulletPointText: {
    fontSize: FONT_SIZES.BODY_TEXT_FONT_SIZE,
    lineHeight: SPACING.general.BODY_LINE_HEIGHT,
    textAlign: "justify",
  },

  experienceLine: {
    width: 1, // Thickness of the line
    height: "95%", // Dynamic height based on content
    backgroundColor: COLORS.columnBorder, // Line color
    marginRight: "-10px", // Space between the line and the content
    marginLeft: "-5px",
    borderRadius: 1, // Optional: Round the edges for a cleaner look
  },
  experienceContent: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  other: {
    display: "flex",
    gap: 2,
  },
});

const Chip: React.FC<{ label: string }> = ({ label }) => {
  return (
    <View style={styles.chip}>
      <Text>{label}</Text>
    </View>
  );
};

const Detail: React.FC<{
  detail: string;
  linkSrc: string;
  iconSrc: string;
  style?: any;
}> = ({ detail, linkSrc, iconSrc, style }) => {
  return (
    <View style={styles.contactInformationDetail}>
      <Image style={style} src={iconSrc} />
      <Link src={linkSrc}>
        <Text style={styles.contactInformationDetail}>{detail}</Text>
      </Link>
    </View>
  );
};

interface CVTemplateProps {
  selectedCV: PreviewCV | CV | CVFormData;
}

const CVTemplate: React.FC<CVTemplateProps> = ({ selectedCV }) => {
  const addPeriodIfMissing = (text: string): string => {
    if (!text.trim().endsWith(".")) {
      return `${text.trim()}.`;
    }
    return text;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Section */}
        <View style={styles.leftSectionContainer}>
          <View style={styles.leftSectionHeaderContainer}>
            <Text style={styles.name}>Rocio Diaz</Text>
            <Text style={styles.jobTitle}>Frontend Developer</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text
              style={styles.sectionTitle}
            >{`Relevant Experience (${selectedCV.experiences.length}/8)`}</Text>
            <View style={styles.experiencesContainer}>
              {selectedCV.experiences.map((experience, index) => (
                <View style={styles.experienceContainer} key={index}>
                  {/* The left vertical line */}
                  <View style={styles.experienceLine} />

                  {/* The content */}
                  <View style={styles.experienceContent}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.experienceTitleText}>
                        {experience.title} @ {experience.company}
                      </Text>
                      <View style={styles.experienceDateProjectContainer}>
                        <Text style={styles.experienceProjectText}>
                          {experience.project}
                        </Text>
                        <Text style={styles.experienceDateText}>
                          {experience.dateFrom} - {experience.dateTo}
                        </Text>
                        <Text style={styles.experienceLocationText}>
                          {experience.location}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.experienceBulletpointsContainer}>
                      {experience.bulletPoints?.map((bulletPoint, index) => (
                        <View key={index} style={styles.bulletPointContainer}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.bulletPointText}>
                            {addPeriodIfMissing(bulletPoint)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Right Section */}
        <View style={styles.rightSectionContainer}>
          <View style={styles.rightSectionHeaderContainer}>
            <View style={styles.contactInformationContainer}>
              <Detail
                detail="rory.d.dev@gmail.com"
                linkSrc="mailto:rory.d.dev@gmail.com"
                iconSrc={EmailIcon}
                style={styles.iconEmail}
              />
            </View>
            <View style={styles.contactInformationContainer}>
              <Detail
                detail="in/rory-diaz"
                linkSrc="https://www.linkedin.com/in/rory-diaz/"
                iconSrc={LinkedinIcon}
                style={styles.iconLinkedin}
              />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>About me</Text>
            <Text style={styles.bodyText}>{selectedCV.introduction}</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Core skills</Text>
            <View style={styles.subSectionContainer}>
              <Text style={styles.sectionSubTitle}>Technical</Text>
              <View style={styles.skillsContainer}>
                {selectedCV.skills.technical.map((skill, index) => (
                  <Chip key={index} label={skill} />
                ))}
              </View>
            </View>
            <View style={styles.subSectionContainer}>
              <Text style={styles.sectionSubTitle}>Soft</Text>
              <View style={styles.skillsContainer}>
                {selectedCV.skills.soft.map((skill, index) => (
                  <Chip key={index} label={skill} />
                ))}
              </View>
            </View>
            <View style={styles.subSectionContainer}>
              <Text style={styles.sectionSubTitle}>Other</Text>
              <View>
                <Text style={styles.bodyText}>• US Citizen</Text>
                <Text style={styles.bodyText}>• Native English/Spanish</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CVTemplate;
