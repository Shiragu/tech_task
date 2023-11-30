import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/appStore";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppState: TypedUseSelectorHook<RootState> = useSelector;
