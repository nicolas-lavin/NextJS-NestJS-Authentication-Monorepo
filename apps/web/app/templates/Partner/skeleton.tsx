import { Skeleton } from "@radix-ui/themes";
import React from "react";

export const PartnerSkeleton = () => {
	return (
		<>
			{Array.from({ length: 16 }).map((_, index) => (
				<Skeleton key={index} height="168px" width="100%" />
			))}
		</>
	);
};
