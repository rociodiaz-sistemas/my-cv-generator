import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addCV } from "../../store/cvSlice";
import { closeManualModal, setIsEditFormModalOpen } from "../../store/uiSlice";
import { setCV } from "../../store/editFormSlice";
import { createCV } from "../../helpers";
import { Experience } from "../../store/types";
import ChipInput from "../ChipInput";
import { db } from "../../db/CVDatabase";

type ExperienceDraft = {
  localId: string;
  title: string;
  company: string;
  projectName: string;
  dateFrom: string;
  dateTo: string;
  hireType: string;
  location: string;
  bulletPoints: string[];
};

const createDraftExperience = (): ExperienceDraft => ({
  localId: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  title: "",
  company: "",
  projectName: "",
  dateFrom: "",
  dateTo: "",
  hireType: "",
  location: "",
  bulletPoints: [""],
});

const ManualCVFormModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.ui.isManualModalOpen
  );

  const [cvTitle, setCvTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedinText, setLinkedinText] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<ExperienceDraft[]>([
    createDraftExperience(),
  ]);
  const [isSpanish, setIsSpanish] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setCvTitle("");
    setFullName("");
    setEmail("");
    setPhone("");
    setLinkedinText("");
    setLinkedinUrl("");
    setWebsite("");
    setLocation("");
    setJobTitle("");
    setIntroduction("");
    setTechnicalSkills([]);
    setSoftSkills([]);
    setExperiences([createDraftExperience()]);
    setIsSpanish(false);
    setIsSubmitting(false);
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeManualModal());
  };

  const handleAddSkill = (
    category: "technical" | "soft",
    skill: string
  ) => {
    const normalizedSkill = skill.trim();
    if (!normalizedSkill) return;

    if (category === "technical") {
      setTechnicalSkills((current) =>
        current.includes(normalizedSkill)
          ? current
          : [...current, normalizedSkill]
      );
      return;
    }

    setSoftSkills((current) =>
      current.includes(normalizedSkill) ? current : [...current, normalizedSkill]
    );
  };

  const handleRemoveSkill = (
    category: "technical" | "soft",
    skill: string
  ) => {
    if (category === "technical") {
      setTechnicalSkills((current) => current.filter((item) => item !== skill));
      return;
    }

    setSoftSkills((current) => current.filter((item) => item !== skill));
  };

  const handleExperienceChange = (
    localId: string,
    field: keyof Omit<ExperienceDraft, "localId">
  ) => {
    return (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const value = event.target.value;
      setExperiences((current) =>
        current.map((experience) =>
          experience.localId === localId
            ? { ...experience, [field]: value }
            : experience
        )
      );
    };
  };

  const handleAddExperience = () => {
    setExperiences((current) => [...current, createDraftExperience()]);
  };

  const handleRemoveExperience = (localId: string) => {
    setExperiences((current) => {
      const next = current.filter((experience) => experience.localId !== localId);
      return next.length > 0 ? next : [createDraftExperience()];
    });
  };

  const handleBulletPointChange = (
    localId: string,
    bulletIndex: number,
    value: string
  ) => {
    setExperiences((current) =>
      current.map((experience) =>
        experience.localId === localId
          ? {
              ...experience,
              bulletPoints: experience.bulletPoints.map((point, index) =>
                index === bulletIndex ? value : point
              ),
            }
          : experience
      )
    );
  };

  const handleAddBulletPoint = (localId: string) => {
    setExperiences((current) =>
      current.map((experience) =>
        experience.localId === localId
          ? {
              ...experience,
              bulletPoints: [...experience.bulletPoints, ""],
            }
          : experience
      )
    );
  };

  const handleRemoveBulletPoint = (localId: string, bulletIndex: number) => {
    setExperiences((current) =>
      current.map((experience) => {
        if (experience.localId !== localId) return experience;

        const nextPoints = experience.bulletPoints.filter(
          (_, index) => index !== bulletIndex
        );

        return {
          ...experience,
          bulletPoints: nextPoints.length > 0 ? nextPoints : [""],
        };
      })
    );
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const finalExperiences: Experience[] = experiences
        .filter(
          (experience) =>
            experience.title.trim() ||
            experience.company.trim() ||
            experience.projectName.trim() ||
            experience.bulletPoints.some((bullet) => bullet.trim())
        )
        .map((experience, index) => ({
          id: Date.now() + index,
          label: experience.company.trim() || experience.title.trim() || "Role",
          title: experience.title.trim(),
          company: experience.company.trim(),
          projectName: experience.projectName.trim() || undefined,
          prompt: "",
          dateFrom: experience.dateFrom.trim() || undefined,
          dateTo: experience.dateTo.trim() || undefined,
          hireType: experience.hireType.trim() || undefined,
          location: experience.location.trim() || undefined,
          bulletPoints: experience.bulletPoints
            .map((bullet) => bullet.trim())
            .filter(Boolean),
        }));

      const cv = createCV({
        title: cvTitle.trim() || "Manual CV",
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        linkedin: linkedinUrl.trim() || linkedinText.trim(),
        linkedinText: linkedinText.trim(),
        linkedinUrl: linkedinUrl.trim(),
        website: website.trim(),
        location: location.trim(),
        jobTitle: jobTitle.trim(),
        introduction: introduction.trim(),
        skills: {
          soft: softSkills,
          technical: technicalSkills,
        },
        experiences: finalExperiences,
        isSpanish,
      });

      await db.cvs.put(cv);
      dispatch(addCV(cv));
      dispatch(setCV(cv));
      dispatch(closeManualModal());
      dispatch(setIsEditFormModalOpen(true));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          inset: "50% auto auto 50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95vw", md: "90vw" },
          maxWidth: "1300px",
          maxHeight: "92vh",
          overflowY: "auto",
          borderRadius: 4,
          bgcolor: "#F7F8FC",
          boxShadow: "0 30px 80px rgba(15, 23, 42, 0.24)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.95fr 1.45fr" },
            minHeight: "100%",
          }}
        >
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              color: "white",
              background:
                "linear-gradient(145deg, rgba(18,24,40,0.98), rgba(30,64,175,0.9))",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="overline" sx={{ opacity: 0.75 }}>
                Manual builder
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                Build a CV without AI
              </Typography>
              <Typography sx={{ mt: 1, opacity: 0.9 }}>
                Fill in exactly what you want. Add your own title, skills,
                experiences, and intro without job-posting prompts or AI
                suggestions.
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  What you can do here
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Add any job title, any summary, any skills, and as many
                  experiences as you want.
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Each line in the experience notes becomes a bullet point in
                  the PDF.
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Switch between English and Spanish before exporting.
                </Typography>
              </Stack>
            </Paper>

            <Box sx={{ mt: "auto" }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Tip: you can save a very lean CV with just a title, role, and a
                few bullet points if that is all you need.
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: { xs: 2.5, md: 4 },
              overflowY: "visible",
              bgcolor: "background.paper",
            }}
          >
            <Stack spacing={3}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  CV details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start with the basics and build out the rest however you like.
                </Typography>
              </Box>

              <TextField
                label="CV name"
                value={cvTitle}
                onChange={(event) => setCvTitle(event.target.value)}
                fullWidth
                required
              />

              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6">Personal details</Typography>
                    <Typography variant="body2" color="text.secondary">
                      This is the information that appears at the top of the CV.
                    </Typography>
                  </Box>

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      label="Full name"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Location"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      fullWidth
                    />
                  </Stack>

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      label="Email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      fullWidth
                    />
                  </Stack>

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      label="LinkedIn text"
                      value={linkedinText}
                      onChange={(event) => setLinkedinText(event.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="LinkedIn URL"
                      value={linkedinUrl}
                      onChange={(event) => setLinkedinUrl(event.target.value)}
                      fullWidth
                    />
                  </Stack>
                  <TextField
                    label="Website"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    fullWidth
                  />
                </Stack>
              </Paper>

              <TextField
                label="Job title"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                fullWidth
              />

              <TextField
                label="Introduction"
                value={introduction}
                onChange={(event) => setIntroduction(event.target.value)}
                placeholder="Write a short summary about yourself"
                fullWidth
                multiline
                minRows={4}
              />

              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6">Skills</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Add technical and soft skills one by one.
                    </Typography>
                  </Box>

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Technical skills</Typography>
                    <ChipInput
                      category="technical"
                      onAddSkill={handleAddSkill}
                    />
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {technicalSkills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          onDelete={() =>
                            handleRemoveSkill("technical", skill)
                          }
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Stack>

                  <Divider />

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Soft skills</Typography>
                    <ChipInput category="soft" onAddSkill={handleAddSkill} />
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {softSkills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          onDelete={() => handleRemoveSkill("soft", skill)}
                          color="secondary"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">Experiences</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Add roles, projects, freelance work, or anything else
                        you want shown.
                      </Typography>
                    </Box>
                    <Button
                      onClick={handleAddExperience}
                      startIcon={<AddIcon />}
                      variant="outlined"
                    >
                      Add experience
                    </Button>
                  </Box>

                  <Stack spacing={2}>
                    {experiences.map((experience, index) => (
                      <Paper
                        key={experience.localId}
                        variant="outlined"
                        sx={{ p: 2, borderRadius: 3, bgcolor: "#FCFDFF" }}
                      >
                        <Stack spacing={2}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                              Experience {index + 1}
                            </Typography>
                            <IconButton
                              onClick={() =>
                                handleRemoveExperience(experience.localId)
                              }
                              disabled={experiences.length === 1}
                              size="small"
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Box>

                          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <TextField
                              label="Company"
                              value={experience.company}
                              onChange={handleExperienceChange(
                                experience.localId,
                                "company"
                              )}
                              fullWidth
                            />
                            <TextField
                              label="Role / Title"
                              value={experience.title}
                              onChange={handleExperienceChange(
                                experience.localId,
                                "title"
                              )}
                              fullWidth
                            />
                          </Stack>

                          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <TextField
                              label="Project name"
                              value={experience.projectName}
                              onChange={handleExperienceChange(
                                experience.localId,
                                "projectName"
                              )}
                              fullWidth
                            />
                            <TextField
                              label="Location"
                              value={experience.location}
                              onChange={handleExperienceChange(
                                experience.localId,
                                "location"
                              )}
                              fullWidth
                            />
                          </Stack>

                          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <TextField
                              label="From"
                              value={experience.dateFrom}
                              onChange={handleExperienceChange(
                                experience.localId,
                                "dateFrom"
                              )}
                              fullWidth
                            />
                            <TextField
                              label="To"
                              value={experience.dateTo}
                              onChange={handleExperienceChange(
                                experience.localId,
                                "dateTo"
                              )}
                              fullWidth
                            />
                          </Stack>

                          <TextField
                            label="Hire type"
                            value={experience.hireType}
                            onChange={handleExperienceChange(
                              experience.localId,
                              "hireType"
                            )}
                            fullWidth
                          />

                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                                mb: 1,
                              }}
                            >
                              <Typography variant="subtitle2">
                                Bullet points
                              </Typography>
                              <Button
                                onClick={() =>
                                  handleAddBulletPoint(experience.localId)
                                }
                                size="small"
                                startIcon={<AddIcon />}
                              >
                                Add bullet
                              </Button>
                            </Box>

                            <Stack spacing={1.25}>
                              {experience.bulletPoints.map((bullet, bulletIndex) => (
                                <Box
                                  key={`${experience.localId}-${bulletIndex}`}
                                  sx={{
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <TextField
                                    fullWidth
                                    value={bullet}
                                    onChange={(event) =>
                                      handleBulletPointChange(
                                        experience.localId,
                                        bulletIndex,
                                        event.target.value
                                      )
                                    }
                                    placeholder="Write one bullet point"
                                    multiline
                                    minRows={1}
                                  />
                                  <IconButton
                                    onClick={() =>
                                      handleRemoveBulletPoint(
                                        experience.localId,
                                        bulletIndex
                                      )
                                    }
                                    disabled={experience.bulletPoints.length === 1}
                                    size="small"
                                    sx={{ mt: 0.5 }}
                                  >
                                    <DeleteOutlineIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              ))}
                            </Stack>
                          </Box>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  alignItems={{ xs: "flex-start", md: "center" }}
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isSpanish}
                        onChange={(event) => setIsSpanish(event.target.checked)}
                      />
                    }
                    label="Export in Spanish"
                  />

                  <Stack direction="row" spacing={1.5}>
                    <Button onClick={handleClose} variant="text">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Create CV"}
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ManualCVFormModal;
