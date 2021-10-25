import { ApolloClient, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
    defaultOptions: {
        query: {
            fetchPolicy: 'network-only'
        },
        watchQuery: { fetchPolicy: "no-cache" },
    },
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        'Authorization': 'bearer ' + process.env.REACT_APP_GITHUB_TOKEN,
    }
});
