import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import WhatsAppFloat from './components/WhatsAppFloat';
import QuickEnquiryPopup from './components/QuickEnquiryPopup';

export const metadata = {
  title: 'BlueMoon Properties | International Corporate Real Estate',
  description: 'An ultra-premium real estate brand offering luxury villas, commercial properties, and premium lands.',
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
