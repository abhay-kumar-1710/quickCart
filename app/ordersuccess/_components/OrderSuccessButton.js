'use client'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const OrderSuccessButton = () => {

    const router = useRouter()

    useEffect(()=>{
        setTimeout(() => {
                router.push('/profile/orders')
        }, 2000);
    }, [])

  return (
    <>
      <Button asChild size="sm">
        <Link href="/products">Products</Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href={`/profile/orders`}>Orders</Link>
      </Button>
    </>
  );
}

export default OrderSuccessButton