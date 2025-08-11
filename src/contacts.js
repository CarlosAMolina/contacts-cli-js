import { request } from 'graphql-request'

const api_port = typeof process.env.API_PORT === 'undefined' ? 4000 : process.env.API_PORT;
const api_ip = typeof process.env.API_IP === 'undefined' ? 'localhost' : process.env.API_IP;
const API_URL = `http://${api_ip}:${api_port}/graphql`;

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
    if (contact.nicknames !== null) {
        result += '\nNicknames:\n  ';
        result += contact.nicknames.join('\n  ');
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
    if (contact.note !== null) {
        result += `\nNote: ${contact.note}`;
    }
    if (contact.addresses !== null) {
        result += '\nAddresses:\n  ';
        result += contact.addresses.join('\n  ');
    }
    if (contact.emails !== null) {
        result += '\nEmails:\n  ';
        result += contact.emails.join('\n  ');
    }
    if (contact.urls !== null) {
        result += '\nUrls:\n  ';
        result += contact.urls.join('\n  ');
    }
    if (contact.socialNetwork !== null) {
        result += '\nSocial networks:';
        if (contact.socialNetwork.discordAccounts !== null) {
            result += '\n  Discord:';
            result += contact.socialNetwork.discordAccounts.map(discord => {
                let discordString = '';
                if (discord.alias !== null) {
                    discordString += `\n    Alias: ${discord.alias}`;
                }
                if (discord.discriminator !== null) {
                    discordString += `\n    Discriminator: ${discord.discriminator}`;
                }
                if (discord.globalName !== null) {
                    discordString += `\n    Global name: ${discord.globalName}`;
                }
                if (discord.legacyUserName !== null) {
                    discordString += `\n    Legacy user name: ${discord.legacyUserName}`;
                }
                if (discord.userName !== null) {
                    discordString += `\n    User name: ${discord.userName}`;
                }
                return discordString;
            }).join('\n');  // To differentiate between each account
        }
        if (contact.socialNetwork.facebookAccounts !== null) {
            result += '\n  Facebook:\n    ';
            result += contact.socialNetwork.facebookAccounts.join('\n    ');
        }
        if (contact.socialNetwork.githubAccounts !== null) {
            result += '\n  GitHub:\n    ';
            result += contact.socialNetwork.githubAccounts.join('\n    ');
        }
        if (contact.socialNetwork.instagramAccounts !== null) {
            result += '\n  Instagram:\n    ';
            result += contact.socialNetwork.instagramAccounts.join('\n    ');
        }
        if (contact.socialNetwork.linkedinAccounts !== null) {
            result += '\n  LinkedIn:\n    ';
            result += contact.socialNetwork.linkedinAccounts.join('\n    ');
        }
        if (contact.socialNetwork.telegramAccounts !== null) {
            result += '\n  Telegram:\n    ';
            result += contact.socialNetwork.telegramAccounts.join('\n    ');
        }
        if (contact.socialNetwork.tiktokAccounts !== null) {
            result += '\n  TikTok:\n    ';
            result += contact.socialNetwork.tiktokAccounts.join();
        }
        if (contact.socialNetwork.twitterAccounts !== null) {
            result += '\n  Twitter:\n    ';
            result += contact.socialNetwork.twitterAccounts.join();
        }
        if (contact.socialNetwork.wallapopAccounts !== null) {
            result += '\n  Wallapop:';
            result += contact.socialNetwork.wallapopAccounts.map(wallapop => {
                let wallapopString = `\n    Url: ${wallapop.url}`;
                if (wallapop.note !== null) {
                    wallapopString += `\n    Note: ${wallapop.note}`;
                }
                return wallapopString;
            }).join('\n');  // To differentiate between each account
        }
    }
    result += `\nID: ${contact.id}`;
    return result;
}

const getContactSummary = (contact) => {
    let result = contact.name;
    if (contact.surname !== null) {
        result += ` ${contact.surname}`;
    }
    if (contact.nicknames !== null) {
        result += `. ${contact.nicknames.join(', ')}`;
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
