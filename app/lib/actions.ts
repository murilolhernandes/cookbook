'use server'

import { createServerSupabaseClient } from '@/utils/supabase/server';


export async function addRecipe(
  prevState: { message: string } | undefined,
  formData: FormData
) {
  try {
    const supabase = await createServerSupabaseClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { message: "You must be logged in to submit a recipe."};
    }

    const userId = user.id;

    const fields = {  };

    const { error: dbError } = await supabase
      .from('recipes')
      .insert({
        user_id: userId,
      });

    if (dbError) {
      console.error("Database error inserting recipe: ", dbError);
      return { message: "Failed to save the recipe to the database." };
    }

    return { message: "Recipe added successfully!" };
  } catch (error) {
    console.error("Unexpected error in addRecipe action: ", error);
    return { message: "An unexpected error occurred. Please try again." };
  }
}