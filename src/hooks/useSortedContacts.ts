import { useMemo } from "react";
import { IContacts } from "../model/IContacts";

export const useSortedContacts = (contacts: IContacts[], query: string, mode: string): IContacts[] => {
  const searchedContacts = useMemo(() => {
    if (mode === "none" || mode === "") return contacts;

    if (mode === "name") {
      return [...contacts?.filter((contact) => contact.name.toLowerCase().includes(query.toLowerCase()))];
    }

    if (mode === "surname") {
      return [...contacts?.filter((contact) => contact.surname.toLowerCase().includes(query.toLowerCase()))];
    }

    if (mode === "tel") {
      return [...contacts?.filter((contact) => contact.tel.includes(query))];
    }

    if (mode === "email") {
      return [...contacts?.filter((contact) => contact.email.toLowerCase().includes(query.toLowerCase()))];
    }

    return [];
  }, [mode, contacts, query]);

  return searchedContacts;
};
