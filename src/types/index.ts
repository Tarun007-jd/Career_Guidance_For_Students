export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
      newsletters: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'private' | 'contacts';
      dataSharing: boolean;
      analytics: boolean;
    };
    appearance: {
      theme: 'light' | 'dark' | 'system';
      language: string;
      fontSize: 'small' | 'medium' | 'large';
    };
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  color: string;
}