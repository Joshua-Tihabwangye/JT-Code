import React from 'react'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'



export const metadata: Metadata = {
  title: 'B&G',
  description: 'Created with B&G',

}


export default function RootLayout({

   children,

}: Readonly<{
 children: React.ReactNode

}>) {

return (
 <html lang="en">
     <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
    </body>
 </html>

 )
}
