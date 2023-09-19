import * as React from "react";

import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    Text,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {useEffect, useState} from "react";


interface Props {
    modalTitle?: string;
    modalContent: string;
    onClose: () => void;
    isOpen: boolean;
}

const ModalHelper = (props: Props) => {

    return (<Modal size="xs"
                   onClose={props.onClose}
                   isOpen={props.isOpen}
    >
        <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)'/>
        <ModalContent>
            <ModalHeader>{props.modalTitle}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Text>{props.modalContent}</Text>
            </ModalBody>
        </ModalContent>
    </Modal>);
}

export default ModalHelper;
