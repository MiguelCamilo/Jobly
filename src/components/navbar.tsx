import Image from 'next/image'
import Link from 'next/link'

import logo from "@/assets/company-logo.png"

import { Button } from '@/components/ui/button'
import ButtonWithIcon from '@/components/ui/button-icon'

const Navbar = () => {

    return (
        <header className='shadow-sm'>
            <nav className='max-w-5xl m-auto px-3 py-5 flex items-center justify-between'>
                <Link href="/" className='flex items-center gap-3'>
                    {/* TODO: change comapany logo */}
                    <Image src={logo} alt='company logo image' width={40} height={40}/>
                    <span className='text-xl font-bold tracking-tight'>Jobly</span>
                </Link>
                <ButtonWithIcon>
                    <Link href="/">Post a Job</Link>
                </ButtonWithIcon>
            </nav>
        </header>
    )
}

export default Navbar
