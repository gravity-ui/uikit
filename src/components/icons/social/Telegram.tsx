import React from 'react';
import {a11yHiddenSvgProps} from '../../utils/svg';

export function Telegram(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currnetColor"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <path d="M2.336 11.932l4.378 1.634 1.694 5.45a.515.515 0 0 0 .819.246l2.44-1.99a.728.728 0 0 1 .888-.024l4.401 3.196c.303.22.732.054.808-.312l3.225-15.51a.516.516 0 0 0-.691-.587L2.33 10.968a.516.516 0 0 0 .006.965zm5.799.764l8.556-5.27c.154-.094.312.114.18.237L9.81 14.226c-.248.231-.408.54-.454.876l-.24 1.783c-.032.238-.367.261-.432.031l-.925-3.25a.862.862 0 0 1 .376-.97z" />
        </svg>
    );
}
