export const AUTH = {
  USER_TOKEN: "userToken",
  USER_REFRESH_TOKEN: "userRefreshToken",
  USER: "user",
  TYPE: "type",
  IMPERSONATION: "impersonation",
  IMPERSONATIONTWO: "impersonationtwo",
};

export const isRememberMeSession = () => {
  return !localStorage.getItem(AUTH.USER_TOKEN);
};

export const getStorage = () => {
  return isRememberMeSession() ? localStorage : localStorage;
};

export const getToken = () => {
  return (
    localStorage.getItem(AUTH.USER_TOKEN) ??
    localStorage.getItem(AUTH.USER_TOKEN)
  );
};

export const clear = () => {
  localStorage.clear();
  localStorage.clear();
};

export const getUserAuth = () => {
  const storage = getStorage();

  return {
    userToken: storage.getItem(AUTH.USER_TOKEN),
    userRefreshToken: storage.getItem(AUTH.USER_REFRESH_TOKEN),
    user: storage.getItem(AUTH.USER),
    type: storage.getItem(AUTH.TYPE),
    impersonation: storage.getItem(AUTH.IMPERSONATION),
    impersonationtwo: storage.getItem(AUTH.IMPERSONATIONTWO),
  };
};

export const setUserAuth = (data, isRememberMe) => {
  // const storage = isRememberMe ? localStorage : localStorage;
  const storage =  localStorage ;

  storage.setItem(AUTH.USER_TOKEN, data.accessToken);
  storage.setItem(AUTH.USER_REFRESH_TOKEN, data.refreshToken);
  storage.setItem(AUTH.USER, JSON.stringify({ ...data.user, tenanentUser: data.tenanentUser }));
  if(data?.tenanentUser){
    storage.setItem(AUTH.USER, JSON.stringify({ ...data.user, isTenDlcSubmit: data?.tenant10Dlc, isNewUser: data?.isNewUser }));
  }
  storage.setItem(AUTH.TYPE, data.type);
  storage.setItem(AUTH.TYPE, data.type);
};

export const setUserImpersonation = (data) => {
  const storage = getStorage();
  if (storage?.impersonation) {
    storage.setItem(AUTH.IMPERSONATIONTWO, JSON.stringify(getUserAuth()));
  } else {
    storage.setItem(AUTH.IMPERSONATION, JSON.stringify(getUserAuth()));
  }
  setUserAuth(data, isRememberMeSession());
};

export const removeUserImpersonation = () => {
  const storage = getStorage();
  if (storage?.impersonationtwo) {
    const user = JSON.parse(storage.getItem(AUTH.IMPERSONATIONTWO));
    user.accessToken = user[AUTH.USER_TOKEN];
    user.refreshToken = user[AUTH.USER_REFRESH_TOKEN];
    user.user = JSON.parse(user[AUTH.USER]);
    setUserAuth(user, isRememberMeSession());
    storage.removeItem(AUTH.IMPERSONATIONTWO);
  } else {
    const user = JSON.parse(storage.getItem(AUTH.IMPERSONATION));
    user.accessToken = user[AUTH.USER_TOKEN];
    user.refreshToken = user[AUTH.USER_REFRESH_TOKEN];
    user.user = JSON.parse(user[AUTH.USER]);
    setUserAuth(user, isRememberMeSession());
    storage.removeItem(AUTH.IMPERSONATION);
  }
};
