import React from "react";
import ContactItem from "../ContactItem/ContactItem";

const ContactList = () => {
  return (
    <section>
      <ContactItem
        id={0}
        name={"name"}
        surname={"surname"}
        tel={"9999999999"}
        email={"example@example.com"}
        description={"Good man"}
        deleteContact={() => {}}
        patchData={() => {}}
      />
      <ContactItem
        id={100}
        name={"namenamenamenamenamenamename"}
        surname={"surname"}
        tel={"1111111111"}
        email={"example@example.com"}
        description={"Bad man"}
        deleteContact={() => {}}
        patchData={() => {}}
      />
    </section>
  );
};

export default ContactList;
