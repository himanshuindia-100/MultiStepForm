
import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Question } from "../types";

type Props = {
  question: Question;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  value?: any;
  showError?: () => boolean;
};

export default function QuestionRenderer({ question, register, setValue, value, showError }: Props) {
  const error = showError ? showError() : false;

  return (
    <div className="p-3 rounded-md border border-gray-100">
      <label className="block text-sm font-medium mb-2">
        {question.label} {question.required ? <span className="text-red-500">*</span> : null}
      </label>

      {question.type === "text" && (
        <input
          {...register(question.id)}
          defaultValue={value ?? ""}
          placeholder={question.placeholder ?? ""}
          className="w-full p-2 border rounded-md text-sm"
        />
      )}

      {question.type === "radio" && question.options && (
        <div className="space-y-2">
          {question.options.map((opt) => (
            <label key={opt.value} className="flex items-center space-x-2 text-sm">
              <input
                type="radio"
                value={opt.value}
                {...register(question.id)}
                defaultChecked={value === opt.value}
                className="h-4 w-4"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "checkbox" && question.options && (
        <div className="space-y-2">
          {question.options.map((opt) => {
            const checked = Array.isArray(value) ? value.includes(opt.value) : false;
            return (
              <label key={opt.value} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    const prev = Array.isArray(value) ? value.slice() : [];
                    if (e.target.checked) setValue(question.id, [...prev, opt.value], { shouldValidate: true });
                    else setValue(question.id, prev.filter((v) => v !== opt.value), { shouldValidate: true });
                  }}
                  className="h-4 w-4"
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-2">This field is required.</p>}
    </div>
  );
}
