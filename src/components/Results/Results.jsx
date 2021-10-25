import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client";
import {GET_REPOS_BY_NAME, GET_REPOS_BY_NAME_AND_OFFSET} from "../../utils/queries";
import {useDispatch, useSelector} from "react-redux";
import {setRepositories, setRepositoryCount} from "../../store/result";
import {setActiveEndCursor, setTotalPageCount} from "../../store/page";
import {RESULTS_NUM_PER_PAGE} from "../../utils/constants";
import Repository from "../../containers/Repository/Repository";

const Results = () => {
    const dispatch = useDispatch();
    const {repositories, repositoryCount} = useSelector(store => store.result)
    const activeEndCursor = useSelector(store => store.page.activeEndCursor);
    const searchValue = useSelector(store => store.search.value);
    const [query, setQuery] = useState(GET_REPOS_BY_NAME);

    useEffect(() => {
        setQuery(GET_REPOS_BY_NAME)
    }, [searchValue])

    console.log(activeEndCursor, query)
    const {loading, error} = useQuery(query, {
        variables: {
            name: searchValue,
            cursor: activeEndCursor
        },
        skip: !activeEndCursor,
        onCompleted: (data) => {
            console.log(data)
            dispatch(setRepositories(data.search.edges));
            dispatch(setRepositoryCount(data.search.repositoryCount));
            dispatch(setActiveEndCursor(false));
            dispatch(setTotalPageCount(Math.ceil(data.search.edges.length / RESULTS_NUM_PER_PAGE)));
        }
    });

    const onLoadMoreClick = () => {
        setQuery(GET_REPOS_BY_NAME_AND_OFFSET);
        dispatch(setActiveEndCursor(repositories.at(-1).cursor))
    }

    if (loading && repositories.length === 0) {
        return <p>Loading..</p>
    }

    if (error) {
        console.log(error)
        return <p>Error</p>
    }

    return (
        <div>
            <h2>Results: {repositoryCount}</h2>
            {repositories.map(repo => (
                <Repository key={repo.cursor} repo={repo.node}/>
            ))}
            {repositories.length < repositoryCount && <button onClick={onLoadMoreClick}>Load more</button>}
        </div>
    );
};

export default Results;
