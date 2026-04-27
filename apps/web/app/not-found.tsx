import { Flex, Text, Button, Heading, Container } from "@radix-ui/themes";
import Link from "next/link";

export default function NotFound() {
	return (
		<Container size="2">
			<Flex
				direction="column"
				align="center"
				justify="center"
				gap="4"
				style={{ height: "100vh" }}
			>
				<Heading size="9">404</Heading>
				<Text size="5" color="gray">
					The page you're looking for doesn't exist.
				</Text>
				<Button size="3" variant="soft">
					<Link href="/">Return Home</Link>
				</Button>
			</Flex>
		</Container>
	);
}
