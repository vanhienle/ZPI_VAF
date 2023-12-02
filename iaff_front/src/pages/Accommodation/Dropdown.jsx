import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({
  options,
  multiple = false,
  className = "",
  placeholder = "",
  selectedOptions,
  setSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    if (multiple) {
      setSelectedOptions((prev) => {
        if (prev.includes(option)) {
          return prev.filter((item) => item !== option);
        } else {
          return [...prev, option];
        }
      });
    } else {
      setSelectedOptions(option);
      setIsOpen(false);
    }
  };

  const handleClearOptions = () => {
    if (multiple) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(null);
    }
    setIsOpen(false);
  };

  const renderSelectedOptions = () => {
    if (multiple) {
      return selectedOptions.length > 0
        ? "Chose " + selectedOptions.length + " filters"
        : placeholder;
    } else {
      return placeholder + (selectedOptions ? `: ${selectedOptions}` : "");
    }
  };

  const combinedClassName = `${className}`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className={combinedClassName}>
        {renderSelectedOptions()}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-background-color ring-1 ring-primary-500 ring-opacity-30">
          <div className="">
            {options.map((option, index) => (
              <div key={index} className=" hover:bg-accent-500">
                <label className="flex items-center space-x-3 px-4 py-3 cursor-pointer">
                  <input
                    type={multiple ? "checkbox" : "radio"}
                    name="dropdown"
                    checked={
                      multiple
                        ? selectedOptions.includes(option)
                        : selectedOptions === option
                    }
                    onClick={() => handleOptionClick(option)}
                    className="h-4 w-4 rounded cursor-pointer"
                  />
                  <span className="text-gray-700 text-sm">{option}</span>
                </label>
              </div>
            ))}

            <div className="hover:bg-accent-500">
              <label className="flex items-center space-x-3 px-4 py-3 cursor-pointer">
                <button
                  onClick={handleClearOptions}
                  className="text-primary-700 text-sm"
                >
                  <span className="fa fa-close text-lg mr-2"></span>
                  Clear Selection
                </button>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
