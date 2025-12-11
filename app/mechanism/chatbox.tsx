'use client'
import { Input } from '@/components/ui/input';
import React from 'react';
import { searchPubmed } from './mechanism';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';


const MechanismChatBox = () => {
    const [state,action,isPending]= React.useActionState(searchPubmed,null)
    return (
        <div className='flex flex-col gap-8'>
            <form 
            action={action}
            className='flex flex-col gap-4'>
               <Label htmlFor="geneSymbol">Enter Gene Symbol:</Label>
                <Input type="text" name="geneSymbol" placeholder="Enter Gene Symbol" className='border p-2 rounded'/>
                <Button type="submit" 
                disabled={isPending}
                >Search PubMed</Button>
                {
                    state && (<div className='mt-4 p-4 border rounded '>
                        <h2 className='text-lg font-semibold mb-2'>Search Query results:</h2>
                        <pre className='whitespace-pre-wrap break-words'>{state}</pre>
                    </div>
                    )
                }
            </form>
        </div>
    );
}

export default MechanismChatBox;