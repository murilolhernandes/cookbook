// import Link from "next/link";
import Footer from '@/components/footer';
import Header from '@/components/header';
import LoginForm from '@/app/ui/login-form'
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <div>
      <Header />

      <main className='min-h-screen'>
        <Suspense>
          <LoginForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}