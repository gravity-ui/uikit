import React from 'react';

export function AttentionToast(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            {...props}
        >
            <path d="M0 0h24v24H0z" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.048 4.524c.41-.699 1.511-.699 1.92 0l7.902 13.022c.387.659-.138 1.454-.96 1.454H4.09c-.822 0-1.347-.795-.96-1.454l7.918-13.022zm2.093 9.41h-2.265V9.072h2.265v4.86zm-2.265 3.34h2.265v-1.98h-2.265v1.98z"
                fill="#FF0400"
            />
        </svg>
    );
}
