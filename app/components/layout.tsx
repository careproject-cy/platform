import Link from 'next/link'
import Image from 'next/image'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white text-base border-b p-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt={'Pawsome Shelter'} width={80} height={80} />
            <Link href="/" className="text-2xl font-bold">
              Pawsome Shelter
            </Link>
          </div>
          <nav className="p-2">
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/dogs" className="hover:underline">Dogs</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/#adopt" className="hover:underline">Adopt</Link></li>
              <li><Link href="/#about" className="hover:underline">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-6 py-10">
        {children}
      </main>
      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Pawsome Shelter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

