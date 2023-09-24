import * as React from "react";

import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";


interface Props {
    modalTitle?: string;
    onClose: () => void;
    isOpen: boolean;
    childComponent: React.ReactNode
    size?: string;
    overlayClickEnabled?: boolean;
}

const ModalHelper = (props: Props) => {

    return (<Modal size={props.size ? props.size : 'xs'} blockScrollOnMount={false}
                   closeOnOverlayClick={!!props.overlayClickEnabled}
                   onClose={props.onClose}
                   isOpen={props.isOpen}>
        <ModalOverlay backdropFilter='blur(2px) hue-rotate(90deg)'/>
        <ModalContent>
            <ModalHeader>{props.modalTitle}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                {props.childComponent}
            </ModalBody>
        </ModalContent>
    </Modal>);
}

export default ModalHelper;
