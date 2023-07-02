import { ContactForm } from './contactform/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './contactlist/ContactList';
import { Filter } from './filter/Filter';
import css from './app.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsFromLS = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromLS);
    return parsedContacts || [];
  });
  const [filter, setFilter] = useState('');

  const addContact = (addedName, addedNumber) => {
    const contact = {
      id: nanoid(3),
      name: addedName,
      number: addedNumber,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === addedName.toLowerCase()
      )
    ) {
      return alert(`${addedName} is already in contacts!`);
    }

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const addContactForm = e.currentTarget;
    const addedName = addContactForm.elements.name.value;
    const addedNumber = addContactForm.elements.number.value;

    addContact(addedName, addedNumber);
    addContactForm.reset();
  };

  const filterContact = evt => {
    setFilter(evt.target.value);
  };

  const removeContact = idToRemove => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== idToRemove)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.container}>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2 className={css.headerSecondary}>Contacts</h2>
      <div className={css.contactsBox}>
        <Filter findContact={filterContact} filter={filter} />
        <ContactList
          contacts={contacts}
          filter={filter}
          removeContact={removeContact}
        />
      </div>
    </div>
  );
};
