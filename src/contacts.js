import { request } from 'graphql-request'

const api_port = typeof process.env.API_PORT === 'undefined' ? 4000 : process.env.API_PORT;
const API_URL = `http://localhost:${api_port}/graphql`;

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
    const { contacts } = await request(API_URL, query, variables);
    const summary_array = contacts.map(contact => getContactSummary(contact));
    return summary_array.join('\n');
}

export const getIdContact = async (id) => {
    console.log(`Searching ID ${id}`);
    const query = `
      query findContacts($id: Int) {
        contacts(id:$id) {
          addresses
          categories
          id
          emails
          socialNetwork {
            discordAccounts {
              alias
              discriminator
              globalName
              legacyUserName
              userName
            }
            facebookAccounts
            githubAccounts
            instagramAccounts
            linkedinAccounts
            telegramAccounts
            tiktokAccounts
            twitterAccounts
            wallapopAccounts {
              url
              note
            }
          }
          name
          nicknames
          note
          phones {
            description,
            number
          }
          surname
          urls
        }
      }
    `
    const variables = { id : id };
    const { contacts } = await request(API_URL, query, variables);
    return getContactAllData(contacts[0]);
}

const getContactAllData = (contact) => {
    let result = contact.name;
    if (contact.surname !== null) {
        result += ` ${contact.surname}`;
    }
    if (contact.categories !== null) {
        result += '\nCategories:\n  ';
        result += contact.categories.join('\n  ');
    }
    if (contact.phones !== null) {
        result += '\nPhones:\n  ';
        const phones = contact.phones.map(phone =>
            phone.description === null ? phone.number : `${phone.number} ${phone.description}`
        );
        result += phones.join('\n  ');
    }
    if (contact.addresses !== null) {
        result += '\nAddresses:\n  ';
        result += contact.addresses.join('\n  ');
    }
    if (contact.emails !== null) {
        result += '\nEmails:\n  ';
        result += contact.emails.join('\n  ');
    }
    return result;
}

const getContactSummary = (contact) => {
    let result = contact.name;
    if (contact.surname !== null) {
        result += ` ${contact.surname}`;
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
