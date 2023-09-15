import React from 'react';
import {PostProps} from "@/app/posts/page";


export default async function PostDetailPage({params}: { params : PostProps})
{
    const post = await getPost(params.id)
    return (
        <div>
            <h1>posts/{post.id}</h1>
            <div>
                <h3>{post.title}</h3>
                <p>{post.created}</p>
            </div>
        </div>
    );
}


async function getPost(postId: string) {
    // await sleep(1000);
    const res = await fetch(`http://127.0.0.1:8090/api/collections/posts/records/${postId}`, {
        next: {revalidate: 10}
    })

    if(!res.ok) {
        throw new Error('Failed to fetch data.')
    }

    const data = await res.json()
    return data as PostProps
}

export function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}