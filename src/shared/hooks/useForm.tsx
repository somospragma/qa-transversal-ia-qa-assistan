import { useState, ChangeEvent } from "react";

type Validator = (value: string) => string | null;

interface FieldOptions {
  required?: boolean;
  customValidator?: Validator;
  regex?: RegExp;
}

interface FieldState {
  value: string;
  error: string | null;
  options?: FieldOptions;
}

interface UseFormReturn {
  values: Record<string, string>;
  errors: Record<string, string | null>;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  register: (name: string, options?: FieldOptions) => {
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };
  validateForm: () => boolean;
  resetField: (name: string) => void;
  resetForm: () => void;
}

export const useForm = (): UseFormReturn => {
  const [fields, setFields] = useState<Record<string, FieldState>>({});

  const validate = (name: string, value: string, options?: FieldOptions): string | null => {
    if (options?.required && !value.trim()) {
      return "Este campo es requerido";
    }
    if (options?.regex && !options.regex.test(value)) {
      return "Formato inválido";
    }
    if (options?.customValidator) {
      return options.customValidator(value);
    }
    return null;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFields((prev) => ({
      ...prev,
      [name]: {
        value,
        error: validate(name, value, prev[name]?.options),
        options: prev[name]?.options,
      },
    }));
  };

  const register = (name: string, options?: FieldOptions) => {
    if (!fields[name]) {
      setFields((prev) => ({
        ...prev,
        [name]: { value: "", error: null, options },
      }));
    }

    return {
      name,
      value: fields[name]?.value || "",
      onChange: handleChange,
    };
  };

  const validateForm = (): boolean => {
    let isValid = true;
    setFields((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        const error = validate(key, newState[key].value, newState[key].options);
        if (error) isValid = false;
        newState[key].error = error;
      });
      return newState;
    });
    return isValid;
  };

  const resetField = (name: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: { value: "", error: null, options: prev[name]?.options },
    }));
  };

  const resetForm = () => {
    setFields({});
  };

  return {
    values: Object.fromEntries(Object.entries(fields).map(([key, { value }]) => [key, value])),
    errors: Object.fromEntries(Object.entries(fields).map(([key, { error }]) => [key, error])),
    handleChange,
    register,
    validateForm,
    resetField,
    resetForm
  };
};
