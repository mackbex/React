import React from 'react';
import Link from "next/link";
import CreatePost from "@/app/posts/CreatePost";

export interface PostProps {
    id: string
    title: string
    created: string
    updated: string
}

export default async function PostsPage() {

    const posts = await getPosts()

    return (
        <div>
            <h1>Posts</h1>
            {posts?.map((post) => {
                return <PostItem key={post.id} post={post}/>
            })}

            <CreatePost />
        </div>
    );
}

export function PostItem({post} : {post: PostProps}) {

    return(
        <Link href={`/posts/${post.id}`}>
            <div>
                <h3>{post.title}</h3>
                <p>{post.created}</p>
            </div>
        </Link>
    )
}

async function getPosts() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/posts/records', {
        cache: 'no-store'
    })
    const data = await res.json()
    return data?.items as PostProps[]
}

