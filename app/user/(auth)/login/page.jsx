
import UserLoginForm from '@/components/auth/UserLoginForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';
import Link from 'next/link';

export default function UserLoginPage() {
  const footerLink = (
    <>
      <span className="text-gray-500">New User? </span>
      <Link href="/user/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors ml-1">
          Sign Up
      </Link>
    </>
  );

  return (
    <AuthPageLayout 
        title="Welcome Back!" 
        subtitle="Login to continue"
        footerLink={footerLink}
    >
      <UserLoginForm />
    </AuthPageLayout>
  );
}
