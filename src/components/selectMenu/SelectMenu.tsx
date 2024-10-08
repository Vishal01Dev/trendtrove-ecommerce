import { useState } from 'react';

interface SelectMenuProps<T> {
  options: T[];
  selectedOption: T;
  onChange: (option: T) => void;
  getOptionLabel: (option: T) => string;
}

const SelectMenu = <T,>({
  options,
  selectedOption,
  onChange,
  getOptionLabel,
}: SelectMenuProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (option: T) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {getOptionLabel(selectedOption)}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={getOptionLabel(option)}
                onClick={() => handleChange(option)}
                className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${
                  option === selectedOption ? 'bg-gray-100' : ''
                }`}
                role="menuitem"
              >
                {getOptionLabel(option)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectMenu;
