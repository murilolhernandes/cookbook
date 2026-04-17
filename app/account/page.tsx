import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/utils/supabase/server';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Account',
  description: 'Account page',
};


export default async function AccountPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="section-padding min-h-screen max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Account Dashboard</h1>
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <p className="mb-2"><strong>Name:</strong> {user.user_metadata.full_name}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p><strong>Status:</strong> Successfully Authenticated 🎉</p>
      </div>
    </div>
  );
}