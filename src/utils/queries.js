import {gql} from "@apollo/client";

const baseRepositoryQueryBodyPart = `
repositoryCount
edges {
    cursor
    node {
        ... on Repository {
            id
            name
            url
            description
            forkCount
            owner {
                login
            }
            issues(states: [OPEN]) {
                totalCount
            }
        }
    }
}`;

export const GET_REPOS_BY_NAME = gql`
    query getReposByName($name: String!) {
        search(query: $name, type: REPOSITORY, first: 10) {
            ${baseRepositoryQueryBodyPart}
        }
    }`;

export const GET_REPOS_BY_NAME_AND_OFFSET = gql`
    query getReposByNameAndOffset($name: String!, $cursor: String!) {
        search(after: $cursor, query: $name, type: REPOSITORY, first: 10) {
            ${baseRepositoryQueryBodyPart}
        }
    }`;

const baseIssueQueryBodyPart = `
totalCount
pageInfo {
    endCursor
}
nodes {
    id
    closed
    url
    title
    createdAt
}
`;

export const GET_ISSUES_BY_OWNER_AND_REPO_NAME = gql`
query getIssuesByOwnerAndRepoName($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
        issues(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
            ${baseIssueQueryBodyPart}
        }
    }
}
`

export const GET_ISSUES_BY_OWNER_AND_REPO_NAME_WITH_CURSOR = gql`
query getIssuesByOwnerAndRepoName($name: String!, $owner: String!, $cursor: String!) {
    repository(name: $name, owner: $owner) {
        issues(first: 10, after: $cursor, orderBy: {field: CREATED_AT, direction: DESC}) {
            ${baseIssueQueryBodyPart}
        }
    }
}
`