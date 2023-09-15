import React from 'react';
import {GetStaticPaths, GetStaticProps} from "next";
import {getAllPostIds, getPostData} from "@/lib/post";
import Head from "next/head";
import styled from "styled-components";
import {ParsedUrlQuery} from "querystring";

interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const params = context.params as Params
    const postData = await getPostData(params.id as string)

    return {
        props: {
            postData
        }
    }
}

export default function Post({postData}: {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}) {
    return (
        <PageContainer>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <HeadingXL>{postData.title}</HeadingXL>
                <div>
                    {postData.date}
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
            </article>
        </PageContainer>
    );
}

const HeadingXL = styled.h1`
`

const PageContainer = styled.div`
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto;
`