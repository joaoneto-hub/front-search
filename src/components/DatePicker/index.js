import React from "react";
import PropTypes from "prop-types";

const DateInput = ({ label, id, value, onChange }) => {
  return (
    <div className="w-full md:w-full px-3 md:mb-0">
      <label
        className="block uppercase tracking-wide text-white text-xs mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-800 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-900 focus:border-blue-500"
        id={id}
        type="date"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateInput;
