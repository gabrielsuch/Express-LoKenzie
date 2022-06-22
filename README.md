## Link do Deploy: https://lokenzie-api.herokuapp.com

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
		"isAdm": true,
		"reservationHistory": []
	},
	{
		"id": "ed261d3e-957c-42b3-94d8-6167f30c6b87",
		"name": "jose",
		"email": "jose@mail.com",
		"createdAt": "2022-06-20T14:52:23.462Z",
		"updatedAt": "2022-06-20T14:52:23.462Z",
		"isAdm": false,
		"reservationHistory": []
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
### Usuário Admin pode atualizar as seguintes chaves: [name, email, password, isAdm]
### Usuário Não Admin só pode atualizar as seguintes chaves: [name, email, password]

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
		"quantity": 55,
		"employees": []
	},
	{
		"id": "2da99070-22af-4980-a002-d01c20ba5a3c",
		"address": "Rua Tal",
		"quantity": 20,
		"employees": []
	}
]
```

#

# ***Atualizando uma Store***

### Usuário pode atualizar as seguintes chaves: [address, quantity]

#

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
	"quantity": 20,
	"employees": []
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

# ***Relacionamento entre Store e User***

### `POST /stores/worker/:store_id - Sem Autenticação Bearer Token`

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

### `POST /stores/worker/:store_id - Com Autenticação Bearer Token - Formato da Requisição:`

```json
{
	"email": "jose@mail.com"
}
```

### `Status 200 - OK:`

```json
{
	"id": "ddf332df-81b4-4ec1-9b24-1ff31d6449d2",
	"address": "Rua Fulano Ciclano Beltrano",
	"quantity": 20,
	"employees": [
		{
			"id": "ed261d3e-957c-42b3-94d8-6167f30c6b87",
			"name": "jose",
			"email": "jose@mail.com",
			"createdAt": "2022-06-20T14:52:23.462Z",
			"updatedAt": "2022-06-20T14:52:23.462Z",
			"isAdm": false,
			"password": "$2b$10$9DJ1ALTqEgdaFQC6cfZR4eWW3/WepSUJ1aatseJQG5jQV3Dxz/s6q",
			"reservationHistory": [
				{
					"id": "fa81c5c1-c728-427e-9752-18143e34e77e",
					"days": 5,
					"startDate": "2022-07-10",
					"endDate": "2022-07-15"
				}
			]
		}
	]
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
	"error": "User not found"
}
"or"
{
	"error": "Store not found"
}
```

#

### `POST /stores/remove/:store_id - Sem Autenticação Bearer Token`

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

### `POST /stores/remove/:store_id - Com Autenticação Bearer Token - Formato da Requisição:`

```json
{
	"email": "jose@mail.com"
}
```

### `Status 200 - OK:`

```json
{
	"id": "ddf332df-81b4-4ec1-9b24-1ff31d6449d2",
	"address": "Rua Fulano Ciclano Beltrano",
	"quantity": 20,
	"employees": []
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
	"error": "User not found"
}
"or"
{
	"error": "Store not found"
}
```

#

# **Cars**

# ***Criação de um Carro***

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
	"year": 2020,
	"color": "gray",
	"brand": "Volvo",
	"isAvailable": true,
	"group": "2d2451cd-4e86-4cf4-a9e5-bdbdc0bb781b",
	"stockedAt": "308b8d4d-024b-442f-8365-d980fd11594d"
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
	"group": {
		"id": "2d2451cd-4e86-4cf4-a9e5-bdbdc0bb781b",
		"description": "Descrição",
		"quantity": 3,
		"price": 2000,
		"cars": []
	},
	"stockedAt": {
		"id": "308b8d4d-024b-442f-8365-d980fd11594d",
		"address": "Rua Tal",
		"quantity": 90,
		"employees": []
	},
	"id": "57e3c500-6e1a-4e6e-916d-e95d500970b2"
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
	"error": "Car already exists"
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

# ***Obtendo dados de um único Carro***

### `GET /cars/:id - Não necessita de Autenticação - Formato da Requisição:`

<br>

### `Status 200 - OK:`

```json
{
	"id": "df9cd676-13ef-4bff-bd9f-6d6962a6188e",
	"plate": "AAA0B11",
	"year": "2020",
	"color": "gray",
	"brand": "Volvo",
	"isAvailable": true,
	"reservationHistory": []
}
```



### `Status 404 - Not Found`:

```json
{
	"error": "Car not found"
}
```

#

# ***Atualizando um Carro***

### Usuário pode atualizar as seguintes chaves: [plate, year, color, brand, isAvailable]

# 

### `PATCH /cars/:id - Sem Autenticação Bearer Token - Formato da Requisição:`

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

### `PATCH /cars/:id - Com Autenticação Bearer Token - Formato da Requisição:`

```json
{
	"color": "red",
	"brand": "Chevrolet"
}
```

### `Status 200 - OK:`

```json
{
	"id": "df9cd676-13ef-4bff-bd9f-6d6962a6188e",
	"plate": "AAA0B11",
	"year": "2020",
	"color": "red",
	"brand": "Chevrolet",
	"isAvailable": true,
	"reservationHistory": []
}
```

### `Status 401 - Unauthorized:`

```json
{
	"error": "Missing Admin Permission"
}
```

### `Status 404 - Not Found`

```json
{
	"error": "Car not found"
}
```

#

# ***Deletando um Carro***

### `DELETE /cars/:id - Sem Autenticação Bearer Token - Formato da Requisição:`

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

### `DELETE /cars/:id - Com Autenticação Bearer Token - Formato da Requisição:`

<br>

### `Status 200 - OK:`

```json
{
	"message": "Car Deleted"
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
	"error": "Car not found"
}
```

#

# **Groups**

# ***Criação de um Grupo***

### `POST /cars/groups/register - Sem Autenticação Bearer Token - Formato da Requisição:`

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

### `POST /cars/groups/register - Com Autenticação Bearer Token - Formato da Requisição:`

<br>

```json
{
	"description": "Descrição",
	"price": 1100.00
}
```

### `Status 201 - Created:`

```json
{
	"description": "Descrição",
	"price": 1100,
	"quantity": 0,
	"id": "d863a44a-dbc6-437c-96f0-0bcf0436bdbe",
	"cars": []
}
```

### `Status 401 - Unauthorized:`

```json
{
	"error": "Missing Admin Permission"
}
```

#

### `POST /cars/groups/register - Chaves Incorretas - Formato da Requisição:`

```json
{
	"description": "Descrição"
}
```

### `Status 400 - Bad Request:`

```json
{
	"error": [
		"price is a required field"
	]
}
```

#

### `POST /cars/groups/add/:group_id - Sem Autenticação Bearer Token - Formato da Requisição:`

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

### `POST /cars/groups/add/:group_id - Com Autenticação Bearer Token - Formato da Requisição:`

```json
{
	"cars": [
		"25c57a1e-bfb0-440e-bd62-a9dab51effca", "7f545f35-33b5-423b-bd85-941d769014d5"
	]
}
```

### `Status 200 - OK:`

```json
{
	"message": "Car(s) added"
}
```

### `Status 404 - Not Found:`

```json
{
	"message": "Car 'UUID' not found"
}
```


#

# ***Obtendo dados de Grupos***

### `GET /cars/groups - Não necessita de Autenticação - Formato da Requisição:`

<br>

### `Status 200 - OK:`

```json
[
	{
		"id": "d863a44a-dbc6-437c-96f0-0bcf0436bdbe",
		"description": "Descrição",
		"quantity": 0,
		"price": 1100,
		"cars": []
	}
]
```

#

# ***Obtendo dados de um único Grupo***

### `GET /cars/groups/:id - Não necessita de Autenticação - Formato da Requisição:`

<br>

### `Status 200 - OK:`

```json
{
	"id": "d863a44a-dbc6-437c-96f0-0bcf0436bdbe",
	"description": "Descrição",
	"quantity": 0,
	"price": 1100
}
```

### `Status 400 - Not Found:`

```json
{
	"error": "Group Not Found"
}
```

#

# ***Atualização de um Grupo***

### Usuário Admin pode atualizar as seguintes chaves: [description, price]

#

### `PATCH /cars/groups/:id - Sem Autenticação Bearer Token - Formato da Requisição:`

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

### `PATCH /cars/groups/:id - Com Autenticação Bearer Token - Formato da Requisição:`

```json
{
	"price": 4592
}
```

### `Status 200 - OK:`

```json
{
	"id": "a6f724b5-b66e-48ec-837e-3a28f9fa94e7",
	"description": "Descrição",
	"quantity": 0,
	"price": 4592,
	"cars": []
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
	"error": "Group not found"
}
```

#

# ***Deletando um Grupo***

### `DELETE /cars/groups/:id - Sem Autenticação Bearer Token - Formato da Requisição:`

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

### `DELETE /cars/groups/:id - Com Autenticação Bearer Token - Formato da Requisição:`

<br>

### `Status 200 - OK:`

```json
{
	"message": "Deleted"
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
	"error": "Group not found"
}
```

#

# **Reservation**

# ***Realizando uma Reserva de Carro***

### `POST /reservation/:id - Sem Autenticação Bearer Token - Formato da Requisição:`

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

### `POST /reservation/:id - Com Autenticação Bearer Token - Formato da Requisição:`

```json
{
	"startDate": "2022-05-28",
	"endDate": "2022-05-30"
}
```

### `Status 201 - Created:`

```json
{
	"message": "Reservation made"
}
```

### `Status 404 - Not Found:`

```json
{
	"error": "Car not found"
}
```

### `Status 409 - Conflict:`

```json
{
	"error": "Car not avaliable"
}
"or"
{
	"error": "Lease dates are in the past. Check the start date."
}
"or"
{
	"error": "Lease dates are in the past. Check the end date."
}
```

# 

### `POST /reservation/:id - Chaves Incorretas - Formato da Requisição:`

```json
{
	"endDate": "2022/05/30"
}
```

### `Status 400 - Bad Request:`

```json
{
	"error": [
		"startDate is a required field"
	]
}
```

#
