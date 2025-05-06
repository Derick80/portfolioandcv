'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { useState } from 'react'

type DisplayQueryProps = {
    kanji: string
    kana: string
    meaning: string
    jlpt: number
    stroke_number: number
    sentence_jp: string
    sentence_en: string
    queryKanji: boolean
    relatedBy: {
        kanji: string
        kana: string
        meaning: string
        jlpt: number
        stroke_number: number
        sentence_jp: string
        sentence_en: string
        queryKanji: boolean
    }[]
}

const DisplayQuery = (props: DisplayQueryProps) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }
    return (
        <div
            className={`relative bg-accent rounded-md w-xs h-fit p-4 border-2 space-y-1 transition-transform duration-500 ${
                isFlipped ? 'transform rotateY-180' : ''
            }`}
        >
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-2xl font-semibold capitalize'>
                    {props.meaning}
                </h1>
            </div>
            <div className='border-2 flex flex-row justify-center items-center p-2'>
                <h2 className='text-4xl font-bold'>{props.kanji}</h2>
            </div>
            <div className='flex flex-row items-center space-x-2'>
                <span className='font-semibold'>Kana:</span>
                <p>{props.kana}</p>
            </div>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div>
                            <span className='font-semibold'>
                                Japanese Sentence:
                            </span>
                            <p className='whitespace-pre-wrap'>
                                {props.sentence_jp}
                            </p>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className='whitespace-pre-wrap'>
                            {props.sentence_en}
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <div className='flex flex-row items-center space-x-2'>
                <span className='font-semibold'>Strokes:</span>
                <p>{props.stroke_number}</p>
                <span className='font-semibold'>JLPT:</span>
                <p>N{props.jlpt}</p>
            </div>
            <div
            className='flex flex-row items-center space-x-2'
            >
            {props.relatedBy && (
              
                    <><span className='font-semibold'>Related Kanji:</span><div className='flex flex-row space-x-2'>
                        {props.relatedBy.map((related) => (
                            <div
                                key={related.kanji}
                                className='bg-primary text-white rounded-md p-2'
                            >
                                <h1>{related.kanji}</h1>
                            </div>
                        ))}
                    </div></>
               
            )}
             </div>
        </div>
    )
}

export default DisplayQuery
