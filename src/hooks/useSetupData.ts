// hooks/useSetupData.ts
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateField } from "../store/formSlice";
import { useAIResponse } from "../hooks/useAIResponses";
import {
  SETUP_TITLE_POSITION_PROMPT,
  SETUP_TECHNICAL_SKILLS_PROMPT,
  SETUP_CONCEPTS_PROMPT,
  SETUP_INTERPERSONAL_PROMPT,
} from "../prompts";

// Custom Hook to Fetch and Dispatch Setup Data
const useSetupData = (jobPosting: string) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSetupData = async () => {
      setLoading(true);
      setError(null);

      // Define the prompts for each field
      const prompts = [
        {
          field: "title",
          prompt: `${SETUP_TITLE_POSITION_PROMPT} Job Posting:${jobPosting}`,
        },
        {
          field: "keyAttributes.technicalSkills",
          prompt: `${SETUP_TECHNICAL_SKILLS_PROMPT} Job Posting:${jobPosting}`,
        },
        {
          field: "keyAttributes.concepts",
          prompt: `${SETUP_CONCEPTS_PROMPT} Job Posting:${jobPosting}`,
        },
        {
          field: "keyAttributes.interpersonalSkills",
          prompt: `${SETUP_INTERPERSONAL_PROMPT} Job Posting:${jobPosting}`,
        },
      ];

      // Iterate over the prompts and fetch data
      for (const { field, prompt } of prompts) {
        try {
          const { data, error: aiError } = useAIResponse(prompt);
          if (aiError) {
            throw new Error(aiError.message);
          }

          const responseContent = data?.choices?.[0]?.message?.content;
          if (responseContent) {
            if (field === "title") {
              const [companyName, jobTitle] = responseContent.split(";");
              dispatch(
                updateField({ field: "title", value: companyName.trim() })
              );
              dispatch(
                updateField({ field: "jobTitle", value: jobTitle.trim() })
              );
            } else if (field === "keyAttributes.technicalSkills") {
              dispatch(
                updateField({
                  field: "keyAttributes.technicalSkills",
                  value: responseContent.split(", "),
                })
              );
            } else if (field === "keyAttributes.concepts") {
              dispatch(
                updateField({
                  field: "keyAttributes.concepts",
                  value: responseContent.split(", "),
                })
              );
            } else if (field === "keyAttributes.interpersonalSkills") {
              dispatch(
                updateField({
                  field: "keyAttributes.interpersonalSkills",
                  value: responseContent.split(", "),
                })
              );
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError(String(error));
          }
        }
      }

      setLoading(false);
    };

    fetchSetupData();
  }, [dispatch, jobPosting]);

  return { loading, error };
};

export default useSetupData;
