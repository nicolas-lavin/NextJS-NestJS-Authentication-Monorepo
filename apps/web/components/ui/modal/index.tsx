"use client";
import * as React from "react";
import {
	Root,
	Portal,
	Overlay,
	Content,
	Title,
	Description,
	Close,
} from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";

type ModalProps = {
	open: boolean;
	onCloseButton: () => void;
	title?: string;
	description?: string;
	children?: React.ReactNode;
};

const Modal = ({
	open = false,
	onCloseButton,
	title = "",
	description = "",
	children,
}: ModalProps) => (
	<Root open={open}>
		<Portal>
			<Overlay className="DialogOverlay" />
			<Content className="DialogContent">
				<Title className="DialogTitle">{title}</Title>
				<Description className="DialogDescription">{description}</Description>
				{children}
				<Close asChild onClick={onCloseButton}>
					<button className="IconButton" aria-label="Close">
						<Cross2Icon />
					</button>
				</Close>
			</Content>
		</Portal>
	</Root>
);

export default Modal;
