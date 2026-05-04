import { z } from "zod";

export const partnerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	firstLastName: z
		.string()
		.min(2, "First last name must be at least 2 characters"),
	secondLastName: z
		.string()
		.min(2, "Second last name must be at least 2 characters"),
	email: z.email("Invalid email address"),
});

// Infer the type from the schema
export type PartnerFormValues = z.infer<typeof partnerSchema>;
