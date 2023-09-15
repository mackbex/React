import path from "path";
import fs from "fs";
import matter from 'gray-matter'
import {remark} from "remark";
import remarkHtml from "remark-html";

const postDir = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postDir)

    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/,'')

        const fullPath = path.join(postDir, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data as { date: string; title: string}
        }
    })

    return allPostsData.sort((a, b) => {
        if(a.date < b.date) {
            return 1
        }
        else {
            return -1
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postDir)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/,'')
            }
        }
    })

}

export async function getPostData(id: string) {
    const fullPath = path.join(postDir, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)
    const processedContent = await remark()
        .use(remarkHtml)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        ...(matterResult.data as {date: string, title: string})
    }
}