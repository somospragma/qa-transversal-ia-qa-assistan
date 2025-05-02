import { FC, ReactNode } from 'react'
import './button.component.scss'
interface ButtonProps {
    label?: string;
    icon?: ReactNode;
    position?: "top" | "bottom";
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    iconSrc?: string;
    [key: string]: any;
}

export const Button: FC<ButtonProps> = ({
    label,
    icon,
    iconSrc,
    position = "top",
    onClick,
    type = "button",
    disabled = false,
    className = "",
    ...rest
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn ${className} ${disabled ? "btn-disabled" : ""}`}
            {...rest}
        >
            {position === "top" && icon && !iconSrc && (
                <span className="btn-icon">{icon}</span>
            )}
            {position === "top" && iconSrc && (
                <figure className="btn-icon">
                    <img src={iconSrc} alt="button icon" />
                </figure>
            )}
            {label && <span className="btn-label">{label}</span>}
            {position === "bottom" && icon && <span className="btn-icon">{icon}</span>}
        </button>
    )
}

export default Button