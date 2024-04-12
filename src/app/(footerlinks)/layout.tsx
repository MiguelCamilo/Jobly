import Navbar from '@/components/navbar';

interface AboutLayoutProps {
  children: React.ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div>
      <Navbar hideButton />
      {children}
    </div>
  )
}