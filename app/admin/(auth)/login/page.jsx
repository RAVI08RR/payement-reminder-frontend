import AdminLoginForm from '@/components/auth/AdminLoginForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

export default function AdminLoginPage() {
  return (
    <AuthPageLayout 
        title="Admin Portal" 
        subtitle="Secure access for administrators"
    >
      <AdminLoginForm />
    </AuthPageLayout>
  );
}
