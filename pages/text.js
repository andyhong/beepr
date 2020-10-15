import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Flex,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/core'
import fetch from 'isomorphic-unfetch'

import Container from '../components/Container'
import Home from './index'

const Text = () => {
  const [ session, loading ] = useSession()
  const router = useRouter()

  const [code, setCode] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)
  const [ authorized, setAuthorized ] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (session) {
      if (session.user.permission === "Editor" || session.user.permission === "Viewer") {
        setAuthorized(true)
      }
      return
    }
    router.replace("/text", "/", { shallow: true })
  },[session])

  const sendText = async (e) => {
    setIsLoading(true)
    let toastInfo = {}

    if (code.length === 4) {
      const options = {
        method: "POST"
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/text/${code}`, options)
      toastInfo = await response.json()
    } else {
      toastInfo = {
        status: "error",
        title: "Invalid code!",
        description: "Please check your code and try again."
      }
    }

    toast({
      title: toastInfo.title,
      status: toastInfo.status,
      description: toastInfo.description,
      duration: 3000,
      isClosable: true,
      position: "top",
    })
    setCode("")
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>beepr.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session && <>
        <Home />
      </>}
      {session && <>
        <Container>
          <Flex direction="column">
            {!authorized && <>
              <Alert
                status="warning"
                variant="left-accent"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
                p={4}
              >
                <AlertIcon mb={1}/>
                <AlertTitle>You don't have permission!</AlertTitle>
                <AlertDescription
                  fontSize="sm"
                  maxWidth="sm"
                >
                  Permission can only be granted by staff members.
                </AlertDescription>
              </Alert>
            </>}
            <FormControl my={4}>
              <FormLabel htmlFor="code" color="white">Code</FormLabel>
              <Input
                id="code"
                placeholder="A1B2"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                isDisabled={!authorized}
              />
              <FormHelperText color="white">
                You can find this on the child's nametag.
              </FormHelperText>
            </FormControl>
            <Button
              mt={2}
              size="lg"
              width="6rem"
              onClick={sendText}
              isLoading={isLoading}
              isDisabled={!authorized}
              variant="outline"
              color="white"
              fontWeight="bold"
              _hover= {{ color: "blue.500", backgroundColor: "white" }}
            >
              Send
            </Button>
          </Flex>
        </Container>
        </>}
    </>
  )
}

export default Text
