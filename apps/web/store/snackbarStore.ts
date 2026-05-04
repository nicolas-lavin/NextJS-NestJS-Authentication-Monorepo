import { VariantT } from "@/lib/type";
import { create } from "zustand";

interface SnackbarContentT {
	isOpen?: boolean;
	message: string;
	variant: VariantT;
}

interface SnackbarStoreStateI extends SnackbarContentT {
	showError: (message: string) => void;
	showSuccess: (message: string) => void;
	showInfo: (message: string) => void;
	onClose: () => void;
}

const initialState: SnackbarContentT = {
	isOpen: false,
	message: "",
	variant: "error",
};

const useSnackbarStore = create<SnackbarStoreStateI>()((set) => ({
	...initialState,
	showError: (message: string) => {
		return set(() => ({
			message,
			variant: "error",
			isOpen: true,
		}));
	},
	showSuccess: (message: string) => {
		return set(() => ({
			message,
			variant: "success",
			isOpen: true,
		}));
	},
	showInfo: (message: string) => {
		return set(() => ({
			message,
			variant: "info",
			isOpen: true,
		}));
	},
	onClose: () => {
		return set((state) => ({
			...state,
			isOpen: false,
		}));
	},
}));

export default useSnackbarStore;
