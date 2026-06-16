'use client';

import React from 'react';

// ---------------------------------------------------------------------------
// Form Components
// ---------------------------------------------------------------------------

// ---- FormField ------------------------------------------------------------

export interface FormFieldProps {
  /** Label text */
  label: string;
  /** Error message string */
  error?: string;
  /** Whether this field is required */
  required?: boolean;
  /** Input form elements */
  children: React.ReactNode;
  /** Optional helper text */
  helperText?: string;
}

export function FormField({
  label,
  error,
  required = false,
  children,
  helperText,
}: FormFieldProps) {
  const id = React.useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ id?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean; required?: boolean }>, {
            id,
            'aria-describedby': error ? `${id}-error` : helperText ? `${id}-helper` : undefined,
            'aria-invalid': !!error,
            required,
          })
        : children}

      {helperText && !error && (
        <p id={`${id}-helper`} className="text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ---- Shared input styling -------------------------------------------------

const inputBase =
  'w-full px-4 py-2.5 text-sm rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';

const inputNormal = 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500';

const inputError = 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500';

const inputDisabled = 'opacity-50 pointer-events-none bg-gray-100 dark:bg-gray-800';

// ---- FormInput ------------------------------------------------------------

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput({ className, error: hasError, disabled, ...rest }, ref) {
    const classes = [
      inputBase,
      hasError ? inputError : inputNormal,
      disabled ? inputDisabled : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return <input ref={ref} className={classes} disabled={disabled} {...rest} />;
  },
);

// ---- FormTextarea ---------------------------------------------------------

export interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>(function FormTextarea({ className, error: hasError, disabled, ...rest }, ref) {
  const classes = [
    inputBase,
    'resize-y min-h-[100px]',
    hasError ? inputError : inputNormal,
    disabled ? inputDisabled : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <textarea ref={ref} className={classes} disabled={disabled} {...rest} />
  );
});

// ---- FormSelect -----------------------------------------------------------

export interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  /** Options array — can be strings or { value, label } objects */
  options?: (string | { value: string; label: string })[];
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  function FormSelect(
    { className, error: hasError, disabled, options, children, ...rest },
    ref,
  ) {
    const classes = [
      inputBase,
      'appearance-none cursor-pointer',
      hasError ? inputError : inputNormal,
      disabled ? inputDisabled : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <select ref={ref} className={classes} disabled={disabled} {...rest}>
        {options
          ? options.map((opt, i) =>
              typeof opt === 'string' ? (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ) : (
                <option key={i} value={opt.value}>
                  {opt.label}
                </option>
              ),
            )
          : children}
      </select>
    );
  },
);

// ---- FormCheckbox ---------------------------------------------------------

export interface FormCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label shown next to the checkbox */
  label?: string;
  error?: boolean;
}

export const FormCheckbox = React.forwardRef<
  HTMLInputElement,
  FormCheckboxProps
>(function FormCheckbox(
  { className, label, error: hasError, disabled, id, ...rest },
  ref,
) {
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        type="checkbox"
        id={checkboxId}
        disabled={disabled}
        className={`w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 ${
          hasError ? 'border-red-500' : ''
        } ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className ?? ''}`}
        {...rest}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className={`text-sm ${
            disabled
              ? 'text-gray-400 dark:text-gray-600'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
});

// ---- FormLabel (standalone) -----------------------------------------------

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function FormLabel({
  children,
  required = false,
  className,
  ...rest
}: FormLabelProps) {
  return (
    <label
      className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${className ?? ''}`}
      {...rest}
    >
      {children}
      {required && (
        <span className="text-red-500 ml-0.5" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

// ---- FormError (standalone) -----------------------------------------------

export interface FormErrorProps {
  children: React.ReactNode;
  className?: string;
}

export function FormError({ children, className }: FormErrorProps) {
  return (
    <p
      className={`text-xs text-red-600 dark:text-red-400 ${className ?? ''}`}
      role="alert"
    >
      {children}
    </p>
  );
}
