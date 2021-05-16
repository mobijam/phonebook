import axios from 'axios';
import {
    addContactRequest, addContactSuccess, addContactError,
    deleteContactRequest, deleteContactSuccess, deleteContactError,
    fetchContactRequest, fetchContactSuccess, fetchContactError,
    editContactRequest, editContactSuccess, editContactError,
} from './actions';


export const fetchContact = () => dispatch => {
    dispatch(fetchContactRequest());

    axios
        .get('/contacts')
        .then(({ data }) => dispatch(fetchContactSuccess(data)))
        .catch(error => dispatch(fetchContactError(error.message)));
}

export const addContact = (name, number) => dispatch => {
    const contact = {
        name,
        number,
        completed: false,
        date: Date.now(),
    }

    dispatch(addContactRequest())

    axios
        .post('/contacts', contact)
        .then(({ data }) => dispatch(addContactSuccess(data)))
        .catch(error => dispatch(addContactError(error.message)));
};

export const deleteContact = contactId => dispatch => {
    dispatch(deleteContactRequest());

    axios
        .delete(`/contacts/${contactId}`)
        .then(() => dispatch(deleteContactSuccess(contactId)))
        .catch(error => dispatch(deleteContactError(error.message)));
};

export const editContact = (contactId, name, number) => dispatch => {
    const contact = {
        name,
        number,
    };

    dispatch(editContactRequest());

    axios
        .patch(`/contacts/${contactId}`, contact)
        .then(({data}) => dispatch(editContactSuccess(data)))
        .catch(error => dispatch(editContactError(error.message)));
};