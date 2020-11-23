
const localStorageKey = 'ct-js-qr-contacts';

const setContacts = (contacts) => localStorage.setItem(localStorageKey, btoa(JSON.stringify(contacts)));

const getContacts = () => {
  const jsonString = localStorage.getItem(localStorageKey) || btoa('[]');

  return JSON.parse(atob(jsonString));
};
const generateContactId = () => (getContacts().length ? getContacts()[getContacts().length - 1].id + 1 : 1);

const contactService = {
  getContacts: () => getContacts(),

  getContactById: (contactId) => getContacts().find((contact) => contact.id === contactId),

  createContact(contactPayload) {
    const newContact = {
      id: generateContactId(),
      ...contactPayload,
    };

    const contacts = getContacts();
    contacts.push(newContact);

    setContacts(contacts);

    return newContact;
  },

  deleteContact: (contactId) => {
    const contactIndex = getContacts().findIndex((contact) => contact.id === contactId);
    const contacts = getContacts();
    contacts.splice(contactIndex, 1);

    setContacts(contacts);

    return null;
  },
};

export default contactService;
