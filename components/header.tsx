import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const isLoggedIn = false;
  const username = 'Chef';

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 p-4 md:grid md:grid-cols-[1fr_100px_1fr] md:gap-8 md:items-center">
      
      <nav className="hidden md:flex md:gap-8 md:justify-end text-slate-200 font-bold">
        <Link
          href={isLoggedIn ? "/account/" : "/"}
          title="Return to home page"
          className="hover:text-blue-400 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/recipes/"
          title="Click to see our recipes"
          className="hover:text-blue-400 transition-colors"
        >
          Recipes
        </Link>
      </nav>
      
      <div className="flex justify-center md:justify-self-center">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="cookbook project logo"
            width={100}
            height={100}
            className="w-[100px] h-[100px] object-contain"
          />
        </Link>
      </div>
      <nav className="hidden md:flex md:gap-8 md:justify-start text-slate-200 font-bold">
        <Link 
          href="/recipes/submit" 
          title="Click to submit your recipe"
          className="hover:text-blue-400 transition-colors"
        >
          Submit your recipe
        </Link>
        <div className="flex gap-8">
          {isLoggedIn ? (
            <>
              <Link
                href="/account/"
                title="Click to manage your account"
                className="hover:text-blue-400 transition-colors"
              >
                Welcome {username}
              </Link>
              <button
                title="Click to log out"
                className="hover:text-blue-400 transition-colors cursor-pointer font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              title="Click to log in"
              className="hover:text-blue-400 transition-colors"
            >
              My Account
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}