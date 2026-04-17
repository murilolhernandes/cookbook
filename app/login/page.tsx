// import Link from "next/link";
import { redirect } from 'next/navigation';
import LoginForm from '@/app/ui/login/login-form'
import { Metadata } from 'next';
import { Suspense } from 'react';
import { createServerSupabaseClient } from '@/utils/supabase/server';


export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page',
};

export default async function LoginPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/account');
  }

  return (
    <div className='min-h-screen'>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}