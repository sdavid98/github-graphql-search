import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    repositories: [],
    repositoryCount: 0,
    repositoryIds: [],
    issuesByRepoId: {}
}

export const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        initResults: (state, action) => {
            state.repositories = [];
            state.repositoryCount = 0;
            state.repositoryIds = [];
            state.issuesByRepoId = {}
        },
        setRepositories: (state, action) => {
            const newRepos = action.payload.filter(repo => !state.repositoryIds.includes(repo.node.id));
            state.repositories.push(...newRepos);

            let newIds = [];
            newRepos.forEach(repo => {
                newIds.push(repo.node.id)
            });

            state.repositoryIds.push(...newIds);
        },
        setRepositoryCount: (state, action) => {
            state.repositoryCount = action.payload
        },
        setIssuesByRepoId: (state, action) => {
            if (state.issuesByRepoId[action.payload.id]) {
                const newIssues = action.payload.issues.filter(issue => !state.issuesByRepoId[action.payload.id].allIds.includes(issue.id));
                state.issuesByRepoId[action.payload.id].issues.push(...newIssues);

                let newIds = [];
                newIssues.forEach(issue => {
                    newIds.push(issue.id)
                });
                state.issuesByRepoId[action.payload.id].allIds.push(...newIds)

                state.issuesByRepoId[action.payload.id].cursor = action.payload.cursor;
            } else {
                state.issuesByRepoId[action.payload.id] = {
                    issues: action.payload.issues,
                    issueCount: action.payload.issueCount,
                    cursor: action.payload.cursor,
                    allIds: action.payload.issues.map(issue => issue.id)
                }
            }

        }
    },
})

// Action creators are generated for each case reducer function
export const {setRepositories, setRepositoryCount, setIssuesByRepoId, initResults} = resultSlice.actions

export default resultSlice.reducer