import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const footerLink = (
    <>
      <span className="text-gray-500">Remembered your password? </span>
      <Link href="/user/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors ml-1">
          Back to Login
      </Link>
    </>
  );

  return (
    <AuthPageLayout 
        title="Reset Password" 
        subtitle="Securely change your account password"
        footerLink={footerLink}
    >
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}
