"use client";
import React from "react";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import PartnerCard from "@/components/ui/partnerCard";
import Modal from "@/components/ui/modal";
import { AddPartnerForm } from "./form";
import { PartnerFormValues } from "./schema";
import { createPartner } from "@/lib/actions";
import { useGetPartners } from "@/lib/queries";
import { PartnerSkeleton } from "./skeleton";
import { useSnackbarStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";

const PartnerTemplate = () => {
	const queryClient = useQueryClient();
	const [openForm, setOpenForm] = React.useState(false);
	const onCloseButton = () => setOpenForm(false);
	const { data: partners, isLoading } = useGetPartners();
	const { showError, showSuccess } = useSnackbarStore((state) => state);

	const onCreatePartnerSubmit = (data: PartnerFormValues) => {
		createPartner(data)
			.then(() => {
				console.log("Partner created successfully");
				queryClient.invalidateQueries({ queryKey: ["partner"] });
				onCloseButton();
				showSuccess("Partner created successfully");
			})
			.catch((error) => {
				console.error("Error creating partner:", error);
				showError("Error creating partner");
			});
	};

	console.log("Partners data:", partners);

	return (
		<Flex direction="column" gap="5" className="p-5">
			<Grid columns={{ initial: "2", md: "6" }}>
				<Box gridColumnStart={{ initial: "2", md: "6" }} className="text-end">
					<Button size="2" color="indigo" onClick={() => setOpenForm(true)}>
						Add Partner
					</Button>
				</Box>
			</Grid>
			<Grid columns={{ initial: "1", md: "4" }} gap="3" width="auto">
				{isLoading ? (
					<PartnerSkeleton />
				) : (
					partners?.map((partner) => {
						return (
							<PartnerCard
								key={partner.email}
								name={partner.name}
								email={partner.email}
								status={partner.status}
							/>
						);
					})
				)}
			</Grid>
			<Modal open={openForm} onCloseButton={onCloseButton} title="Añadir Socio">
				<AddPartnerForm onSubmit={onCreatePartnerSubmit} />
			</Modal>
		</Flex>
	);
};

export default PartnerTemplate;
