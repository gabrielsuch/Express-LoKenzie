#

# **Users**

# ***Criação de um usuário***


### `POST /users/register - Chaves Corretas - Formato da Requisição:`

```json
{
	"email": "jose@mail.com",
	"password": "123456",
	"name": "jose"
}
```

### `Status 201 - Created:`

```json
{
	"email": "jose@mail.com",
	"name": "jose",
	"id": "ed261d3e-957c-42b3-94d8-6167f30c6b87",
	"createdAt": "2022-06-20T14:52:23.462Z",
	"updatedAt": "2022-06-20T14:52:23.462Z",
	"isAdm": false
}
```

### `Status 409 - Conflict:` 

```json 
{
    "error": "Email already exists"
}
```

#

### `POST /users/register - Chaves Incorretas - Formato da Requisição:`

```json
{
	"email": "jose@mail.com",
	"password": "123456"
}
```

### `Status 400 - Bad Request:`

```json
{
	"error": [
		"name is a required field"
	]
}
```

#

# ***Realizando Login***


### `POST /users/login - Chaves Corretas - Formato da Requisição:`

```json
{
	"email": "jose@mail.com",
	"password": "123456"
}
```

### `Status 200 - OK:`

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impvc2VAbWFpbC5jb20iLCJpYXQiOjE2NTU3Mzc3NTMsImV4cCI6MTY1NTgyNDE1M30.LqycZhSJJrkt_vL0zu_U1NFdelm4ShIi-YWk8rCaBFs"
}
```

#

### `POST /users/login - Dados Incorretos - Formato da Requisição:`

```json
{
	"email": "jos@mail.com",
	"password": "123456"
}
```

### `Status 400 - Bad Request:`

```json
{
	"error": "Email or Password doesn't matches"
}
```

### `Status 404 - Not Found:`

```json
{
	"error": "Email doesn't exists"
}
```

#

### `POST /users/login - Chave Incorreta - Formato da Requisição:`

```json
{
	"email": "jose@mail.com"
}
```

### `Status 400 - Bad Request:`

```json
{
	"error": [
		"password is a required field"
	]
}
```

#

# ***Obtendo dados de usuários***


### `GET /users - Sem Autenticação Bearer Token`

<br>

### `Status 400 - Bad Request:`

```json
{
	"error": "Invalid signature"
}
```

### `Status 403 - Forbidden:`

```json
{
	"error": "Missing Authorization Token"
}
```

#

### `GET /users - Com Autenticação Bearer Token - Formato da Requisição:`

<br>

### `Status 200 - OK:`

```json
[
	{
		"id": "45d5f40a-3c8d-4e41-bdb1-8c20ababc616",
		"name": "kenzie",
		"email": "kenzie@mail.com",
		"createdAt": "2022-06-15T13:08:58.537Z",
		"updatedAt": "2022-06-15T13:08:58.537Z",
		"isAdm": true
	},
	{
		"id": "ed261d3e-957c-42b3-94d8-6167f30c6b87",
		"name": "jose",
		"email": "jose@mail.com",
		"createdAt": "2022-06-20T14:52:23.462Z",
		"updatedAt": "2022-06-20T14:52:23.462Z",
		"isAdm": false
	}
]
```

### `Status 401 - Unauthorized: `

```json
{
	"error": "Missing Admin Permission"
}
```

#

# ***Atualizando um usuário***

### Usuário Admin pode atualizar qualquer usuário.
### Usuário Não Admin só pode atualizar a si mesmo.

#

### `PATCH /users/:id - Sem Autenticação Bearer Token`

<br>

### `Status 400 - Bad Request:`

```json
{
	"error": "Invalid signature"
}
```

### `Status 403 - Forbidden:`

```json
{
	"error": "Missing Authorization Token"
}
```

#

### `PATCH /users/:id - Com Autenticação Bearer Token - Formato da Requisição:`

```json
{
    "name": "Osvaldo",
    "email": "osvaldo@mail.com"
}
```

### `Status 200 - OK:`

```json
{
	"id": "9db0d62c-b49b-42fe-9cd1-851b8c720fcd",
	"name": "Osvaldo",
	"email": "osvaldo@mail.com",
	"createdAt": "2022-06-20T15:02:54.749Z",
	"updatedAt": "2022-06-20T15:34:17.060Z",
	"isAdm": false
}
```

### `Status 401 - Unauthorized:`

```json
{
	"error": "Cannot update other user"
}
```

### `Status 404 - Not Found:`

```json
{
	"error": "User not found"
}
```

#

# ***Deletando um usuário***

### Usuário Admin pode deletar qualquer usuário.
### Usuário Não Admin só pode deletar a si mesmo.

#

### `DELETE /users/:id - Sem Autenticação Bearer Token`

<br>

### `Status 400 - Bad Request:`

```json
{
	"error": "Invalid signature"
}
```

### `Status 403 - Forbidden:`

```json
{
	"error": "Missing Authorization Token"
}
```

#

### `DELETE /users/:id - Com Autenticação Bearer Token - Formato da Requisição:`

<br>

### `Status 200 - OK:`

```json
{
	"message": "User Deleted"
}
```

### `Status 401 - Unauthorized:`

```json
{
	"error": "Cannot delete other user"
}
```

### `Status 404 - Not Found:`

```json
{
	"error": "User not found"
}
```

#

# **Stores**

# ***Criação de uma Store***

### `POST /stores/register - Sem Autenticação Bearer Token`

<br>

### `Status 400 - Bad Request:`

```json
{
	"error": "Invalid signature"
}
```

### `Status 403 - Forbidden:`

```json
{
	"error": "Missing Authorization Token"
}
```

#

### `POST /stores/register - Com Autenticação Bearer Token - Formato da Requisição:`

```json
{
	"address": "Rua Fulano",
	"quantity": 55
}
```

### `Status 201 - Created:`

```json
{
	"address": "Rua Fulano",
	"quantity": 55,
	"id": "a20fb0e5-3f6f-4472-997c-6fe600e0b534"
}
```

### `Status 401 - Unauthorized:`

```json
{
	"error": "Missing Admin Permission"
}
```

### `Status 409 - Conflict:`

```json
{
	"error": "Store already exists"
}
```

#

### `POST /stores/register - Chave Incorreta - Formato da Requisição:`

```json
{
	"address": "Rua Tal"
}
```

### `Status 400 - Bad Request:`

```json
{
	"error": [
		"quantity is a required field"
	]
}
```

#

# ***Obtendo todas as Stores***

### `GET /stores - Não necessita de Autenticação - Formato da Requisição:`

<br>

### `Status 200 - OK:`

```json
[
	{
		"id": "a20fb0e5-3f6f-4472-997c-6fe600e0b534",
		"address": "Rua Fulano",
		"quantity": 55
	},
	{
		"id": "2da99070-22af-4980-a002-d01c20ba5a3c",
		"address": "Rua Tal",
		"quantity": 20
	}
]
```

#

# ***Atualizando uma Store***

### `PATCH /stores/:id - Sem Autenticação Bearer Token`

<br>

### `Status 400 - Bad Request:`

```json
{
	"error": "Invalid signature"
}
```

### `Status 403 - Forbidden:`

```json
{
	"error": "Missing Authorization Token"
}
```

#

### `PATCH /stores/:id - Com Autenticação Bearer Token - Formato da Requisição:`

```json
{
	"address": "Rua Fulano Ciclano Beltrano",
	"quantity": 20
}
```

### `Status 200 - OK:`

```json
{
	"id": "2da99070-22af-4980-a002-d01c20ba5a3c",
	"address": "Rua Fulano Ciclano Beltrano",
	"quantity": 20
}
```

### `Status 401 - Unauthorized:`

```json
{
	"error": "Missing Admin Permission"
}
```

### `Status 404 - Not Found:`

```json
{
	"error": "Store not found"
}
```

#

# ***Deletando uma Store***

### `DELETE /stores/:id - Sem Autenticação Bearer Token`

<br>

### `Status 400 - Bad Request:`

```json
{
	"error": "Invalid signature"
}
```

### `Status 403 - Forbidden:`

```json
{
	"error": "Missing Authorization Token"
}
```

#

### `DELETE /stores/:id - Com Autenticação Bearer Token - Formato da Requisição:`

<br>

### `Status 200 - OK:`

```json
{
	"message": "Store Deleted"
}
```

### `Status 404 - Not Found:`

```json
{
	"error": "Store not found"
}
```

#

# **Cars**

# ***Criando um Carro***

### `POST /cars/register - Sem Autenticação Bearer Token`

<br>

### `Status 400 - Bad Request:`

```json
{
	"error": "Invalid signature"
}
```

### `Status 403 - Forbidden:`

```json
{
	"error": "Missing Authorization Token"
}
```

#

### `POST /cars/register - Com Autenticação Bearer Token - Formato da Requisição:`

```json
{
	"plate": "AAA0B11",
	"year": "2020",
	"color": "gray",
	"brand": "Volvo",
	"isAvailable": true
}
```

### `Status 201 - Created:`

```json
{
	"plate": "AAA0B11",
	"year": "2020",
	"color": "gray",
	"brand": "Volvo",
	"isAvailable": true,
	"id": "df9cd676-13ef-4bff-bd9f-6d6962a6188e"
}
```

### `Status 401 - Unauthorized:`

```json
{
	"error": "Missing Admin Permission"
}
```

#

### `POST /cars/register - Chaves Incorretas - Formato da Requisição:`

```json
{
	"year": "2020",
	"color": "gray",
	"brand": "Volvo",
	"isAvailable": true
}
```

### `Status 400 - Bad Request:`

```json
{
	"error": [
		"plate is a required field"
	]
}
```

#

# ***Obtendo dados de Carros***

### `GET /cars - Não necessita de Autenticação - Formato da Requisição:`

<br>

### `Status 200 - OK:`

```json
[
	{
		"id": "25c57a1e-bfb0-440e-bd62-a9dab51effca",
		"year": "2021",
		"color": "white",
		"brand": "Renault",
		"isAvailable": true,
		"reservationHistory": []
	},
	{
		"id": "df9cd676-13ef-4bff-bd9f-6d6962a6188e",
		"year": "2020",
		"color": "gray",
		"brand": "Volvo",
		"isAvailable": true,
		"reservationHistory": []
	},
	{
		"id": "7f545f35-33b5-423b-bd85-941d769014d5",
		"year": "2020",
		"color": "black",
		"brand": "Honda",
		"isAvailable": true,
		"reservationHistory": []
	}
]
```

#

