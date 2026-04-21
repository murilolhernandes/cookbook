'use client'

import { ArrowRightIcon, ExclamationCircleIcon, PhotoIcon, TagIcon, Square2StackIcon, PencilSquareIcon, ClockIcon, CakeIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import { useActionState } from 'react';
import { addRecipe } from '@/app/lib/actions';

type Category = {
  category_id: number;
  category_name: string;
};

export default function SubmitRecipeForm({ categories }: { categories: Category[] }) {
  const [state, formAction, isPending] = useActionState(addRecipe, undefined);

  return (
    <div className='earth-card flex-1 p-8 mt-10'>
      <form action={formAction} className='w-full mx-auto'>
        <div>
          <label className='mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-stone-800' htmlFor='recipe_name'>
            Name of the Recipe
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-stone-200 py-[9px] pl-10 text-sm text-stone-900 outline-2 placeholder:text-stone-400 focus:border-stone-800 focus:ring-stone-800'
              id='recipe_name' type='text' name='recipe_name' placeholder='Enter the name of the recipe. (E.g. "Tasty Cake")' required
              defaultValue={state?.fields?.recipeName || ''}
              />
            <TagIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] -translate-y-1/2 text-stone-400 peer-focus:text-stone-800' />
          </div>
        </div>
        <div>
          <label className='mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-stone-800' htmlFor='description'>
            Description
          </label>
          <div className='relative'>
            <textarea
              rows={2}
              name='description'
              id='description'
              defaultValue={state?.fields?.description || ''}
              placeholder='Enter the description of the product. (E.g. "Perfect cake to bake on Sundays after church.")' required
              className='peer block w-full rounded-md border border-stone-200 py-[9px] pl-10 text-sm text-stone-900 outline-2 placeholder:text-stone-400 focus:border-stone-800 focus:ring-stone-800'
              />
              <PencilSquareIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] -translate-y-1/2 text-stone-400 peer-focus:text-stone-800' />
          </div>
        </div>
        <div>
          <label className='mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-stone-800' htmlFor="category">Category</label>
          <div className='relative'>
            <select 
              className='peer block w-full rounded-md border border-stone-200 py-[9px] pl-10 text-sm text-stone-900 outline-2 focus:border-stone-800 focus:ring-stone-800' 
              name="category" 
              id="category"
              required 
              defaultValue={state?.fields?.categoryRaw || ''}
            >
              <option value="" disabled>
                Select a category...
              </option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
            <Square2StackIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] -translate-y-1/2 text-stone-400 peer-focus:text-stone-800' />
          </div>
        </div>
        <div>
          <label className='mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-stone-800' htmlFor='image_url'>
            Image
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-stone-200 py-[9px] pl-10 text-sm text-stone-900 outline-2 placeholder:text-stone-400 focus:border-stone-800 focus:ring-stone-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200'
              id='image_url' type='file' name='image_url'
              accept='image/jpeg, image/png, image/webp, image/svg+xml, image/svg'
              />
            <PhotoIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] -translate-y-1/2 text-stone-400 peer-focus:text-stone-800' />
          </div>
        </div>
        <div>
          <label className='mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-stone-800' htmlFor='image_alt'>
            Image Description
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-stone-200 py-[9px] pl-10 text-sm text-stone-900 outline-2 placeholder:text-stone-400 focus:border-stone-800 focus:ring-stone-800'
              id='image_alt' type='text' name='image_alt' placeholder='Enter the description of the image. (E.g. "Tasty Cake baked at home")' required
              defaultValue={state?.fields?.imageAlt || ''}
              />
            <PencilSquareIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] -translate-y-1/2 text-stone-400 peer-focus:text-stone-800' />
          </div>
        </div>
        <div>
          <label className='mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-stone-800' htmlFor='prep_time'>
            Preparation Time
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-stone-200 py-[9px] pl-10 text-sm text-stone-900 outline-2 placeholder:text-stone-400 focus:border-stone-800 focus:ring-stone-800'
              id='prep_time' type='text' name='prep_time' placeholder='Enter the preparation time. (E.g. "15 mins")' required
              defaultValue={state?.fields?.prepTime || ''}
              />
            <ClockIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] -translate-y-1/2 text-stone-400 peer-focus:text-stone-800' />
          </div>
        </div>
        <div>
          <label className='mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-stone-800' htmlFor='cook_time'>
            Cook Time
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-stone-200 py-[9px] pl-10 text-sm text-stone-900 outline-2 placeholder:text-stone-400 focus:border-stone-800 focus:ring-stone-800'
              id='cook_time' type='text' name='cook_time' placeholder='Enter the cook time. (E.g. "30 minutes")' required
              defaultValue={state?.fields?.cookTime || ''}
              />
            <ClockIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] -translate-y-1/2 text-stone-400 peer-focus:text-stone-800' />
          </div>
        </div>
        <div>
          <label className='mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-stone-800' htmlFor='additional_time'>
            Additional Time
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-stone-200 py-[9px] pl-10 text-sm text-stone-900 outline-2 placeholder:text-stone-400 focus:border-stone-800 focus:ring-stone-800'
              id='additional_time' type='string' name='additional_time' placeholder='Enter any additional time. (E.g. "15 minutes for cooling")' 
              defaultValue={state?.fields?.additionalTime || ''}
              />
            <ClockIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] -translate-y-1/2 text-stone-400 peer-focus:text-stone-800' />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className='mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-stone-800' htmlFor='serving'>
              Serving
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-stone-200 py-[9px] pl-10 text-sm text-stone-900 outline-2 placeholder:text-stone-400 focus:border-stone-800 focus:ring-stone-800'
                id='serving' type='text' name='serving' placeholder='Enter the the recipe. (E.g. "4")' required
                defaultValue={state?.fields?.serving || ''}
                />
              <CakeIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] -translate-y-1/2 text-stone-400 peer-focus:text-stone-800' />
            </div>
          </div>
          <div>
            <label className='mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-stone-800' htmlFor='recipe_yield'>
              Recipe Yield
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-stone-200 py-[9px] pl-10 text-sm text-stone-900 outline-2 placeholder:text-stone-400 focus:border-stone-800 focus:ring-stone-800'
                id='recipe_yield' type='text' name='recipe_yield' placeholder='Enter the recipe yield. (E.g. "5 servings")'
                defaultValue={state?.fields?.recipeYield || ''}
                />
              <ChartPieIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] -translate-y-1/2 text-stone-400 peer-focus:text-stone-800' />
            </div>
          </div>
        </div>
        <div>
          <label className='mb-3 mt-5 block text-xs font-semibold uppercase tracking-wider text-stone-800' htmlFor='instructions'>
            Instructions
          </label>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-stone-200 py-[9px] pl-10 text-sm text-stone-900 outline-2 placeholder:text-stone-400 focus:border-stone-800 focus:ring-stone-800'
              id='instructions' type='text' name='instructions' placeholder='Enter the instructions below. (E.g. "")' required
              defaultValue={state?.fields?.instructions || ''}
              />
            <PencilSquareIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] -translate-y-1/2 text-stone-400 peer-focus:text-stone-800' />
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <button 
            type="submit"
            className="cursor-pointer mt-6 w-full flex items-center justify-center gap-2"
            disabled={isPending}
          >
            {isPending ? 'Adding Recipe...' : 'Submit your Recipe'}
            <ArrowRightIcon className='h-5 w-5' />
          </button>
        </div>
        <div
            className='flex items-center space-x-1 empty:hidden mt-2'
            aria-live='polite'
            aria-atomic='true'
          >
            {state?.message && (
              <>
                <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
                <p className='text-sm text-red-500'>{state.message}</p>
              </>
            )}
          </div>
      </form>
    </div>
  );
}