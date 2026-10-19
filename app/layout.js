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
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
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
