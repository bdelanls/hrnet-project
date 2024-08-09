import React from 'react';

interface DatePickerProps {
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}

/**
 * DatePicker component provides a labeled date input field with optional min and max date constraints.
 *
 * @param {string} label - The label for the date picker input.
 * @param {string} id - The unique identifier for the date picker input.
 * @param {string} value - The current value of the date picker input in 'YYYY-MM-DD' format.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} onChange - Callback function to handle changes to the input value.
 * @param {string} [min] - The optional minimum date that can be selected, in 'YYYY-MM-DD' format.
 * @param {string} [max] - The optional maximum date that can be selected, in 'YYYY-MM-DD' format. Defaults to the current date.
 */
const DatePicker: React.FC<DatePickerProps> = ({
  label,
  id,
  value,
  onChange,
  min,
  max,
}) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const maxDate = max || currentDate;

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="date"
        id={id}
        value={value}
        onChange={onChange}
        min={min}
        max={maxDate}
        className="date-picker"
      />
    </>
  );
};

export default DatePicker;
