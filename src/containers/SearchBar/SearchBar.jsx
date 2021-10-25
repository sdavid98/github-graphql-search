import React, {useState} from 'react';
import classes from './SearchBar.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setSearchValue} from "../../store/search";
import {setActiveEndCursor, setActivePageNum} from "../../store/page";
import {initResults} from "../../store/result";

const SearchBar = () => {
    const dispatch = useDispatch();
    const storedSearchValue = useSelector(store => store.search.value);
    const [searchText, updateSearchText] = useState(storedSearchValue);

    const onSearchFormSubmit = (e) => {
        e.preventDefault();
        dispatch(initResults());
        dispatch(setActiveEndCursor(true));
        dispatch(setSearchValue(searchText));
        dispatch(setActivePageNum(1));
    }

    return (
        <div className={classes['searchbar']}>
            <form onSubmit={onSearchFormSubmit}>
                <label htmlFor="search">Search for a GitHub repository by name:</label>
                <input id={'search'} value={searchText} onChange={e => updateSearchText(e.target.value)} type="text"/>
                <button type={'submit'}>Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
