'use client'

import fetchImages from '@/lib/fetchImages'
import fetchSuggestion from '@/lib/fetchSuggestion'
import { FormEvent, useState } from 'react'
import useSWR from 'swr'
import { toast } from 'react-hot-toast'

function PromtInput() {
    const [input, setInput] = useState("")

    const {data:suggestion , isLoading, mutate, isValidating} = useSWR('/api/suggestion', fetchSuggestion, {
        revalidateOnFocus: false
    })

    const {mutate: updateImages} = useSWR("images", fetchImages, {
        revalidateOnFocus:false
    })

    const submitPrompt = async(useSuggestion?: boolean) => {
        const inputPrompt = input;
        setInput("");

        const p = useSuggestion ? suggestion : inputPrompt 

        const notificationPrompt = p
        const notificationPromptShort = notificationPrompt.slice(0,40)

        const notification = toast.loading(
            `DALL-E is creating: ${notificationPromptShort}`
        )

        console.log(p)

        const res = await fetch('/api/generateImage', {
            method: "POST",
            headers :{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({prompt: p})
        })

        const data = await res.json()

        if (data.error) {
            toast.error(data.error, {
                id: notification,
            });
        } else {
            toast.success(`Your AI Art has been generated!`, {
                id: notification,
            });
        }
        updateImages();
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await submitPrompt()
    }

    const loading  = isLoading || isValidating
    return (
        <div className='m-10'>
            <form onSubmit={handleSubmit} className='flex flex-col md:flex-row shadow-md
        shadow-slate-400/10 border rounded-md lg:divide-x' >
                <textarea className='flex-1 p-4 outline-none rounded-md'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={ (loading && "Generating a suggestion") || suggestion || "Enter a prompt..."} />
                <button disabled={!input} type="submit" className={`p-4 font-bold ${input
                    ? "bg-violet-500 text-white transition-colors duration-200 "
                    : "text-gray-300 cursor-not-allowed"}`}>Generate</button>
                <button onClick={() =>submitPrompt(true)} type="button" className='p-4 bg-violet-400 text-white transition-colors
            duration-200 font-bold disabled:text-gray-300
            disabled:cursor-not-allowed disabled:bg-gray-400'>Use Suggesion</button>
                <button onClick={mutate} type="button" className='p-4 bg-white text-violet-500 border-none
            transition-colors duration-200 rounded-md md:rounded-r-md
            md:rounded-bl-none font-bold'>New Suggestion</button>
            </form>
          {
            input && (
                <p className='italic pt-2 pl-2 font-light'>
                    Suggestion:{" "}
                    <span className='text-violet-500'>
                        {loading ? "Generating a suggestion...": suggestion}
                    </span>
                </p>
            )
          }
        </div>
    )
}

export default PromtInput