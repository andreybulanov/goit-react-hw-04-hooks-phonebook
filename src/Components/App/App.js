import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { PrimaryTitle, SecondaryTitle } from "./App.styled.jsx";
import { ContactsForm } from "../ContactsForm/ContactsForm.jsx";
import { ContactsList } from "../ContactsList/ContactsList.jsx";
import { Filter } from "../Filter/Filter.jsx";
import toast, { Toaster } from "react-hot-toast";

export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const storageContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(storageContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  handleFilter = (text) => {
    this.setState({ filter: text });
  };

  addContact = (name, number) => {
    const { contacts } = this.state;
    const newContact = { id: uuidv4(), name, number };

    contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? toast(`${newContact.name} is already in contacts`, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            duration: 4000,
          },
        })
      : this.setState({
          contacts: [newContact, ...contacts],
        });
  };

  showContacts = () => {
    const { filter, contacts } = this.state;
    const lowerSymbol = filter.toLowerCase();
    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(lowerSymbol)
    );
  };

  removeContact = (id) => {
    const { contacts } = this.state;
    this.setState({
      contacts: contacts.filter((contact) => contact.id !== id),
    });
  };

  render() {
    const { handleFilter, addContact, showContacts, removeContact, state } =
      this;
    return (
      <>
        <PrimaryTitle>Phonebook</PrimaryTitle>
        <ContactsForm onSubmit={addContact} />

        <SecondaryTitle>Contacts</SecondaryTitle>
        <Filter onChange={handleFilter} value={state.filter} />
        <ContactsList contacts={showContacts()} deleteId={removeContact} />
        <Toaster />
      </>
    );
  }
}
