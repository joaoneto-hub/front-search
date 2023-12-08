import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "5px",
    border: "1px solid #555",
    fontSize: "16px",
    padding: "4px",
    backgroundColor: "rgb(31, 41, 55)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#007bff" : "#333",
    color: state.isSelected ? "#fff" : "#ccc",
    padding: "10px",
    margin: "2px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};

const FormSelect = ({ name, label, options, value, onChange, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "state.value",
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.getValue()) {
            return [];
          }
          return ref.getValue().map((option) => option.value);
        }
        if (!ref.getValue()) {
          return [];
        }
        return ref.getValue().length > 0 ? ref.getValue()[0].value : "";
      },
      setValue: (ref, Value) => {
        if (Value) {
          if (Value instanceof Object) {
            ref.setValue({ ...Value });
          } else {
            const objValue = options.find((opt) => opt.value === Value);
            ref.setValue({ ...objValue });
          }
        } else {
          ref.setValue(null);
        }
      },
    });
  }, [fieldName, registerField, defaultValue, options]);

  return (
    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
      <label
        className="block uppercase tracking-wide text-white text-xs mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <Select
        ref={selectRef}
        name={name}
        styles={customStyles}
        classNamePrefix="Select"
        options={options}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => onChange(selectedOption.value)}
      />
    </div>
  );
};

export default FormSelect;
