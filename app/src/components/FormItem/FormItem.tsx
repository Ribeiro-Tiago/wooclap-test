import React from "react";

import "./FormItem.scss";

interface Props {
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
  isDisabled: boolean;
  elemKey: string;
  inputType?: "text" | "date";
  err?: string;
}

export default function FormItem({
  label,
  value,
  onChange,
  isDisabled,
  elemKey,
  inputType = "text",
  err,
}: Props) {
  return (
    <div className={`form-group ${!!err ? "has-error" : ""}`}>
      <div className="form-input">
        <label htmlFor={elemKey}>{label}:</label>
        <input
          name={elemKey}
          type={inputType}
          value={value}
          onChange={({ currentTarget }) => {
            onChange(elemKey, currentTarget.value);
          }}
          disabled={isDisabled}
        />
      </div>
      {err && <span>{err}</span>}
    </div>
  );
}
