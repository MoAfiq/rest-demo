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

| URL    | Method | Comments                                                                                                                                |
| ------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `/`    | GET    | Get all entries                                                                                                                         |
| `/`    | POST   | Add an entry to the system <br/> Takes JSON parameter similar to this `{"title":<title>,"description":<description>}`                   |
| `/:id` | GET    | Get `id`                                                                                                                                |
| `/:id` | DELETE | Clear the entry with id `id`                                                                                                            |
| `/:id` | PUT    | Replace the entry with id with the provided body (See `POST /` for the format) `id`                                                     |
| `/:id` | PATCH  | Replace the entry with id with the provided body (See `POST /` for the format) Note: it is ok to omit one of the parameter but not both |
