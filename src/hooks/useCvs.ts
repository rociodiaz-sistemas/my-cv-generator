// src/hooks/useCVs.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCVs } from "../store/cvSlice";
import { db } from "../db/CVDatabase";

const useFetchCVs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        // Fetch all CVs from Dexie database
        const allCVs = await db.cvs.toArray(); // `cvs` is your Dexie table name
        // Dispatch the CVs to the Redux store
        dispatch(setCVs(allCVs));
      } catch (error) {
        console.error("Error fetching CVs:", error);
      }
    };

    fetchCVs();
  }, [dispatch]); // Only run this once when the component is mounted
};

export default useFetchCVs;
