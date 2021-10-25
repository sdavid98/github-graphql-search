import React from 'react';
import SearchBar from "../../containers/SearchBar/SearchBar";
import Results from "../Results/Results";

const ResultPage = () => {
    return (
        <div>
            <SearchBar/>
            <Results/>
        </div>
    );
};

export default ResultPage;
