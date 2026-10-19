import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import WhatsAppFloat from './components/WhatsAppFloat';
import QuickEnquiryPopup from './components/QuickEnquiryPopup';

export const metadata = {
  title: 'BlueMoon Properties | International Corporate Real Estate',
  description: 'An ultra-premium real estate brand offering luxury villas, commercial properties, and premium lands.',
  icons: {
    icon: [
      { url: '/favicon-32x32.png?v=3', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png?v=3', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico?v=3', sizes: 'any' },
    ],
    shortcut: '/favicon.ico?v=3',
    apple: [
      { url: '/apple-icon.png?v=3', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
        <QuickEnquiryPopup />
      </body>
    </html>
  );
}
