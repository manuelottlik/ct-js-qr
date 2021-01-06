const localStorageKey = 'ct-js-qr-profile';

const profileService = {
  getProfile: () => {
    const jsonString = localStorage.getItem(localStorageKey);
    const emptyProfile = {
      name: null,
      email: null,
      phone: null,
    };

    return jsonString ? JSON.parse(atob(jsonString)) : emptyProfile;
  },

  setProfile: (profile) => localStorage.setItem(localStorageKey, btoa(JSON.stringify(profile))),
};

export default profileService;
