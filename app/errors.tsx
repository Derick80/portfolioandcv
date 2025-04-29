'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ErrorPage({ error }: { error: Error }) {
    const router = useRouter()

    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Error occurred:', error)
    }, [error])

    return (
        <div className='flex min-h-screen items-center justify-center bg-background'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='text-2xl font-bold'>
                        Something went wrong
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='mb-4'>
                        We&apos;re sorry, but an unexpected error occurred.
                    </p>
                    <p className='mb-4'>Error details: {error.message}</p>
                    <Button onClick={() => router.back()} className='w-full'>
                        Go back
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
