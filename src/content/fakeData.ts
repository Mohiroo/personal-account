import { IContacts } from "../model/IContacts";

export const fakeData = (userId: string): IContacts[] => [
  {
    userId: userId,
    name: "Виктор",
    surname: "Баринов",
    tel: "9651111111",
    email: "example@example.com",
    description: "Познакомились вчера",
  } as IContacts,
  {
    userId: userId,
    name: "Екатерина",
    surname: "Белова",
    tel: "9662222222",
    email: "example@example.com",
    description: "Не забудь добавить описание",
  } as IContacts,
  {
    userId: userId,
    name: "Николай",
    surname: "Сергеев",
    tel: "9523333333",
    email: "example@example.com",
    description: "",
  } as IContacts
];
