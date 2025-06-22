import ProtectedRoute from '@/app/modules/Auth/ProtectedRoute'

export default function RootLayout ({ children }) {
  return (
    <>
      <ProtectedRoute>{children}</ProtectedRoute>
    </>
  )
}
