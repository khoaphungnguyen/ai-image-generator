import PromtInput from '@/components/PromtInput'
import './globals.css'
import Header from '@/components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      {/* Header */}
      <Header />
       {/* Prompt Input */}
       <PromtInput />
      {children}

      </body>
    </html>
  )
}
