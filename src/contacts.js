import { request } from 'graphql-request'

export const findContacts = async (filter) => {
    console.log(`Searching ${filter}`);
    const query = `
      query findContacts($filter: String) {
        contacts(filter:$filter) {
          categories
          id
          name
          nicknames
          phones {
            description,
            number
          }
          surname
        }
      }
    `
    const variables = { filter: filter };
    const { contacts } = await request('http://localhost:4000/graphql', query, variables);
    const summary_array = contacts.map(contact => getContactSummary(contact));
    return summary_array.join('\n');
}

export const getIdContact = async (id) => {
    console.log(`Getting ID ${id} is not implemented`);
    return 1;
}

const getContactSummary = (contact) => {
    let result = contact.name;
    if (contact.surname !== null) {
        result += ` ${contact.surname}`
    }
    if (contact.categories !== null) {
        result += `. ${contact.categories.join(', ')}`;
    }
    result += `. ID ${contact.id}`;
    if (contact.phones === null) {
        return result;
    }
    const phonesSummary = contact.phones.map(phone =>
        phone.description === null ? phone.number : `${phone.number} (${phone.description})`
    );
    return phonesSummary.map(phoneSummary => `${phoneSummary} ${result}`).join('\n');
}
