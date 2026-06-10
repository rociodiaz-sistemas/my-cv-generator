import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeProfileModal } from "../../store/uiSlice";
import { setProfile } from "../../store/profileSlice";
import { Experience, Skills } from "../../store/types";
import ChipInput from "../ChipInput";

type ProfileDraft = {
  profileFullName: string;
  profileEmail: string;
  profilePhone: string;
  profileLinkedin: string;
  profileWebsite: string;
  profileLocation: string;
  profileJobTitle: string;
  profileSkills: Skills;
  profileExperiences: Experience[];
  defaultCheckedExperiences: number[];
  profileIntroduction: string;
};

const createEmptyExperience = (): Experience => ({
  id: Date.now() + Math.floor(Math.random() * 100000),
  label: "",
  title: "",
  company: "",
  prompt: "",
  bulletPoints: [""],
  project: "",
  projectName: "",
  dateFrom: "",
  dateTo: "",
  hireType: "",
  location: "",
});

const ProfileModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.ui.isProfileModalOpen
  );
  const profile = useSelector((state: RootState) => state.profile);

  const [draft, setDraft] = useState<ProfileDraft>({
    profileFullName: profile.profileFullName,
    profileEmail: profile.profileEmail,
    profilePhone: profile.profilePhone,
    profileLinkedin: profile.profileLinkedin,
    profileWebsite: profile.profileWebsite,
    profileLocation: profile.profileLocation,
    profileJobTitle: profile.profileJobTitle,
    profileSkills: profile.profileSkills,
    profileExperiences: profile.profileExperiences,
    defaultCheckedExperiences: profile.defaultCheckedExperiences,
    profileIntroduction: profile.profileIntroduction,
  });

  useEffect(() => {
    if (!isOpen) return;
    setDraft({
      profileFullName: profile.profileFullName,
      profileEmail: profile.profileEmail,
      profilePhone: profile.profilePhone,
      profileLinkedin: profile.profileLinkedin,
      profileWebsite: profile.profileWebsite,
      profileLocation: profile.profileLocation,
      profileJobTitle: profile.profileJobTitle,
      profileSkills: profile.profileSkills,
      profileExperiences: profile.profileExperiences,
      defaultCheckedExperiences: profile.defaultCheckedExperiences,
      profileIntroduction: profile.profileIntroduction,
    });
  }, [isOpen, profile]);

  const handleClose = () => {
    dispatch(closeProfileModal());
  };

  const updateDraft = (updates: Partial<ProfileDraft>) => {
    setDraft((current) => ({ ...current, ...updates }));
  };

  const handleAddSkill = (category: "technical" | "soft", skill: string) => {
    const normalizedSkill = skill.trim();
    if (!normalizedSkill) return;

    setDraft((current) => {
      const nextSkills = current.profileSkills[category].includes(
        normalizedSkill
      )
        ? current.profileSkills[category]
        : [...current.profileSkills[category], normalizedSkill];

      return {
        ...current,
        profileSkills: {
          ...current.profileSkills,
          [category]: nextSkills,
        },
      };
    });
  };

  const handleRemoveSkill = (
    category: "technical" | "soft",
    skill: string
  ) => {
    setDraft((current) => ({
      ...current,
      profileSkills: {
        ...current.profileSkills,
        [category]: current.profileSkills[category].filter(
          (item) => item !== skill
        ),
      },
    }));
  };

  const handleExperienceChange = (
    id: number,
    field: keyof Omit<Experience, "id">
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDraft((current) => ({
        ...current,
        profileExperiences: current.profileExperiences.map((experience) =>
          experience.id === id
            ? { ...experience, [field]: event.target.value }
            : experience
        ),
      }));
  };

  const handleBulletPointChange = (
    id: number,
    bulletIndex: number,
    value: string
  ) => {
    setDraft((current) => ({
      ...current,
      profileExperiences: current.profileExperiences.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              bulletPoints: (experience.bulletPoints ?? []).map((bullet, idx) =>
                idx === bulletIndex ? value : bullet
              ),
            }
          : experience
      ),
    }));
  };

  const handleAddBulletPoint = (id: number) => {
    setDraft((current) => ({
      ...current,
      profileExperiences: current.profileExperiences.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              bulletPoints: [...(experience.bulletPoints ?? []), ""],
            }
          : experience
      ),
    }));
  };

  const handleRemoveBulletPoint = (id: number, bulletIndex: number) => {
    setDraft((current) => ({
      ...current,
      profileExperiences: current.profileExperiences.map((experience) => {
        if (experience.id !== id) return experience;
        const next = (experience.bulletPoints ?? []).filter(
          (_, idx) => idx !== bulletIndex
        );
        return {
          ...experience,
          bulletPoints: next.length > 0 ? next : [""],
        };
      }),
    }));
  };

  const handleAddExperience = () => {
    setDraft((current) => ({
      ...current,
      profileExperiences: [...current.profileExperiences, createEmptyExperience()],
    }));
  };

  const handleRemoveExperience = (id: number) => {
    setDraft((current) => ({
      ...current,
      profileExperiences:
        current.profileExperiences.length > 1
          ? current.profileExperiences.filter((experience) => experience.id !== id)
          : current.profileExperiences,
      defaultCheckedExperiences: current.defaultCheckedExperiences.filter(
        (experienceId) => experienceId !== id
      ),
    }));
  };

  const handleToggleDefaultExperience = (id: number) => {
    setDraft((current) => {
      const exists = current.defaultCheckedExperiences.includes(id);
      return {
        ...current,
        defaultCheckedExperiences: exists
          ? current.defaultCheckedExperiences.filter((item) => item !== id)
          : [...current.defaultCheckedExperiences, id],
      };
    });
  };

  const handleSave = () => {
    dispatch(
      setProfile({
        profileFullName: draft.profileFullName,
        profileEmail: draft.profileEmail,
        profilePhone: draft.profilePhone,
        profileLinkedin: draft.profileLinkedin,
        profileWebsite: draft.profileWebsite,
        profileLocation: draft.profileLocation,
        profileJobTitle: draft.profileJobTitle,
        profileSkills: draft.profileSkills,
        profileExperiences: draft.profileExperiences,
        defaultCheckedExperiences: draft.defaultCheckedExperiences,
        profileIntroduction: draft.profileIntroduction,
      })
    );
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95vw", md: "90vw" },
          maxWidth: 1300,
          maxHeight: "92vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: { xs: 2.5, md: 4 },
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Profile defaults
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Edit the starter profile data used by the wizard and the default
              CV content.
            </Typography>
          </Box>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h6">Contact details</Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Full name"
                  value={draft.profileFullName}
                  onChange={(event) =>
                    updateDraft({ profileFullName: event.target.value })
                  }
                />
                <TextField
                  fullWidth
                  label="Job title"
                  value={draft.profileJobTitle}
                  onChange={(event) =>
                    updateDraft({ profileJobTitle: event.target.value })
                  }
                />
              </Stack>

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Email"
                  value={draft.profileEmail}
                  onChange={(event) =>
                    updateDraft({ profileEmail: event.target.value })
                  }
                />
                <TextField
                  fullWidth
                  label="Phone"
                  value={draft.profilePhone}
                  onChange={(event) =>
                    updateDraft({ profilePhone: event.target.value })
                  }
                />
              </Stack>

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="LinkedIn"
                  value={draft.profileLinkedin}
                  onChange={(event) =>
                    updateDraft({ profileLinkedin: event.target.value })
                  }
                />
                <TextField
                  fullWidth
                  label="Website"
                  value={draft.profileWebsite}
                  onChange={(event) =>
                    updateDraft({ profileWebsite: event.target.value })
                  }
                />
                <TextField
                  fullWidth
                  label="Location"
                  value={draft.profileLocation}
                  onChange={(event) =>
                    updateDraft({ profileLocation: event.target.value })
                  }
                />
              </Stack>

              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Introduction"
                value={draft.profileIntroduction}
                onChange={(event) =>
                  updateDraft({ profileIntroduction: event.target.value })
                }
              />
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h6">Skills</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2">Technical skills</Typography>
                  <ChipInput
                    category="technical"
                    onAddSkill={handleAddSkill}
                  />
                  <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
                    {draft.profileSkills.technical.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        onDelete={() => handleRemoveSkill("technical", skill)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle2">Soft skills</Typography>
                  <ChipInput category="soft" onAddSkill={handleAddSkill} />
                  <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
                    {draft.profileSkills.soft.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        onDelete={() => handleRemoveSkill("soft", skill)}
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h6">Default experiences</Typography>
                  <Typography variant="body2" color="text.secondary">
                    These are the experiences the wizard can preselect.
                  </Typography>
                </Box>
                <Button onClick={handleAddExperience} startIcon={<AddIcon />}>
                  Add experience
                </Button>
              </Box>

              <Stack spacing={2}>
                {draft.profileExperiences.map((experience) => (
                  <Paper
                    key={experience.id}
                    variant="outlined"
                    sx={{ p: 2, borderRadius: 3 }}
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
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={draft.defaultCheckedExperiences.includes(
                                experience.id
                              )}
                              onChange={() =>
                                handleToggleDefaultExperience(experience.id)
                              }
                            />
                          }
                          label="Default selected"
                        />
                        <IconButton
                          onClick={() => handleRemoveExperience(experience.id)}
                          disabled={draft.profileExperiences.length === 1}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Box>

                      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <TextField
                          fullWidth
                          label="Title"
                          value={experience.title}
                          onChange={handleExperienceChange(experience.id, "title")}
                        />
                        <TextField
                          fullWidth
                          label="Company"
                          value={experience.company}
                          onChange={handleExperienceChange(
                            experience.id,
                            "company"
                          )}
                        />
                      </Stack>

                      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <TextField
                          fullWidth
                          label="Project"
                          value={experience.project ?? experience.projectName ?? ""}
                          onChange={handleExperienceChange(experience.id, "project")}
                        />
                        <TextField
                          fullWidth
                          label="Location"
                          value={experience.location ?? ""}
                          onChange={handleExperienceChange(
                            experience.id,
                            "location"
                          )}
                        />
                      </Stack>

                      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <TextField
                          fullWidth
                          label="From"
                          value={experience.dateFrom ?? ""}
                          onChange={handleExperienceChange(
                            experience.id,
                            "dateFrom"
                          )}
                        />
                        <TextField
                          fullWidth
                          label="To"
                          value={experience.dateTo ?? ""}
                          onChange={handleExperienceChange(experience.id, "dateTo")}
                        />
                        <TextField
                          fullWidth
                          label="Hire type"
                          value={experience.hireType ?? ""}
                          onChange={handleExperienceChange(
                            experience.id,
                            "hireType"
                          )}
                        />
                      </Stack>

                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography variant="subtitle2">
                            Bullet points
                          </Typography>
                          <Button
                            onClick={() => handleAddBulletPoint(experience.id)}
                            size="small"
                            startIcon={<AddIcon />}
                          >
                            Add bullet
                          </Button>
                        </Box>
                        <Stack spacing={1.25}>
                          {(experience.bulletPoints ?? [""]).map(
                            (bullet, index) => (
                              <Box
                                key={`${experience.id}-${index}`}
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  alignItems: "flex-start",
                                }}
                              >
                                <TextField
                                  fullWidth
                                  multiline
                                  minRows={1}
                                  value={bullet}
                                  onChange={(event) =>
                                    handleBulletPointChange(
                                      experience.id,
                                      index,
                                      event.target.value
                                    )
                                  }
                                  placeholder="Write one bullet point"
                                />
                                <IconButton
                                  onClick={() =>
                                    handleRemoveBulletPoint(experience.id, index)
                                  }
                                  disabled={(experience.bulletPoints ?? [""]).length === 1}
                                >
                                  <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            )
                          )}
                        </Stack>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Paper>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button onClick={handleClose} variant="text">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
              Save profile
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
