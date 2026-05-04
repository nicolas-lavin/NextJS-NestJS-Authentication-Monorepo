"use client";
import React from "react";
import * as Toast from "@radix-ui/react-toast";
import {
	CheckCircledIcon,
	CrossCircledIcon,
	InfoCircledIcon,
} from "@radix-ui/react-icons";
import { useSnackbarStore } from "@/store";
import "./styles.css";
import { VariantT } from "@/lib/type";

const titleDictionary: Record<VariantT, string> = {
	success: "Tarea exitosa",
	error: "Error",
	info: "Información",
};

const SnackBarTitle = ({ variant }: { variant: VariantT }) => {
	return (
		<div className="flex items-center gap-2">
			{variant === "success" && (
				<CheckCircledIcon className="text-green-500 w-6 h-6" />
			)}
			{variant === "error" && (
				<CrossCircledIcon className="text-red-500 w-6 h-6" />
			)}
			{variant === "info" && (
				<InfoCircledIcon className="text-blue-500 w-6 h-6" />
			)}
			<p>{titleDictionary[variant]}</p>
		</div>
	);
};

const SnackBarCloseButton = ({ variant }: { variant: VariantT }) => {
	return (
		<button
			className={`Button small ${variant === "success" ? "green" : variant === "error" ? "red" : "blue"}`}
		>
			Cerrar
		</button>
	);
};

const SnackBar = () => {
	const {
		onClose,
		isOpen,
		variant = "success",
		message,
	} = useSnackbarStore((state) => state);

	return (
		<Toast.Provider swipeDirection="right" duration={5000}>
			<Toast.Root className="ToastRoot" open={isOpen} onOpenChange={onClose}>
				<Toast.Title className="ToastTitle">
					<SnackBarTitle variant={variant} />
				</Toast.Title>
				<Toast.Description className="ToastDescription" asChild>
					<p>{message}</p>
				</Toast.Description>
				<Toast.Action
					className="ToastAction"
					asChild
					altText="cerrar notificación"
				>
					<SnackBarCloseButton variant={variant} />
				</Toast.Action>
			</Toast.Root>
			<Toast.Viewport className="ToastViewport" />
		</Toast.Provider>
	);
};

export default SnackBar;
