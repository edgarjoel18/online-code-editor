import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";

// to access the state store
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
