import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
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
import { getPermission } from '../utils/pco'

const Text = ({ session, permission }) => {
  const router = useRouter()

  const [code, setCode] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)
  const [ authorized, setAuthorized ] = useState(true)
  const toast = useToast()

  useEffect(() => {
    if (session) {
      if (!permission) {
        setAuthorized(false)
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/text/${code.toUpperCase()}`, options)
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
      {!session && <>
        <Home />
      </>}
      {session && <>
        <Container variant="app">
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

export async function getServerSideProps(context) {
  const session = await getSession(context)
  let permission = null
  if (session) {
    const permissionInfo = await getPermission(session.user.id)
    permission = permissionInfo
  }

  return {
    props: {
      session,
      permission
    }
  }
}

export default Text
