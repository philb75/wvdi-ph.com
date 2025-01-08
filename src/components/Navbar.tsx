import { Menu, X, Car } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-red-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">WVDI</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-red-600 transition">Home</a>
            <a href="#courses" className="text-gray-600 hover:text-red-600 transition">Courses</a>
            <a href="#about" className="text-gray-600 hover:text-red-600 transition">About</a>
            <a href="#requirements" className="text-gray-600 hover:text-red-600 transition">Requirements</a>
            <a href="#contact" className="text-gray-600 hover:text-red-600 transition">Contact</a>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block px-3 py-2 text-gray-600 hover:text-red-600">Home</a>
            <a href="#courses" className="block px-3 py-2 text-gray-600 hover:text-red-600">Courses</a>
            <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-red-600">About</a>
            <a href="#requirements" className="block px-3 py-2 text-gray-600 hover:text-red-600">Requirements</a>
            <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-red-600">Contact</a>
            <button className="w-full text-left bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700">
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}