import { LucideIcon } from 'lucide-react';

import { Button } from "./button";

type Variants  = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
interface ButtonWithIconProps {
  icon: LucideIcon;
  children: React.ReactNode;  
  variants?: Variants;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


const ButtonWithIcon = ({ icon: Icon, variants, onClick, children } : ButtonWithIconProps) => {
  return (
    <Button onClick={onClick} variant={variants}>
      <Icon height={16} width={16} className='mr-2' />
      {children}
    </Button>
  );
};



export default ButtonWithIcon;
