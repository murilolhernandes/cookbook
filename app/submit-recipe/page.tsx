import { redirect } from 'next/navigation';
import SubmitRecipeForm from '../ui/recipe/submit-recipe-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Submit Recipe',
  description: 'Submit your Recipe',
};

export default async function SubmitRecipePage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="section-padding min-h-screen">
      <div className="max-w-2x1 mx-auto">
        <h1>
          Submit your Recipe!
        </h1>
        <Suspense fallback={<div>Loading form...</div>}>
          <SubmitRecipeForm />
        </Suspense>
        </div>
    </div>
  )
}