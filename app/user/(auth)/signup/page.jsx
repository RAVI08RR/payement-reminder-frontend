import UserSignupForm from '@/components/auth/UserSignupForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';
import Link from 'next/link';

export default function UserSignupPage() {
  const footerLink = (
    <>
      <span className="text-gray-500">Already have an account? </span>
      <Link href="/user/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors ml-1">
          Login
      </Link>
    </>
  );

  return (
    <AuthPageLayout 
        title="Join PayRemind" 
        subtitle="Start managing your payments today"
        footerLink={footerLink}
    >
      <UserSignupForm />
    </AuthPageLayout>
  );
}
