import type { ReactNode } from "react";

/**
 * Form primitives. Every control is labelled, described and marked invalid in
 * a way assistive technology can follow, and validation messages are linked
 * with aria-describedby rather than colour alone.
 */

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  /** Spans both columns on wide screens. */
  full?: boolean;
  children: ReactNode;
};

export function Field({
  id,
  label,
  hint,
  error,
  required,
  full,
  children,
}: FieldProps) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span className="ml-1 text-gold" aria-hidden="true">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mb-2 text-[0.75rem] text-taupe">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(
  id: string,
  hint?: string,
  error?: string,
): string | undefined {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(
    Boolean,
  );
  return ids.length > 0 ? ids.join(" ") : undefined;
}

export function TextInput({
  id,
  name,
  type = "text",
  autoComplete,
  placeholder,
  defaultValue,
  error,
  hint,
  required,
  inputMode,
  min,
  max,
}: {
  id: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  inputMode?: "text" | "email" | "tel" | "numeric";
  min?: string;
  max?: string;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
      inputMode={inputMode}
      min={min}
      max={max}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={describedBy(id, hint, error)}
      className="field-input"
    />
  );
}

export function TextArea({
  id,
  name,
  rows = 5,
  placeholder,
  defaultValue,
  error,
  hint,
  required,
  maxLength,
}: {
  id: string;
  name: string;
  rows?: number;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
      maxLength={maxLength}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={describedBy(id, hint, error)}
      className="field-input resize-y"
    />
  );
}

export function Select({
  id,
  name,
  options,
  defaultValue,
  error,
  hint,
  required,
  placeholder,
}: {
  id: string;
  name: string;
  options: readonly { value: string; label: string }[];
  defaultValue?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <select
      id={id}
      name={name}
      defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
      required={required}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={describedBy(id, hint, error)}
      className="field-input"
    >
      {placeholder ? <option value="">{placeholder}</option> : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function RadioGroup({
  legend,
  name,
  options,
  defaultValue,
  error,
  hint,
  required,
}: {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
  defaultValue?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}) {
  const groupId = `${name}-group`;
  return (
    <fieldset
      aria-invalid={error ? "true" : undefined}
      aria-describedby={describedBy(groupId, hint, error)}
    >
      <legend className="field-label">
        {legend}
        {required ? (
          <span className="ml-1 text-gold" aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>
      {hint ? (
        <p id={`${groupId}-hint`} className="mb-3 text-[0.75rem] text-taupe">
          {hint}
        </p>
      ) : null}
      <div className="flex flex-col gap-3">
        {options.map((option, index) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-espresso/85"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={
                defaultValue ? defaultValue === option.value : index === 0
              }
              className="mt-1 h-4 w-4 accent-[#B69A65]"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error ? (
        <p id={`${groupId}-error`} role="alert" className="field-error">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function CheckboxField({
  id,
  name,
  error,
  children,
  required,
}: {
  id: string;
  name: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-espresso/85"
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 accent-[#B69A65]"
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Honeypot: hidden from people, tempting to scripts. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="reference">Leave this field empty</label>
      <input id="reference" name="reference" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
