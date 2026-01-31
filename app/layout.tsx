import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Header  from "../components/Header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Используем generateMetadata для кириллицы
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ПП Рецепты - Здоровое питание",
    description: "Лучшие рецепты правильного питания для похудения",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Header />
          {children}
          </Providers>
      </body>
    </html>
  )
}