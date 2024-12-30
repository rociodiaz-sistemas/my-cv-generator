import { CV } from "../store/types";
import { addCV } from "./CVOperations";
import { db } from "./CVDatabase";

export async function migrateLocalStorageData() {
  try {
    // Retrieve data from localStorage
    const storedCVs = localStorage.getItem("cvs");

    // Check if data exists in localStorage
    if (storedCVs) {
      // Parse the data into a JavaScript object
      const parsedCVs: CV[] = JSON.parse(storedCVs);

      // Insert each CV into the Dexie database
      for (const cv of parsedCVs) {
        await addCV(cv);
      }

      console.log("Data successfully migrated to the database!");
    } else {
      console.log("No data found in localStorage.");
    }
  } catch (error) {
    console.error("Error migrating data:", error);
  }
}
