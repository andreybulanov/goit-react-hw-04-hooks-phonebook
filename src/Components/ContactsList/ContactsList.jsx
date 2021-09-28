import { List, ListItem } from "./ContactsList.styled";
import { Button } from '../Buttons/Buttons.styled';

export const ContactsList = ({ contacts, deleteId }) => {
    return (
        <div>
            <List>
                {contacts.map((contact) => {
                    const { id, name, number } = contact;
                    return (
                        <ListItem key={id}>
                            {name} - {number}{" "}
                            <Button type="button" onClick={() => deleteId(id)}>
                                Delete
                            </Button>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
}