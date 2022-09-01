import { Empty } from "antd";
import React from "react";
import { IContacts } from "../../model/IContacts";
import ContactItem from "../ContactItem/ContactItem";
import "./ContactList.scss";

interface ContactListProps {
  contacts: IContacts[];
  deleteContact: (contact: IContacts) => void;
  unpdateContact: (contact: IContacts) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, deleteContact, unpdateContact }) => {
  return (
    <section className="contact-list">
      {contacts.length ? (
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            userId={contact.userId}
            name={contact.name}
            surname={contact.surname}
            tel={contact.tel}
            email={contact.email}
            description={contact.description}
            deleteContact={deleteContact}
            unpdateContact={unpdateContact}
          />
        ))
      ) : (
        <Empty description={"Контактов нет :("} />
      )}
    </section>
  );
};

export default ContactList;
