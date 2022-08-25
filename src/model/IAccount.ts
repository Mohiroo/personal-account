export interface IAccount {
  id: number;
  name: string;
  contacts: IContacts[];
}

export interface IContacts {
  name: string;
  tel: string;
}
