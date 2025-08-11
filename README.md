# contacts-cli-js

## Configuration

Read this [file](https://github.com/CarlosAMolina/contacts/blob/main/README.md) for an explanation of Docker, Bash, etc.

### Bash

You can create an alias in `~/.bashrc` to search contacts quickly:

```bash
# Contacts
c () {
    pushd ~/Software/contacts-cli-js > /dev/null
    make search-term term="$@"
    popd > /dev/null
}
ci () {
    pushd ~/Software/contacts-cli-js > /dev/null
    make search-id term="$@"
    popd > /dev/null
}
```

Usage example:

```bash
c carlos
ci 1
```
