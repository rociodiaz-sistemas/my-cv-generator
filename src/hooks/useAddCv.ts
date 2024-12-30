// src/hooks/useAddCV.ts
import { useDispatch } from "react-redux";
import { addCV } from "../store/cvSlice";
import { db } from "../db/CVDatabase"; // Import Dexie DB
import { CV } from "../store/types";

const useAddCV = () => {
  const dispatch = useDispatch();

  const addNewCV = async (newCV: CV) => {
    try {
      // Insert the new CV into Dexie database
      const id = await db.cvs.add(newCV); // Add to Dexie, Dexie auto-generates the id
      const addedCV = { ...newCV, id }; // Add the generated id to the new CV object

      // Dispatch the action to add the CV to the Redux store
      dispatch(addCV(addedCV));
    } catch (error) {
      console.error("Error adding CV:", error);
    }
  };

  return addNewCV;
};

export default useAddCV;
