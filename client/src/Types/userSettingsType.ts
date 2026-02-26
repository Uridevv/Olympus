export interface UserSettings {
  _id: string;
  userId: string;
  twoFactorAuth: boolean;
  recoveryEmail: string;
  securityQuestions: [string, string, string];
  country: string;
  createdAt: string;
  updatedAt: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface UserSettingsGeneral {
  name: string;
  lastName: string;
  email: string;
  bornDate: Date;
}

export interface UserSettingsSecurity {
  recoveryEmail: string;
  securityQuestion1: string;
  securityQuestion2: string;
  securityQuestion3: string;
}

export interface UserSettingsPrivacity {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface userSettingsData {
  name?:string;
  lastName?:string;
  bornDate?:Date;
  twoFactorAuth?: boolean;
  recoveryEmail?: string;
  securityQuestions?: [string, string, string];
  country?: string;
  createdAt?: string;
  updatedAt?: string;
  notificationPreferences?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
}
