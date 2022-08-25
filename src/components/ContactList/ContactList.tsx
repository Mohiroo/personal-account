import React from 'react';
import ContactItem from '../ContactItem/ContactItem';

const ContactList = () => {
  return (
    <section>
      <ContactItem id={0} name={'name'} surname={'surname'} telephone={'+7111222333'} email={'example@example.com'} description={'Good man'}/>
    </section>
  );
};

export default ContactList;