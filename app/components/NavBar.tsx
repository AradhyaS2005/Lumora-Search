import Link from "next/link"
import Image from "next/image"

export default function NavBar() {
  return (
    <header className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Lumora Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold tracking-wide">Lumora</span>
        </Link>
        {/* Right Side */}
        <div className="flex items-center gap-6">
          <Link
          href="/"
          className="text-gray-300 hover:text-white transition">
            Search
          </Link>
          <a
            href="https://github.com/AradhyaS2005/Lumora-Search"
            target="_blank"
            rel="noopener noreferrer" // Security best practice to prevent the new page from accessing the window.opener property
            className="text-gray-300 hover:text-white transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}