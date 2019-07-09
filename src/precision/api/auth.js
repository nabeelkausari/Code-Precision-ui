let authHeader = undefined;
const key = '__auth';
export const authorizer = {
    setHeader: (authorizationHeader) => {
        authHeader = authorizationHeader;
        if (authHeader === undefined)
            localStorage.removeItem(key);
        else
            localStorage.setItem(key, authorizationHeader);
    },
    getHeader: () => {
        authHeader = authHeader || localStorage.getItem(key);
        return authHeader;
    }
};
