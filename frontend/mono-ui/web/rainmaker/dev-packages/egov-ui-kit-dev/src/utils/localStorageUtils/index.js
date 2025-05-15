// import { getUserSearchedResponse } from "egov-ui-kit/utils/commons";

// const appName = process.env.REACT_APP_NAME;

// //GET methods
// export const getAccessToken = () => {
//   return localStorageGet(`token`);
// };
// export const getUserInfo = () => {
//   return localStorageGet("user-info");
// };
// export const getTenantId = () => {
//   return localStorageGet("tenant-id");
// };
// export const getLocalization = (key) => {
//   return localStorage.getItem(key);
// };
// export const getLocale = () => {
//   return localStorage.getItem("locale");
// };
// export const getModule = () => {
//   return localStorage.getItem("module");
// };
// export const getLocalizationLabels = () => {
//   return localStorage.getItem(`localization_${getLocale()}`);
// };
// export const getStoredModulesList = () => {
//   return localStorage.getItem("storedModulesList");
// };

// //SET methods
// export const setUserInfo = (userInfo) => {
//   if (process.env.REACT_APP_NAME == "Citizen") {
//     localStorageSet("user-info", userInfo, null);
//   } else {
//     let userObject = JSON.parse(userInfo) || {};
//     userObject.roles = userObject.roles && userObject.roles.filter((role) => role.tenantId == userObject.tenantId);
//     localStorageSet("user-info", JSON.stringify(userObject), null);
//   }
// };
// export const setAccessToken = (token) => {
//   localStorageSet("token", token, null);
// };
// export const setRefreshToken = (refreshToken) => {
//   localStorageSet("refresh-token", refreshToken, null);
// };
// export const setUserObj = (user = {}) => {
//   localStorage.setItem("citizen.userRequestObject", user );
//   sessionStorage.setItem("Digit.citizen.userRequestObject", JSON.stringify({ value: { info: JSON.parse(user ) } }));
// };
// export const setTenantId = (tenantId) => {
//   localStorageSet("tenant-id", tenantId, null);
//   if (process.env.REACT_APP_NAME != "Citizen") {
//     window.sessionStorage.clear();
//     Object.keys(window.localStorage)
//       .filter((key) => key.startsWith("Digit"))
//       .map((key) => localStorage.removeItem(key));
//     const userObj = getUserSearchedResponse();
//     let user = (userObj && userObj.user && userObj.user[0]) || {};
//     user = { ...user, tenantId: tenantId };
//     setUserObj(JSON.stringify(user));
//     setUserInfo(JSON.stringify({ ...user }));
//   }
// };
// export const setLocale = (locale) => {
//   localStorageSet("locale", locale);
//   localStorage.setItem("locale", locale);
//   sessionStorage.setItem("Digit.locale", JSON.stringify({ value: locale }));
// };
// export const setModule = (moduleName) => {
//   localStorageSet("module", moduleName);
// };
// export const setReturnUrl = (url) => {
//   localStorageSet("returnUrl", url);
// };
// export const setStoredModulesList = (storedModuleList) => {
//   localStorage.setItem("storedModulesList", storedModuleList);
// };

// //Remove Items (LOGOUT)
// export const clearUserDetails = () => {
//   window.localStorage.clear();
//   window.sessionStorage.clear();
// };
// //Role specific get-set Methods
// export const localStorageGet = (key, path) => {
//   const appName = process.env.REACT_APP_NAME;
//   let value = null;
//   if (path) {
//     const data = JSON.parse(window.localStorage.getItem(appName + "." + key)) || null;
//     value = get(data, path);
//   } else {
//     value = window.localStorage.getItem(appName + "." + key) || null;
//   }
//   return value;
// };
// export const localStorageSet = (key, data, path) => {
//   const appName = process.env.REACT_APP_NAME;
//   const storedData = window.localStorage.getItem(appName + "." + key);

//   if (path) {
//     set(storedData, path, data);
//     window.localStorage.setItem(appName + "." + key, storedData);
//     window.localStorage.setItem(key, storedData);
//   } else {
//     window.localStorage.setItem(appName + "." + key, data);
//     window.localStorage.setItem(key, data);
//   }
// };
// //Remove Item
// export const lSRemoveItem = (key) => {
//   const appName = process.env.REACT_APP_NAME;
//   window.localStorage.removeItem(appName + "." + key);
// };

// // get tenantId for Employee/Citizen
// export const getTenantIdCommon = () => {
//   return process.env.REACT_APP_NAME === "Citizen" ? JSON.parse(getUserInfo()).permanentCity : getTenantId();
// };

import { getUserSearchedResponse } from "egov-ui-kit/utils/commons";
import get from "lodash/get";
import set from "lodash/set";

const appName = process.env.REACT_APP_NAME;

