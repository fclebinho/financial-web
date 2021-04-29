import React from 'react'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, Stack, useDisclosure } from '@chakra-ui/react'
import { RiAddLine } from 'react-icons/ri'

export const CreateFinancial: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button leftIcon={<RiAddLine />} size="sm" colorScheme="red" onClick={onOpen}>
        Criar novo
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
				colorScheme="red"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader borderBottomWidth="1px">
              Create
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="username">Descrição</FormLabel>
                  <Input
										size="sm"
                    id="username"
                    placeholder="Please enter user name"
                  />
                </Box>

              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button size="sm" variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button size="sm" colorScheme="red">Submit</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}