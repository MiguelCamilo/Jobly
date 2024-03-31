import { cn } from "@/lib/utils";

import { ClipLoader } from 'react-spinners';

interface ILoadingButtonText {
    isPending: boolean;
    className?: string;
    children?: string;
}

const LoadingButtonText = ({ isPending, children, className }: ILoadingButtonText) => {
    return isPending ? <ClipLoader color="#ffff" size={23} /> : <span className={cn("", className)}>{children}</span>
}

export default LoadingButtonText;