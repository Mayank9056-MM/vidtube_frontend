export interface RegisterUserData {
  username: string;
  fullName: string;
  email: string;
  password: string;
  avatar: File;
  coverImage?: File;
}

export interface LoginUserData {
  emailOrUsername: string;
  password: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateAccountData {
  fullName?: string;
  email?: string;
}

export interface UpdateAvatarData {
  avatar: File;
}

export interface UpdateThumbnailData {
  coverImage: File;
}
