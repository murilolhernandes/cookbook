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
    const recipeName = formData.get('recipe_name') as string;
    const imageFile = formData.get('imageSrc') as File; // add logic to cloudinary.
    const imageAlt = formData.get('imageAlt') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const prepTimeRaw = formData.get('prep_time') as string;
    const prepTime = parseInt(prepTimeRaw, 10); // probably needs to be adjusted. Needs review bc db field is int8 but how can we know if it's minutes, hours, or both?

    const fields = { recipeName, imageAlt, description, category, prepTime };

    const { error: dbError } = await supabase
      .from('recipes')
      .insert({
        user_id: userId,
      });

    if (dbError) {
      console.error("Database error inserting recipe: ", dbError);
      return { message: "Failed to save the recipe to the database.", fields };
    }

    return { message: "Recipe added successfully!" };
  } catch (error) {
    console.error("Unexpected error in addRecipe action: ", error);
    // return { message: "An unexpected error occurred. Please try again.", fields };
    return { message: "An unexpected error occurred. Please try again." };

  }
}