import {history} from '../routes/index';

export const doLogout = () => {
    localStorage.clear();
    history.push('/auth/login')
}