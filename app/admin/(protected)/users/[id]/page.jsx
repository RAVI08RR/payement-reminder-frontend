'use client';

import React, { useState, useEffect } from 'react';
import EditUserForm from '@/components/admin/EditUserForm';
import { adminAPI } from '@/lib/api/admin';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function EditUserPage({ params }) {
  const router = useRouter();
  // Unwrap params using React.use() as per Next.js 13+ guidelines for dynamic routes in client components
  const { id } = use(params);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getUser(id);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setError('Failed to fetch user details');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      setSaving(true);
      const response = await adminAPI.updateUser(id, updatedData);
      
      if (response.ok) {
        router.push('/admin/users');
        router.refresh();
      } else {
        const err = await response.json();
        alert(err.message || 'Failed to update user');
      }
    } catch (err) {
      console.error('Update failed:', err);
      alert('An unexpected error occurred while updating');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="p-6 text-center">
            <p className="text-red-500">{error}</p>
            <button onClick={() => router.back()} className="mt-4 text-blue-600 hover:underline">Go Back</button>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Update User</h1>
        <p className="text-gray-500 dark:text-gray-400">Modify user details and permissions</p>
      </div>
      
      <EditUserForm 
        user={user} 
        onUpdate={handleUpdateUser} 
        loading={saving} 
      />
    </div>
  );
}
