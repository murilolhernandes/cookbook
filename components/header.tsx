import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="mx-auto flex max-w-7x1 items-center justify-between px-6 py-4">
        <Link href="/login" className="login">Login</Link>
      </div>
    </header>
  );
}