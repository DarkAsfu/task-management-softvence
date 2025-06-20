import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata = {
  title: 'Task Management App | Softvence',
  description: 'Task Management App | Softvence'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
