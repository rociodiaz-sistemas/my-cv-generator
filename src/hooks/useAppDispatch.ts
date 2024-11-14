import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

// Typed `useDispatch` for Redux Thunks
export const useAppDispatch = () => useDispatch<AppDispatch>();
