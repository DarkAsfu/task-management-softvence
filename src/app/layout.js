import { Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './provider/AuthProvider'
import { Toaster } from 'react-hot-toast'

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

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
