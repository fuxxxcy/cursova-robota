import React from 'react';

interface ApiContextProps {
    apiBaseUrl: string;
}

const ApiContext = React.createContext<ApiContextProps>({
    apiBaseUrl: 'http://localhost:4000/api'
});

export default ApiContext;