import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='bg-light'>{children}</body>
    </html>
  );
}
