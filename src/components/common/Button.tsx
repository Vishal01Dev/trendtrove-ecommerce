import clsx from 'clsx';
import { FC } from 'react';

interface ButtonProps {
    onClick?: () => void;
    type?: "submit" | "button" | undefined
    buttonStyles?: string;
    title: string;
    isDisabled?: boolean
}

const Button: FC<ButtonProps> = ({ title, type, buttonStyles, onClick, isDisabled }) => {
    return (
        <button type={type} className={clsx(`${buttonStyles} rounded px-4 py-2 text-sm font-semibold hover:bg-opacity-95`, isDisabled && 'cursor-not-allowed bg-opacity-90')} onClick={onClick} disabled={isDisabled}>{title}</button>
    )
}

export default Button