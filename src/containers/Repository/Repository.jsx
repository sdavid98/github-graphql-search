import React, {useState} from 'react';
import externalIcon from './external-link-alt-solid.svg';
import forkIcon from './code-branch-solid.svg';
import arrowIcon from './chevron-down-solid.svg';
import classes from './Repository.module.scss';
import Issues from "../Issues/Issues";

const Repository = ({repo}) => {
    const [isIssuesOpen, setIsIssuesOpen] = useState(false);

    const toggleIssues = () => {
        if (repo.issues.totalCount > 0) {
            setIsIssuesOpen(oldState => !oldState);
        }
    }

    return (
        <div className={classes['repository']}>
            <div className={classes['repository__top-bar']}>
                <h3 className={classes['repository__title']}>
                    <a href={repo.url} rel="noreferrer" target={'_blank'}>
                        {repo.name} <img
                        className={classes['repository__icon']} alt={'external link'}
                        src={externalIcon}/>
                    </a>
                </h3>
                <div>
                    <img className={classes['repository__icon']} alt={'forks'} src={forkIcon}/>Forks: {repo.forkCount}
                </div>
            </div>
            <p className={classes['repository__description']}>{repo.description}</p>
            <div onClick={toggleIssues}>Open Issues: {repo.issues.totalCount}
                {repo.issues.totalCount > 0 && (
                    <img
                        className={`${classes['repository__icon']} ${classes['repository__icon--opener']} ${isIssuesOpen ? classes['repository__icon--rotated'] : ''}`}
                        alt={isIssuesOpen ? 'close' : 'open'} src={arrowIcon}/>
                )}
            </div>
            {isIssuesOpen && <Issues repoName={repo.name} repoId={repo.id} repoOwner={repo.owner.login}/>}
        </div>
    );
};

export default Repository;
