import { Component } from "react";
import { Form, Label, Input } from './ContactsForm.styled';
import { Button } from '../Buttons/Buttons.styled';

export class ContactsForm extends Component {
    state = {
        name: "",
        number: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, number } = this.state;
        const { onSubmit } = this.props;

        onSubmit(name, number);
        this.setState({
            name: "", number: ""
        });
    };

    render() {
        const { handleSubmit, handleChange } = this;
        const { name, number } = this.state;
        return (
            <Form action="" onSubmit={handleSubmit}>
                <Label htmlFor="name">Name</Label>
                <Input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    required
                />
                <Label htmlFor="number">Number</Label>
                <Input
                    onChange={handleChange}
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    required
                />
                <Button type="submit"> Add contact</Button>
            </Form>
        );
    }
}
