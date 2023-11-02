'use client'

import fetchSuggestion from '@/lib/fetchSuggestion'
import { useState } from 'react'
import useSWR from 'swr'

function PromtInput() {
    const [input, setInput] = useState("")

    const {data , isLoading, mutate, isValidating} = useSWR('/api/suggestion', fetchSuggestion, {
        revalidateOnFocus: false
    })
    return (
        <div className='m-10'>
            <form className='flex flex-col md:flex-row shadow-md
        shadow-slate-400/10 border rounded-md lg:divide-x' >
                <textarea className='flex-1 p-4 outline-none rounded-md'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='Enter a prompt...' />
                <button disabled={!input} type="submit" className={`p-4 font-bold ${input
                    ? "bg-violet-500 text-white transition-colors duration-200 "
                    : "text-gray-300 cursor-not-allowed"}`}>Generate</button>
                <button type="button" className='p-4 bg-violet-400 text-white transition-colors
            duration-200 font-bold disabled:text-gray-300
            disabled:cursor-not-allowed disabled:bg-gray-400'>Use Suggesion</button>
                <button type="button" className='p-4 bg-white text-violet-500 border-none
            transition-colors duration-200 rounded-md md:rounded-r-md
            md:rounded-bl-none font-bold'>New Suggestion</button>
            </form>
        </div>
    )
}

export default PromtInput