import React from 'react';

interface DatePickerProps {
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}

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
