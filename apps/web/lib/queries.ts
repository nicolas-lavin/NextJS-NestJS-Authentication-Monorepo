import { useQuery } from "@tanstack/react-query";
import { getPartners } from "./actions";

export const useGetPartners = () => {
	const response = useQuery({
		queryKey: ["partner"],
		queryFn: () => getPartners(),
	});
	return response;
};
