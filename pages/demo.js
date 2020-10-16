import { useState, useEffect } from 'react'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Flex,
  useToast,
  Box,
  Heading,
  Text
} from '@chakra-ui/core'

import Container from '../components/Container'


const Demo = () => {

  const [ code, setCode ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)
  const toast = useToast()

  const [ intro, setIntro ] = useState(true)
  const [ success, setSuccess ] = useState(false)
  const [ fail, setFail ] = useState(false)

  const sendDemoText = async (e) => {
    setIsLoading(true)
    let toastInfo = {}

    if (code.toUpperCase() === "BEEP") {
      toastInfo = {
        status: "success",
        title: "Message sent!",
        description: "Wasn't that easy?"
      }
      setIntro(false)
      setSuccess(true)
      setFail(false)

    } else {
      toastInfo = {
        status: "error",
        title: "Invalid code!",
        description: "Please check your code and try again."
      }
      setIntro(false)
      setSuccess(false)
      setFail(true)
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
      <Container variant="demo">
        <Flex direction="column">
          <FormControl my={4}>
            <FormLabel htmlFor="code" color="white">Code</FormLabel>
            <Input
              id="code"
              placeholder="A1B2"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <FormHelperText color="white">
              You can find this on the child's nametag.
            </FormHelperText>
          </FormControl>
          <Button
            mt={2}
            size="lg"
            width="6rem"
            onClick={sendDemoText}
            isLoading={isLoading}
            variant="outline"
            color="white"
            fontWeight="bold"
            _hover= {{ color: "blue.500", backgroundColor: "white" }}
          >
            Send
          </Button>
        </Flex>
        <Box
          mt={8}
          py={4}
          color="white"
          borderTop="5px solid"
        >
          {intro && <>
            <Heading letterSpacing="tighter" mb={2}>Hi there! 👋</Heading>
            <Text letterSpacing="tight" mb={2}>
              Welcome to our demo. This is the UI you will see after logging in with PCO. We value simplicity and ease of use, so we made sure to create an UI that was intuitive for anyone to use. Due to the private and secure nature of the app, this demo will utilize mock data and text messages will not be sent.
            </Text>
            <Text letterSpacing="tight" mb={2} fontWeight="medium">
              To see how our app works, please enter <br /> code
              <Text as="em" fontWeight="bold" fontSize="lg"> BEEP </Text>
              into the input field and hit "Send".
            </Text>
          </>}
          {success && <>
            <Heading letterSpacing="tighter" mb={2}>Nice! 🎉</Heading>
            <Text letterSpacing="tight" mb={2}>
              That's what you'll see when you've entered a security code that matches with an emergency contact in your database. That means that a text message was sent to that person on file.
              <Text as="em"> Wasn't that easy?</Text>
            </Text>
            <Text letterSpacing="tight" mb={2}>
              Now try typing in any other code and see what happens...
            </Text>
          </>}
          {fail && <>
            <Heading letterSpacing="tighter" mb={2}>Uh oh! ⚠️</Heading>
            <Text letterSpacing="tight" mb={2}>
              Looks like you entered the wrong code. You'll see an error message whenever you mistype a security code or we could not find a phone number that matches with that child to text.
            </Text>
            <Text letterSpacing="tight" mb={2} fontWeight="medium">
              Try the code <Text as="em" fontWeight="bold" fontSize="lg"> BEEP </Text> to see what a correct code looks like.
            </Text>
          </>}
        </Box>
      </Container>
    </>
  )
}

export default Demo
