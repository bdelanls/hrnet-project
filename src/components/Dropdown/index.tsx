import React from 'react';

interface DropdownProps {
  label: string;
  id: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  firstOption?: { value: string; label: string };
}

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
