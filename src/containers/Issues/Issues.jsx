import React, {useState} from 'react';
import {useQuery} from "@apollo/client";
import {
    GET_ISSUES_BY_OWNER_AND_REPO_NAME,
    GET_ISSUES_BY_OWNER_AND_REPO_NAME_WITH_CURSOR
} from "../../utils/queries";
import {useDispatch, useSelector} from "react-redux";
import {setIssuesByRepoId} from "../../store/result";
import classes from './Issues.module.scss';

const Issues = ({repoName, repoOwner, repoId}) => {
    const dispatch = useDispatch();
    const issueDataByRepoId = useSelector(store => store.result.issuesByRepoId[repoId]);
    const [query, setQuery] = useState(GET_ISSUES_BY_OWNER_AND_REPO_NAME);
    const [needQuery, setNeedQuery] = useState(true);
    const [issueStateIsClosed, setIssueStateIsClosed] = useState(true);

    const {loading, error} = useQuery(query, {
        variables: {
            name: repoName,
            owner: repoOwner,
            cursor: issueDataByRepoId?.cursor
        },
        skip: !needQuery,
        onCompleted: (data) => {
            setNeedQuery(false);
            dispatch(setIssuesByRepoId({
                id: repoId,
                issues: data.repository.issues.nodes,
                issueCount: data.repository.issues.totalCount,
                cursor: data.repository.issues.pageInfo.endCursor
            }))
        }
    });

    const onLoadMoreClick = () => {
        setQuery(GET_ISSUES_BY_OWNER_AND_REPO_NAME_WITH_CURSOR);
        setNeedQuery(true)
    }

    if (loading || !issueDataByRepoId) {
        return <p>Loading..</p>
    }

    if (error) {
        console.log(error)
        return <p>Error</p>
    }

    return (
        <div>
            <div className={classes['issue-state-select']}>
                <div>
                    <input id={'closedState'} onChange={() => setIssueStateIsClosed(true)} type="radio"
                           name={"issueState"} checked={issueStateIsClosed}/>
                    <label htmlFor="closedState">Closed</label>
                </div>
                <div>
                    <input id={'openState'} type="radio" name={"issueState"}
                           onChange={() => setIssueStateIsClosed(false)}
                           checked={!issueStateIsClosed}/>
                    <label htmlFor="openState">Open</label>
                </div>
            </div>
            {issueDataByRepoId.issues.filter(issue => issue.closed === issueStateIsClosed).map(issue => (
                <div className={classes['issue']} key={issue.id}>
                    <a href={issue.url}>{issue.title} <span>{issue.createdAt.split('T')[0]}</span></a>
                </div>
            ))}
            {issueDataByRepoId.allIds.length < issueDataByRepoId.issueCount &&
            <button onClick={onLoadMoreClick}>Load more</button>}
        </div>
    );
};

export default Issues;
