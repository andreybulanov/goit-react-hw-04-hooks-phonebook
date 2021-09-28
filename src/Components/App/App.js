import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PrimaryTitle, SecondaryTitle } from './App.styled.jsx';
import { ContactsForm } from '../ContactsForm/ContactsForm.jsx';
import { ContactsList } from '../ContactsList/ContactsList.jsx';
import { Filter } from '../Filter/Filter.jsx';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const storageContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(storageContacts);

    if (storageContacts) {
      setContacts([...parsedContacts]);
    }
  }, []);

  const notification = name =>
    toast(`${name} is already in contacts`, {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        duration: 4000,
      },
    });

  const handleFilter = text => {
    setFilter(text);
  };

  const addContact = (name, number) => {
    const newContact = { id: uuidv4(), name, number };

    contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
    )
      ? notification(newContact.name)
      : setContacts([newContact, ...contacts]);
  };

  const showContacts = () => {
    const lowerSymbol = filter.toLowerCase();
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(lowerSymbol),
    );
  };

  const removeContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <>
      <PrimaryTitle>Phonebook</PrimaryTitle>
      <ContactsForm onSubmit={addContact} />

      <SecondaryTitle>Contacts</SecondaryTitle>
      <Filter onChange={handleFilter} value={filter} />
      <ContactsList contacts={showContacts()} deleteId={removeContact} />
      <Toaster />
    </>
  );
}
