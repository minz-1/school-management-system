import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full sm:w-72">
      
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Search size={18} />
      </div>

      
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
      />
    </div>
  );
};

export default SearchInput;