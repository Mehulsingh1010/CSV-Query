import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import SupabaseProvider from '@/components/supabase-provider'
import { UserHeader } from '@/components/user-header'
import './globals.css'

const fontSans = GeistSans
const fontMono = GeistMono

export const metadata = {
  title: 'CSV Query App where you can upload files and ask queries about them',
  description: 'Upload and query CSV files using natural language',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="csv-query-theme"
        >
          <SupabaseProvider>
            <div className="flex flex-col min-h-screen">
              <UserHeader />
              <main className="flex-grow">
                {children}
              </main>
            </div>
            <Toaster />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

