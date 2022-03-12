import {Octokit} from "@octokit/core";

const octokit = new Octokit();

const repositories = [
    'balena-minecraft-server',
    'PistonMOTD',
    'PistonQueue',
    'PistonBot',
    'ServerWrecker',
    '6b6t-website'
]

export interface Organization {
    login: string;
    avatar: string;
    description: string;
}

export interface Repository {
    name: string;
    url: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
}

export interface UserData {
    avatar: string,
    name: string,
    repoCount: number,
    followers: number,
}

export async function getUserData(username: string): Promise<UserData> {
    const userReply = await octokit.request('GET /users/{username}', {
        username: username
    })

    return {
        avatar: String(userReply.data.avatar_url),
        name: String(userReply.data.name),
        repoCount: Number(userReply.data.public_repos),
        followers: Number(userReply.data.followers),
    }
}

export async function getRepositories(username: string): Promise<Repository[]> {
    const repoData: Repository[] = []

    for (const repoName of repositories) {
        const repoReply = await octokit.request('GET /repos/{owner}/{repo}', {
            owner: username,
            repo: repoName
        })

        repoData.push({
            name: repoReply.data.name,
            url: repoReply.data.html_url,
            description: repoReply.data.description!,
            language: repoReply.data.language!,
            stars: repoReply.data.stargazers_count,
            forks: repoReply.data.forks_count
        })
    }

    return repoData
}

export async function getOrganizations(username: string): Promise<Organization[]> {
    const organizations = await octokit.request('GET /users/{username}/orgs', {
        username: username
    })

    return organizations.data.map(org => {
        return {
            login: org.login!,
            avatar: org.avatar_url!,
            description: org.description!
        }
    })
}
