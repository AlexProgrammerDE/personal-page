import {Octokit} from "@octokit/core";

const octokit = new Octokit();

export interface Organization {
    login: string;
    avatar: string;
    description: string;
}

export interface UserData {
    avatar: string,
    name: string,
    repos: number,
    followers: number,
    organizations: Organization[],
}

export async function getData(username: string): Promise<UserData> {
    const userReply = await octokit.request('GET /users/{username}', {
        username: username
    })

    const organizations = await octokit.request('GET /users/{username}/orgs', {
        username: username
    })

    return {
        avatar: String(userReply.data.avatar_url),
        name: String(userReply.data.name),
        repos: Number(userReply.data.public_repos),
        followers: Number(userReply.data.followers),
        organizations: organizations.data.map(org => {
            return {
                login: org.login!,
                avatar: org.avatar_url!,
                description: org.description!
            }
        })
    }
}
