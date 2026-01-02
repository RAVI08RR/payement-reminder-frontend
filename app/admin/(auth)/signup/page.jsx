import AdminSignupForm from '@/components/auth/AdminSignupForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

export default function AdminSignupPage() {
  return (
    <AuthPageLayout 
        title="Admin Registration" 
        subtitle="Create a new administrative account"
    >
      <AdminSignupForm />
    </AuthPageLayout>
  );
}
