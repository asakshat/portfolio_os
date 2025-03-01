import { Metadata } from 'next'
import { VT323 } from 'next/font/google'
import './globals.css'

const vt323 = VT323({ 
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Sakshat Adhikari Portfolio',
  description: 'A retro computer-themed portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={vt323.className} > 
        <div className="min-h-screen bg-black text-green-500">
          <div className="container mx-auto">
            <header className="border-b border-green-500 p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl">/home/sakshat/&gt; Better UI/features experience on larger screens.</h1>
              </div>
            </header>
            {children}  
          </div>
        </div>
      </body>
    </html>
  )
}