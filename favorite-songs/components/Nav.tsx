function Nav() {
  return (
    <nav className="bg-indigo-900 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-lg font-bold">
          My App
        </a>
        <div>
          <a href="/about" className="px-3 hover:text-gray-300">
            About
          </a>
          <a href="/contact" className="px-3 hover:text-gray-300">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Nav

