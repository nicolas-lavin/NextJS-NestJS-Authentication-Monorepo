import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar, Badge, Card, Flex, Text } from "@radix-ui/themes";
import { PartnerStatus } from "@/lib/type";

type PartnerCardProps = {
	name: string;
	email: string;
	status: PartnerStatus;
	className?: string;
};

const PartnerCard = ({ name, email, status, className }: PartnerCardProps) => {
	return (
		<Card
			size="2"
			className={cn("flex items-center text-center gap-3", className)}
		>
			<Flex direction="column" align="center" gap="2">
				<Avatar size="4" radius="full" fallback="T" color="indigo" />
				<Text as="p" size="3">
					{name}
				</Text>
				<Text as="p" size="2" color="gray">
					{email}
				</Text>
				<Badge color={status === PartnerStatus.ACTIVE ? "green" : "red"}>
					{status}
				</Badge>
			</Flex>
		</Card>
	);
};

export default PartnerCard;
