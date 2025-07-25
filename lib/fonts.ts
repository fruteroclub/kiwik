// import localFont from 'next/font/local'
import { Raleway, Space_Grotesk as SpaceGrotesk, Inter } from 'next/font/google'

// Fallback to Inter for Funnel Display until font files are available
export const funnelDisplay = Inter({
  subsets: ['latin'],
  variable: '--font-funnel',
  weight: ['400', '500', '600'],
  display: 'swap',
})

// Fallback to Inter for Ledger until font files are available  
export const ledger = Inter({
  subsets: ['latin'],
  variable: '--font-ledger',
  weight: ['400'],
  display: 'swap',
})

// TODO: Uncomment when font files are available
// export const funnelDisplay = localFont({
//   src: [
//     {
//       path: '../../public/fonts/FunnelDisplay-VariableFont_wght.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-funnel',
//   display: 'swap',
//   preload: true,
// })

// export const ledger = localFont({
//   src: [
//     {
//       path: '../../public/fonts/Ledger-Regular.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-ledger',
//   display: 'swap',
//   preload: true,
// })

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--raleway',
})

const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--space-grotesk',
})

// Export all fonts
export const fonts = {
  funnelDisplay,
  ledger,
  raleway,
  spaceGrotesk,
}
