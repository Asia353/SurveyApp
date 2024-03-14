/* eslint-disable @typescript-eslint/no-shadow */
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

// eslint-disable-next-line import/prefer-default-export
export function ModalElement({
  closeFunction,
  handleOpen,
  isOpen,
  onOpen,
  onClose,
}: {
  closeFunction: () => void;
  handleOpen: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
            <ModalBody>
              <p>
                Deleting this item cannot be undone. Are you sure you want to
                delete this item?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose} onClick={closeFunction}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
