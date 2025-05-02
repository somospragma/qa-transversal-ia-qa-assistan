import { FC } from 'react';
import {useForm} from 'shared/hooks';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    name: string;
    label?: string;
    id?: string;
    className?:string;
    isTextArea?:boolean;
    required?: boolean;
    regex?: RegExp;
    customValidator?: (value: string) => string | null;
}

export const Input: FC<InputProps> = ({ label, name, id, className,isTextArea = false,required, regex, customValidator, ...props }) => {
    const { register } = useForm();
    const inputProps = register(name, { required, regex, customValidator });
    return (
        <>
            {label && (
                <label htmlFor={id || name} className='input-label'>
                    {label}
                </label>
            )}
            {
                isTextArea
                ? <textarea
                    {...inputProps}
                    id={id || name} {...props} className={`input-field ${className}`}/>
                : <input
                    {...inputProps}
                    id={id || name} {...props} className={`input-field ${className}`} />
            }
        </>
    )
}

export default Input