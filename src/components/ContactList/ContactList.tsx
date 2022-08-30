import { Empty } from "antd";
import React from "react";
import { IContacts } from "../../model/IAccount";
import ContactItem from "../ContactItem/ContactItem";

interface ContactListProps {
  contacts: IContacts[];
  deleteContact: (contact: IContacts) => void;
  sendChanges: (contact: IContacts) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, deleteContact, sendChanges }) => {
  return (
    <section>
      {contacts.length ? (
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            name={contact.name}
            surname={contact.surname}
            tel={contact.tel}
            email={contact.email}
            description={contact.description}
            deleteContact={deleteContact}
            sendChanges={sendChanges}
          />
        ))
      ) : (
        <Empty description={"Контактов нет :("} />
      )}
    </section>
  );
};

export default ContactList;
