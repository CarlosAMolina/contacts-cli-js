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
  const variables = { filter: filter }
  const { contacts } = await request('http://localhost:4000/graphql', query, variables);
  return contacts;
}

export const getIdContact = async (id) => {
  console.log(`Getting ID ${id}`);
  return 1;
}
