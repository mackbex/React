import React from 'react';

interface PostProps {
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
        </div>
    );
}

export const PostItem = ({post}) => {

    return(
        <div>

        </div>
    )
}

async function getPosts() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/users/records')
    const data = await res.json()
    return data?.items as PostProps[]
}


