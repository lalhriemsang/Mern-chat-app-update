import { useDisclosure } from '@chakra-ui/hooks';
import { ViewIcon } from '@chakra-ui/icons';
import { Image, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { Button, IconButton, Modal } from '@mui/material';
import React from 'react'

const ProfileModal = ({user,children}) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
        { children ? (
        <span onClick={onOpen}>{children}</span>
        ) : (
            <IconButton
            d={{ base: "flex"}}
            icon={<ViewIcon/>}
            onClick={onOpen}/>
    )}
    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work Sans"
            d="flex"
            justifyContent="centre"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
            />
            <Text>
                fontSize={{base: "28px", md: "30px"}}
                fontFamily="Work sans"
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </>
  );

    
}

export default ProfileModal