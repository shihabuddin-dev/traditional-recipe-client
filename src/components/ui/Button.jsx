import React from 'react';

const Button = ({
    children,
    type = 'button',
    onClick = () => { },
    variant = 'primary',
    className = '',
    ...props
}) => {
    let styles = 'px-4 py-1.5 rounded font-medium transition duration-200 focus:outline-none ';

    if (variant === 'primary') {
        styles += 'bg-gradient-to-tl from-purple-700 via-indigo-700 to-indigo-600 text-white hover:bg-indigo-500';
    } else if (variant === 'secondary') {
        styles += 'bg-white text-indigo-700 hover:bg-indigo-100';
    } else if (variant === 'outline') {
        styles += 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50';
    } else if (variant === 'danger') {
        styles += 'bg-red-600 text-white hover:bg-red-500';
    } else {
        styles += 'bg-gray-200 text-black';
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
