'use client'

import React from 'react';
import SearchForm from '@/components/frontend/SearchForm';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo.jpg';
import { User } from 'lucide-react';
import ThemeSwitcherBtn from '../ThemeSwitcherBtn';
import HelpModal from '@/components/frontend/HelpModal';
import CartCount from '@/components/frontend/CartCount';
import { useSession } from 'next-auth/react';
import Loading from '@/app/loading';
import UserAvatar from '@/components/backoffice/UserAvatar';

export default function Navbar() {
    const {data:session,status} = useSession();
    if(status==="loading") {
        <Loading />
    }
  return (
    <div className='bg-white dark:bg-slate-700 fixed w-full top-0 left-0'>
        <div className='flex items-center justify-between py-3 max-w-6xl mx-auto px-8 gap-8'>
            {/* Logo */}
            <Link className='' href='/'>
                <Image src={logo} alt="hygienicfood logo" className='w-12 rounded-full' />
            </Link>
            {/* SEARCH */}
            <div className="flex-grow">
                <SearchForm />
            </div>
            <div className="flex gap-8 text-slate-50">
                {
                    status==="unauthenticated"?(
                        <Link href='/login' className="flex items-center space-x-1 text-green-950 dark:text-slate-100">
                    <User />
                    <span>Login</span>
                </Link>
                    ):(
                        <UserAvatar user={session?.user} />
                    )}
                
                <HelpModal />
                <CartCount />
            </div>
            <ThemeSwitcherBtn />
        </div>
    </div>
  );
}
