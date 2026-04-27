import React from "react";
import { Box, Button, Flex, Grid, Table } from "@radix-ui/themes";
import PartnerCard from "@/components/ui/partnerCard";

const partners = [
	{
		name: "Danilo Sousa",
		email: "d@d.cl",
		status: "active",
	},
	{
		name: "Zahra Ambessa",
		email: "z@a.cl",
		status: "inactive",
	},
];

const Partners = async () => {
	return (
		<Flex direction="column" gap="5" className="p-5">
			<Grid columns={{ initial: "2", md: "6" }}>
				<Box gridColumnStart={{ initial: "2", md: "6" }} className="text-end">
					<Button size="2" color="indigo">
						Add Partner
					</Button>
				</Box>
			</Grid>
			<Grid columns={{ initial: "1", md: "4" }} gap="3" width="auto">
				{partners.map((partner) => {
					return (
						<PartnerCard
							key={partner.email}
							name={partner.name}
							email={partner.email}
							status={partner.status as "active" | "inactive"}
						/>
					);
				})}
			</Grid>
		</Flex>
	);
};

export default Partners;
