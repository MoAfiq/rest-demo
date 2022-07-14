# Getting started

```
npm install
node index.js
```

# APIS

## /kv

| URL      | Method | Comments                                                                                              |
| -------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `/`      | GET    | Get all entries                                                                                       |
| `/`      | POST   | Add an entry to the system <br/> Takes JSON parameter similar to this `{"key":<key>,"value":<value>}` |
| `/:name` | GET    | Get value for the entry named `name`                                                                  |
| `/:name` | DELETE | Clear the entry named `name`                                                                          |

## /todos

| URL | Method | Comments |
| --- | ------ | -------- |

**TBD**
