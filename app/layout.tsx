import PromtInput from '@/components/PromtInput'
import './globals.css'
import Header from '@/components/Header'
import ClientProvider from '@/components/ClientProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <ClientProvider>
        <Header />
        <PromtInput />
        {children}
      </ClientProvider>
      </body>
    </html>
  )
}
