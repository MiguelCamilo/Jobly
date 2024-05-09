"use client"

import { useFormStatus } from 'react-dom';

import { cn } from "@/lib/utils";

import { ClipLoader } from 'react-spinners';

interface ILoadingButtonText {
    isPending?: boolean;
    className?: string;
    children?: string;
}

const LoadingButtonText = ({ isPending, children, className }: ILoadingButtonText) => {
    const { pending } = useFormStatus();
    return isPending || pending ? <ClipLoader color="#ffff" size={23} /> : <span className={cn("", className)}>{children}</span>
}

export default LoadingButtonText;