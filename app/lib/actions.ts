'use server'

import { createServerSupabaseClient } from '@/utils/supabase/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


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
    const imageFile = formData.get('imageS_url') as File; // add logic to cloudinary.
    const imageAlt = formData.get('image_alt') as string;
    const description = formData.get('description') as string;
    const categoryRaw = formData.get('category') as string;
    const prepTimeRaw = formData.get('prep_time') as string;
    const prepTime = parseInt(prepTimeRaw, 10); // probably needs to be adjusted. Needs review bc db field is int8 but how can we know if it's minutes, hours, or both?
    const cookTime = formData.get('cook_time') as string; // probably needs to be adjusted. Needs review bc db field is int8 but how can we know if it's minutes, hours, or both?
    const additionalTime = formData.get('additional_time') as string; // probably needs to be adjusted. Needs review bc db field is int8 but how can we know if it's minutes, hours, or both?
    const serving = formData.get('serving') as string; // probably needs to be adjusted. Needs review bc db field is int8 but how can we know if it's minutes, hours, or both?
    const recipeYield = formData.get('recipe_yield') as string; // probably needs to be adjusted. Needs review bc db field is int8 but how can we know if it's minutes, hours, or both?
    const instructions = formData.get('instructions') as string; // need to add the same functionality as the one I had previously on Node.js

    const fields = { recipeName, imageAlt, description, categoryRaw, prepTime, cookTime, additionalTime, serving, recipeYield, instructions };

    const { error: dbError } = await supabase
      .from('recipes')
      .insert({
        user_id: userId,
      });

    if (dbError) {
      console.error("Database error inserting recipe: ", dbError);
      return { message: "Failed to save the recipe to the database.", fields };
    }

    if (!categoryRaw || typeof categoryRaw !== 'string') {
      return { message: "Please select a category." };
    }

    const categoryId = parseInt(categoryRaw, 10);

    if (isNaN(categoryId)) {
      return { message: "Invalid category selected." };
    }

    const { data: newRecipe, error: recipeError } = await supabase
      .from('recipes')
      .insert({
        user_id: user.id,
        recipe_name: recipeName,
        category_id: categoryId,
      })
      .select()
      .single();

    if (recipeError) throw recipeError;

    if (imageFile && typeof imageFile === 'object' && 'arrayBuffer' in imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64Image = `data:${imageFile.type};base64,${buffer.toString('base64')}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: 'family_recipes',
      });

      const { error: imageDbError } = await supabase
        .from('recipe_images')
        .insert({
          recipe_id: newRecipe.recipe_id,
          image_url: uploadResponse.secure_url,
          is_primary: true
        });

        if (imageDbError) {
          console.error("Failed to link image to recipe: ", imageDbError);
          return { message: "Recipe saved, but failed to link the image." };
        }
    }

    return { message: "Recipe and image added successfully!" };
  } catch (error) {
    console.error("Unexpected error in addRecipe action: ", error);
    // return { message: "An unexpected error occurred. Please try again.", fields };
    return { message: "An unexpected error occurred. Please try again." };

  }
}