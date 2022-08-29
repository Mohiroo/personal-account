export interface IAccount {
  id: number;
  user: string;
  contacts: IContacts[];
}

export interface IContacts {
  id: number;
  name: string;
  surname: string;
  tel: string;
  email: string;
  description: string;
}
