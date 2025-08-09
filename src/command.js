import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { findContacts, getIdContact } from './contacts.js'

yargs(hideBin(process.argv))
    .command(['contacts <filter>', 'c <filter>'], 'get matching contacts', yargs => {
        return yargs.positional('filter', {
            describe: 'The search term to filter contacts by',
            type: 'string'
        })
    }, async (argv) => {
        const matches = await findContacts(argv.filter)
        console.log(matches)
    })
    .command(['id <id>', 'i <id>'], 'get a contact by id', yargs => {
        return yargs.positional('id', {
            describe: 'The id of the contact to return',
            type: 'number'
        })
    }, async (argv) => {
        const contact = await getIdContact(argv.id)
        console.log(contact)
    })
    .demandCommand(1)
    .parse()
