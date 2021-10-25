import React from 'react';
import SearchBar from "../../containers/SearchBar/SearchBar";
import classes from './Home.module.scss';

const Home = ({setSearchValue}) => {
    return (
        <div className={classes['home']}>
            <SearchBar setSearchValue={setSearchValue}/>
        </div>
    );
};

export default Home;
