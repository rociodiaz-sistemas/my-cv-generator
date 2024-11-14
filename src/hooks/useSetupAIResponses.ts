import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateStringField, updateArrayField } from "../store/formSlice";
import {
  SETUP_CONCEPTS_PROMPT,
  SETUP_INTERPERSONAL_PROMPT,
  SETUP_TECHNICAL_SKILLS_PROMPT,
  SETUP_TITLE_POSITION_PROMPT,
} from "../prompts";
import { transformToArray } from "../helpers";
import { useMultipleAIResponses } from "./useAIResponses";

// The custom hook that abstracts the entire AI response setup and Redux interaction
export const useSetupAIResponses = (jobPosting: string) => {
  const dispatch = useDispatch();

  // Prompts for the AI
  const prompts = useMemo(
    () => [
      `${SETUP_TITLE_POSITION_PROMPT} ${jobPosting}`,
      `${SETUP_TECHNICAL_SKILLS_PROMPT} ${jobPosting}`,
      `${SETUP_CONCEPTS_PROMPT} ${jobPosting}`,
      `${SETUP_INTERPERSONAL_PROMPT} ${jobPosting}`,
    ],
    [jobPosting] // only recompute when jobPosting changes
  );

  // Use the custom hook for fetching multiple AI responses
  const queryResults = useMultipleAIResponses(prompts);

  // Extract the loading and error states from the query results
  const isLoading = queryResults.some((result) => result.isLoading);
  const error = queryResults.find((result) => result.error);

  // Once the data is available, process and dispatch it
  useEffect(() => {
    if (!isLoading && !error && queryResults.every((result) => result.data)) {
      const responses = queryResults.map(
        (result) => result.data.choices?.[0]?.message?.content
      );

      if (responses && responses.length === 4) {
        const [
          titleAndJobTitle,
          technicalSkills,
          concepts,
          interpersonalSkills,
        ] = responses;

        console.log(responses);

        // // Dispatching the results to Redux
        // const [formattedTitle, formattedJobTitle] = titleAndJobTitle.split(";");
        // dispatch(
        //   updateStringField({ field: "title", value: formattedTitle.trim() })
        // );
        // dispatch(
        //   updateStringField({
        //     field: "jobTitle",
        //     value: formattedJobTitle.trim(),
        //   })
        // );

        // dispatch(
        //   updateArrayField({
        //     field: "KeyAttributes.technicalSkills",
        //     value: transformToArray(technicalSkills),
        //   })
        // );

        // dispatch(
        //   updateArrayField({
        //     field: "KeyAttributes.concepts",
        //     value: transformToArray(concepts),
        //   })
        // );

        // dispatch(
        //   updateArrayField({
        //     field: "KeyAttributes.interpersonalSkills",
        //     value: transformToArray(interpersonalSkills),
        //   })
        // );
      }
    }
  }, [isLoading, error, queryResults, dispatch]);

  // Returning the loading and error states, along with the formatted AI data
  return { isLoading, error };
};
