export interface BaseUser {
  id: number;
  username: string;
  email: string;
}

export interface User extends BaseUser {
  password: string;
  name: string;
}

export interface SanitisedUser extends BaseUser {
  name: string;
}

export interface CachedUser extends BaseUser {
  password: string;
  firstName: string;
  lastName: string;
}
