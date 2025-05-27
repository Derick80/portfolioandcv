'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { getGPTResponse } from "../actions/moa"


const MoaInput = () => {
const [state, action, isPending] = useActionState(getGPTResponse,null)

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">MOA</h1>
            <h2 className="text-2xl font-bold">Input</h2>
            <form 
                action={action}
                className="flex flex-col gap-2"
                >
                    <Label htmlFor='moa-input' className="text-lg font-bold">Input</Label>
                    <Input
                        name="input_word"
                        type='text'
                        required
                        placeholder="Enter the Gene of Interest to search and determine the mechanism of action in cancer"
                        className="w-full"
                    />
                    <Button
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? "Loading..." : "Submit"}
                    </Button>
                </form>
            </div>
    )
}

export default MoaInput