import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import { Menu } from 'lucide-react'

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 >
          <Link to="/">
            Vai pra home
          </Link>
        </h1>
      </header>
    </>
  )
}
