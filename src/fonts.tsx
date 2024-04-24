import { Inter, Playfair_Display, Poppins } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '400', '300', '500', '700', '800'],
})

export const inter = Inter({ subsets: ['latin'] })
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
})

export const kode = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
})
