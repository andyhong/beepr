import { Box, Flex, Heading, Button } from '@chakra-ui/core'
import { signOut } from "next-auth/client"

const Container = ({ children }) => {

  return (
    <Box
      h="100vh"
      backgroundColor="blue.500"
    >
      <Flex
        px="3rem"
        py="4rem"
        direction="column"
        maxW="30rem"
        mx="auto"
      >
        <Flex
          pt={4}
          pr={1}
          borderBottom="5px solid"
          borderBottomColor="White"
          my={2}
        >
          <Heading
            w="full"
            letterSpacing="tighter"
            color="white"
            justifyContent="space-between"
          >
            beepr.
          </Heading>
          <Button
            variant="link"
            color="white"
            mb={-2}
            onClick={() => signOut()}
          >
            Log out
          </Button>
        </Flex>
        {children}
      </Flex>
    </Box>
  )
}

export default Container
