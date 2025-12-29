'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header className="container relative z-20 pt-4">
      <div className="flex justify-between">
        <Link href="/" className="block w-[8rem]">
          <Logo variant="horizontal" color="dark-teal" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
