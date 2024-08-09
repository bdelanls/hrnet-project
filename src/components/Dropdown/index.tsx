import React from 'react';

interface DropdownProps {
  label: string;
  id: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  firstOption?: { value: string; label: string };
}

/**
 * Dropdown component renders a labeled select input with optional first choice.
 *
 * @param {string} label - The label for the dropdown.
 * @param {string} id - The unique identifier for the dropdown.
 * @param {Array<{ value: string; label: string }>} options - The list of options for the dropdown.
 * @param {string} value - The currently selected value of the dropdown.
 * @param {(event: React.ChangeEvent<HTMLSelectElement>) => void} onChange - Callback function to handle selection changes.
 * @param {{ value: string; label: string }} [firstOption] - Optional first option that appears at the top of the dropdown list, often used for placeholder text.
 */
const Dropdown: React.FC<DropdownProps> = ({
  label,
  id,
  options,
  value,
  onChange,
  firstOption,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}>
        {firstOption && (
          <option value={firstOption.value} disabled={firstOption.value === ''}>
            {firstOption.label}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