// Helper to get current userId safely (without optional chaining)
const getCurrentUserId = () => {
  try {
    const userInfoRaw = window.localStorage.getItem(`${appName}.user-info`);
    if (!userInfoRaw) return null;
    const userInfo = JSON.parse(userInfoRaw);
    // Adjust the property to your actual user ID field
    if (userInfo && (userInfo.id || userInfo.uuid || userInfo.userId)) {
      return userInfo.id || userInfo.uuid || userInfo.userId;
    }
    return null;
  } catch (e) {
    return null;
  }
};

// Compose key with appName + userId (if exists) + key
const getScopedKey = (key) => {
  const userId = getCurrentUserId();
  if (userId) {
    return appName + "." + userId + "." + key;
  }
  return appName + "." + key;
};

// GET methods
export const getAccessToken = () => {
  return localStorageGet(`token`);
};
export const getUserInfo = () => {
  return localStorageGet("user-info");
};
export const getTenantId = () => {
  return localStorageGet("tenant-id");
};
export const getLocalization = (key) => {
  return window.localStorage.getItem(key);
};
export const getLocale = () => {
  return window.localStorage.getItem("locale");
};
export const getModule = () => {
  return window.localStorage.getItem("module");
};
export const getLocalizationLabels = () => {
  return window.localStorage.getItem("localization_" + getLocale());
};
export const getStoredModulesList = () => {
  return window.localStorage.getItem("storedModulesList");
};

// SET methods
export const setUserInfo = (userInfo) => {
  if (appName === "Citizen") {
    localStorageSet("user-info", userInfo, null);
  } else {
    let userObject = JSON.parse(userInfo) || {};
    if (userObject.roles) {
      userObject.roles = userObject.roles.filter(function (role) {
        return role.tenantId === userObject.tenantId;
      });
    }
    localStorageSet("user-info", JSON.stringify(userObject), null);
  }
};
export const setAccessToken = (token) => {
  localStorageSet("token", token, null);
};
export const setRefreshToken = (refreshToken) => {
  localStorageSet("refresh-token", refreshToken, null);
};
export const setUserObj = (user) => {
  if (!user) user = {};
  window.localStorage.setItem("citizen.userRequestObject", user);
  window.sessionStorage.setItem("Digit.citizen.userRequestObject", JSON.stringify({ value: { info: JSON.parse(user) } }));
};
export const setTenantId = (tenantId) => {
  localStorageSet("tenant-id", tenantId, null);
  if (appName !== "Citizen") {
    window.sessionStorage.clear();
    Object.keys(window.localStorage)
      .filter(function (key) {
        return key.startsWith("Digit");
      })
      .forEach(function (key) {
        window.localStorage.removeItem(key);
      });
    const userObj = getUserSearchedResponse();
    let user = (userObj && userObj.user && userObj.user[0]) || {};
    user = Object.assign({}, user, { tenantId: tenantId });
    setUserObj(JSON.stringify(user));
    setUserInfo(JSON.stringify(user));
  }
};
export const setLocale = (locale) => {
  localStorageSet("locale", locale);
  window.localStorage.setItem("locale", locale);
  window.sessionStorage.setItem("Digit.locale", JSON.stringify({ value: locale }));
};
export const setModule = (moduleName) => {
  localStorageSet("module", moduleName);
};
export const setReturnUrl = (url) => {
  localStorageSet("returnUrl", url);
};
export const setStoredModulesList = (storedModuleList) => {
  window.localStorage.setItem("storedModulesList", storedModuleList);
};

// Remove Items (LOGOUT)
export const clearUserDetails = () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
};

// Role-specific get-set methods
export const localStorageGet = (key, path) => {
  const scopedKey = getScopedKey(key);
  let value = null;
  if (path) {
    const dataRaw = window.localStorage.getItem(scopedKey);
    let data = null;
    if (dataRaw) {
      try {
        data = JSON.parse(dataRaw);
      } catch (e) {
        data = null;
      }
    }
    value = get(data, path);
  } else {
    value = window.localStorage.getItem(scopedKey);
  }
  return value;
};

export const localStorageSet = (key, data, path) => {
  const scopedKey = getScopedKey(key);
  if (path) {
    const storedDataRaw = window.localStorage.getItem(scopedKey);
    let storedData = {};
    if (storedDataRaw) {
      try {
        storedData = JSON.parse(storedDataRaw);
      } catch (e) {
        storedData = {};
      }
    }
    set(storedData, path, data);
    window.localStorage.setItem(scopedKey, JSON.stringify(storedData));
  } else {
    const valueToStore = typeof data === "string" ? data : JSON.stringify(data);
    window.localStorage.setItem(scopedKey, valueToStore);
  }
};

export const lSRemoveItem = (key) => {
  const scopedKey = getScopedKey(key);
  window.localStorage.removeItem(scopedKey);
};

// get tenantId for Employee/Citizen
export const getTenantIdCommon = () => {
  try {
    const userInfo = getUserInfo();
    if (appName === "Citizen" && userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      return parsedUserInfo ? parsedUserInfo.permanentCity : null;
    } else {
      return getTenantId();
    }
  } catch (e) {
    return null;
  }
};
