import React from "react";
import './App.module.scss';
import ResultPage from "./components/ResultPage/ResultPage";
import {useSelector} from "react-redux";
import classes from "./App.module.scss";
import SearchBar from "./containers/SearchBar/SearchBar";

function App() {
    const searchValue = useSelector(store => store.search.value);

    const getContent = () => {
        if (!searchValue) {
            return (
                <div className={classes['home']}>
                    <SearchBar/>
                </div>
            )
        }

        return <ResultPage/>;
    }

    return (
        <div className={classes['app']}>
            {getContent()}
        </div>
    )
}

export default App;
