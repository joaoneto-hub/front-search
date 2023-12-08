import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";

const Input = ({ name, label, type, value, onChange }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = "", registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
      <label
        className="block uppercase tracking-wide text-white text-xs" // Alteração para texto branco
        htmlFor={fieldName}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-800 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-900 focus:border-blue-500" // Alterações para cores e estilos escuros
        ref={inputRef}
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};

export default Input;
