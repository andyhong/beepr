import { theme as chakraTheme } from '@chakra-ui/core'

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
  icons: {
    ...chakraTheme.icons,
    pco: {
      path: (
        <g fill="currentColor">
          <path d="M20.65,12.71,17,13.87a4.11,4.11,0,0,1-2.38,0L11,12.8a.3.3,0,0,0-.39.29V17.5a.31.31,0,0,0,.22.29l4.43,1.33a1.81,1.81,0,0,0,1.08,0l4.48-1.43a.29.29,0,0,0,.21-.29V13A.31.31,0,0,0,20.65,12.71Z"/><path d="M28.05,3.24,18.42.38a8.89,8.89,0,0,0-5.16,0L3.63,3.24A5.19,5.19,0,0,0,0,8.19V23.81a5.19,5.19,0,0,0,3.63,5l9.63,2.86a8.89,8.89,0,0,0,5.16,0l9.63-2.86a5.19,5.19,0,0,0,3.63-5V8.19A5.19,5.19,0,0,0,28.05,3.24ZM24.26,18.39a2.27,2.27,0,0,1-1.62,2.18L17,22.25a4,4,0,0,1-2.31,0l-3.79-1.14a.22.22,0,0,0-.28.21v2.56a.81.81,0,0,1-1,.78L8,24.18a.8.8,0,0,1-.58-.77V11.5a2.27,2.27,0,0,1,2.92-2.18l4.95,1.45a1.86,1.86,0,0,0,1.07,0l4.95-1.55a2.27,2.27,0,0,1,3,2.17Z"/>
        </g>
      ),
      viewBox: "0 0 32 32"
    }
  }
}

export default theme
