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
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login');
  }

  const { data: categories, error } = await supabase
    .from('categories')
    .select('category_id, category_name')
    .order('category_name', { ascending: true });

  if (error) {
    console.error("Error fetching categories: ", error);
    return { message: "Category drop down failed." };
  }

  return (
    <div className="container-earth section-padding min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className='text-4xl font-bold mb-10 text-center'>
          Create a Product Listing!
        </h1>
        <Suspense fallback={<div>Loading form...</div>}>
          <SubmitRecipeForm categories={categories || []}/>
        </Suspense>
      </div>
    </div>
  )
}