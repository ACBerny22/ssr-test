import type { Metadata } from 'next'
import { Inter, Quicksand } from 'next/font/google'
import './globals.css'
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '@/components/NavBar';
import clsx from 'clsx';
import NewPostButton from '@/components/NewPostButton';

const pops = Quicksand({ subsets: ['latin'], weight:['300', '500', '400'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Harmony Posts',
  description: 'Generated by create next app',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={clsx(pops.className, 'bg-gray-900 text-white')}>
        <Toaster position="bottom-center" />
        <NavBar></NavBar>
        <section className='mt-24'>
          {children}
        </section>
        <NewPostButton></NewPostButton>
      </body>
    </html>
  )
}
