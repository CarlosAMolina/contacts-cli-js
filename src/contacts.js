import { request } from 'graphql-request'

export const findContacts = async (filter) => {
  console.log(`Searching ${filter}`);
  const query = `
    {
      contacts {
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
  request('http://localhost:4000/graphql', query)
    .then(console.log)
    .catch(console.error)
  return 1;
}

export const getIdContact = async (id) => {
  console.log(`Getting ID ${id}`);
  return 1;
}
