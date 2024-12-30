import Dexie, { Table } from "dexie";
import { CV } from "../store/types";

// Define the database class
class CVDatabase extends Dexie {
  cvs!: Table<CV, string>; // Table with 'id' as primary key

  constructor() {
    super("cvDatabase");
    this.version(1).stores({
      cvs: "id, title, jobTitle, date", // Indexes for faster querying
    });
  }
}

// Instantiate the database
export const db = new CVDatabase();
