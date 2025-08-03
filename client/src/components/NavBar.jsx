import React from 'react'

const NavBar = () => {
  return (
   
         <div className="flex justify-between items-center px-6 py-4">
          <div className="text-xl font-bold flex items-center gap-2">
            <img src="/Vector.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span>Listify</span>
          </div>
          <div className="space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:underline">
              About us
            </a>
            <a href="#" className="hover:underline">
              Contacts
            </a>
          </div>
        </div>
   
  )
}

export default NavBar