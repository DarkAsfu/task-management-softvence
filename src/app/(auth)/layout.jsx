import '../globals.css'

export const metadata = {
  title: 'Task Management App | Softvence',
  description: 'Task Management App | Softvence'
}

export default function AuthLayout ({ children }) {
  return (
    <html lang='en'>
      <body
      >
        {children}
      </body>
    </html>
  )
}
