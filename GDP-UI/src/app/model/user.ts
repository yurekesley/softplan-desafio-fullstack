import { ProfileTypes } from './profile-types';

export class User {
  id: number;
  login: string;
  password: string;
  name: string;
  lastName: string;
  profile: ProfileTypes;

  constructor(init?: Partial<User>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
