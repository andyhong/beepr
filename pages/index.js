import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Link,
  Icon,
  Stack
} from '@chakra-ui/core'

const Home = () => {
  const [ session, loading ] = useSession()
  const router = useRouter()

  useEffect(() => {
    session && router.push("/text", "/text")
  }, [session])

  return (
    <>
      <Box
        as="header"
        backgroundColor="blue.500"
      >
        <Flex
          p="3rem"
          direction="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          maxW="25rem"
          mx="auto"
        >
          <Heading
            fontSize="5rem"
            color="white"
            letterSpacing="tighter"
            mb={4}
          >
            beepr.
          </Heading>
          <Text
            color="white"
            fontSize="xl"
            letterSpacing="tight"
            mb={8}
          >
            A free, mobile-minded, <br />
              <Link href="https://planning.center">
                <Text as="u" fontWeight="bold">Planning Center</Text>
              </Link>
            {` `} app to page parents during church.
          </Text>
          <Button
            mb={4}
            size="lg"
            leftIcon="pco"
            backgroundColor="white"
            color="blue.500"
            fontWeight="medium"
            onClick={() => signIn("pco", { callbackUrl: `${process.env.NEXT_PUBLIC_URL}/text` })}
          >
            Log in with PCO
          </Button>
          <Link href="/demo">
            <Text as="u" fontWeight="bold" color="white">Try our demo &rarr;</Text>
          </Link>
        </Flex>
      </Box>
      <Box
        as="main"
      >
       <Flex
          px="3rem"
          py="4rem"
          direction="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          maxW="25rem"
          mx="auto"
        >
          <Heading
            letterSpacing="tighter"
            size="xl"
            mb={10}
            borderBottom="4px solid"
          >
            how it works.
          </Heading>
          <Stack
            direction="column"
            spacing={12}
          >
            <Box>
              <Icon name="check" size="2rem" color="blue.300" mb={2}/>
              <Heading size="lg" mb={2}>Login with PCO</Heading>
              <Text
                letterSpacing="tight"
                lineHeight="shorter"
              >
                Our app uses your Planning Center account to find active services and check-ins associated with those services. This way you don’t have to remember another password!
              </Text>
            </Box>
            <Box>
              <Icon name="check" size="2rem" color="blue.300" mb={2}/>
              <Heading size="lg" mb={2}>Security code <br />on claim tags</Heading>
              <Text
                letterSpacing="tight"
                lineHeight="shorter"
              >
                By using the unique security code on the child’s claim tag, our app is able to look up the emergency contact that checked them in.
              </Text>
            </Box>
            <Box>
              <Icon name="check" size="2rem" color="blue.300" mb={2}/>
              <Heading size="lg" mb={2}>Automated texts</Heading>
              <Text
                letterSpacing="tight"
                lineHeight="shorter"
              >
                A text message is sent to that person to let them that their assistance is required at their child’s classroom.
              </Text>
            </Box>
            <Box>
              <Icon name="check" size="2rem" color="blue.300" mb={2}/>
              <Heading size="lg" mb={2}>Completely secure</Heading>
              <Text
                letterSpacing="tight"
                lineHeight="shorter"
              >
                Since this app was built to be utilized by both staff and volunteers, we felt it was important that no household information would be displayed at any time. Everything is being done behind the scenes!
              </Text>
            </Box>
          </Stack>
        </Flex>
        <Flex
          as="footer"
          borderTop="1px solid"
          borderTopColor="gray.100"
          height="6rem"
          direction="column"
          justifyContent="center"
          textAlign="center"
        >
          Made with ❤️.
        </Flex>
      </Box>
    </>
  )
}

export default Home
