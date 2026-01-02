import LayoutClient from './components/LayoutClient';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from '../context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'PayRemind - Payment Reminder Dashboard',
  description: 'Manage and track payment reminders efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-[#1A222C] min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <LayoutClient>{children}</LayoutClient>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
