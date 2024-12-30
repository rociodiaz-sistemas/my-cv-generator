// src/database/cvOperations.ts
import { CV } from "../store/types";
import { db } from "./CVDatabase";

// Add a new CV
export async function addCV(cv: CV): Promise<void> {
  try {
    await db.cvs.add(cv);
  } catch (error) {
    console.error("Error adding CV:", error);
  }
}

// Get all CVs
export async function getAllCVs(): Promise<CV[]> {
  try {
    return await db.cvs.toArray();
  } catch (error) {
    console.error("Error fetching all CVs:", error);
    return [];
  }
}

// Update a CV by ID
export async function updateCV(
  id: string,
  updates: Partial<CV>
): Promise<void> {
  try {
    await db.cvs.update(id, updates);
  } catch (error) {
    console.error("Error updating CV:", error);
  }
}

// Delete a CV by ID
export async function deleteCV(id: string): Promise<void> {
  try {
    await db.cvs.delete(id);
  } catch (error) {
    console.error("Error deleting CV:", error);
  }
}
