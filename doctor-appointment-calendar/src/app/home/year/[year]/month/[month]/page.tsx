"use client"
import Home from '@/components/Home/Home'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {}

const page = (props: Props) => {
    const pathname = usePathname();
    const [extractedYear, setExtractedYear] = useState<string | undefined>(undefined);
    const [extractedMonthIndex, setExtractedMonthIndex] = useState<number | undefined>(undefined);
    useEffect(() => {
        const match = pathname.match(/year\/(\d{4})\/month\/(\d+)/);
        if (match) {
          const extractedYear = match[1];
          const extractedMonthIndex = parseInt(match[2]);
          setExtractedYear(extractedYear);
          setExtractedMonthIndex(extractedMonthIndex);
        }
      }, [pathname]);
  return (
    <Home extractedYear={extractedYear} extractedMonthIndex={extractedMonthIndex}/>
  )
}

export default page