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
    const categories = contact.categories.join(', ');
    const result_array = contact.phones.map(phone => 
        `${phone.number} (${phone.description}) ${contact.name} ${contact.surname}. ${categories}. ID ${contact.id}`
    );
    return result_array.join('\n');
}
