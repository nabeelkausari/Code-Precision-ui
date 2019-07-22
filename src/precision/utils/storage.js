
const USER_ID = 'USER_ID';
const USER_PROFILE_LINK_KEY = 'USER_PROFILE_LINK_KEY';

export const setUserId = (user_id) => {
    localStorage.setItem(USER_ID, user_id.toString());
};

export const setUserProfileLink = (link) => {
    localStorage.setItem(USER_PROFILE_LINK_KEY, JSON.stringify(link));
};

export const getUserId = () => {
   return  localStorage.getItem(USER_ID);
};

export const getUserProfileLink = () => {
    const userProfileLink = localStorage.getItem(USER_PROFILE_LINK_KEY);
    return JSON.parse(userProfileLink);
};
