import React, { FC } from "react";
import { PartnerFormValues, partnerSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AddPartnerFormProps = {
	onSubmit: (data: PartnerFormValues) => void;
};

export const AddPartnerForm: FC<AddPartnerFormProps> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm<PartnerFormValues>({
		resolver: zodResolver(partnerSchema),
		defaultValues: {
			name: "",
			firstLastName: "",
			secondLastName: "",
			email: "",
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
			<Input id="name" {...register("name")} placeholder="Francisco Felipe" />
			{errors.name && (
				<p className="text-sm text-red-500">{errors.name.message}</p>
			)}
			<Input
				id="firstLastName"
				{...register("firstLastName")}
				placeholder="Rojas"
			/>
			{errors.firstLastName && (
				<p className="text-sm text-red-500">{errors.firstLastName.message}</p>
			)}
			<Input
				id="secondLastName"
				{...register("secondLastName")}
				placeholder="Robles"
			/>
			{errors.secondLastName && (
				<p className="text-sm text-red-500">{errors.secondLastName.message}</p>
			)}
			<Input
				id="email"
				{...register("email")}
				placeholder="email@example.com"
			/>
			{errors.email && (
				<p className="text-sm text-red-500">{errors.email.message}</p>
			)}
			<Button type="submit" disabled={isLoading} aria-disabled={isLoading}>
				Agregar
			</Button>
		</form>
	);
};
