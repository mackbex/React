'use client'
import React, {startTransition, useState, useTransition} from 'react';
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function CreatePost() {

    const [title, setTitle] = useState<string>('')
    const [isPending, startTransition] = useTransition()

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!title) return
        await fetch('http://127.0.0.1:8090/api/collections/posts/records', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title
            })
        })

        startTransition(() => {
            setTitle('')
        })
        router.refresh()
    }



    return (
        <form onSubmit={handleSubmit}>
            {isPending && <div />}
            <input
                type={"text"}
                placeholder={"Title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            <button type={"submit"}>
                Create Post
            </button>
        </form>
    );
}
 