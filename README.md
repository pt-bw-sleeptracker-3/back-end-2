# Back-End-2
## How-To Base URL: https://sleep-tracker-3.herokuapp.com/
---
## Endpoint Summary Table
---
|Type     |Endpoint           |Description        |Auth|
|:-------:|:-----------------------:|:-----------------------:|:--:|
|POST     |/api/auth/register       |Register User            |No  |
|POST     |/api/auth/login          |Login User               |No  |
|GET      |/api/sleep-data          |get all Sleep Data       |Yes |
|GET      |/api/sleep-data/:id      |get Sleep Data by id     |Yes |
|GET      |/api/sleep-data/user/:id |get Sleep Data by user id|Yes |
|POST     |/api/sleep-data          |add new Sleep Data       |Yes |
|PUT      |/api/sleep-data/:id      |edit existing Sleep Data |Yes |
|DELETE   |/api/sleep-data/:id      |remove Sleep Data        |Yes |

## Token must be in the header under Authorization for Auth endpoints
---
## POST Register
### Endpoint /api/auth/register
```
    {
        "username": "string",       required unique
        "password": "string",       required
        "name": "string",           required
        "email": "string"           required unique
    }
```
#### Returns
```
    {
        "id": "user id",
        "message": "success!!",
        "username": "registered user name",
        "name": "user's name",
        "email": "users email address",
    }
```
---
## POST Login
### Endpoint /api/auth/login
```
    {
        "username": "user's registered user name",     required
        "password": "user's password"                  required
    }
```
#### Returns
```
    {
        "id": "user id",
        "username": "registered user name",
        "name": "user's name",
        "email": "users email address",
        "token": "authentication token"
    }
```
---
## GET all Sleep Data
### Endpoint /api/sleep-data
#### Returns Array of all the Sleep Data
```
    [
        {
            "id": integer,                                     
            "date": "string",               
            "sleepStart": integer,                   
            "sleepEnd": integer,
            "moodMorn": integer,
            "moodMid": integer,
            "moodNight": integer,
            "user_id": integer
        }
    ]
```
---
## GET Sleep Data by Id
### Endpoint /api/sleep-data/:id
#### Returns Sleep Data object with given id
```
    {
        "id": integer,                                     
        "date": "string",               
        "sleepStart": integer,                   
        "sleepEnd": integer,
        "moodMorn": integer,
        "moodMid": integer,
        "moodNight": integer,
        "user_id": integer
    }  
```
---
## GET all user's Sleep Data by user id
### Endpoint /api/sleep-data/user/:id
#### Returns an array of all user's Sleep Data
```
    [
        {
            "id": integer,                                     
            "date": "string",               
            "sleepStart": integer,                   
            "sleepEnd": integer,
            "moodMorn": integer,
            "moodMid": integer,
            "moodNight": integer,
            "user_id": integer
        }
    ]
```
---
## POST add new Sleep Data 
### Endpoint /api/sleep-data
```
    {
        "user_id": integer,             required                        
        "date": "string",               required
        "sleepStart": integer,          required          
        "sleepEnd": integer,
        "moodMorn": integer,
        "moodMid": integer,
        "moodNight": integer            
    }
```
#### Returns newly created Sleep Data
```
    {   "message" : "success,
        "data" : [
            "id": integer,                                     
            "date": "string",               
            "sleepStart": integer,                   
            "sleepEnd": integer,
            "moodMorn": integer,
            "moodMid": integer,
            "moodNight": integer,
            "user_id": integer
        ]
    }
```
---
## PUT Edit existing Sleep Data by id
### Endpoint /api/sleep-data/:id
```
    {
        "date": "string",           edit any of these fields       
        "sleepStart": integer,                   
        "sleepEnd": integer,
        "moodMorn": integer,
        "moodMid": integer,
        "moodNight": integer,
        "user_id": integer
```
#### Returns Edited Sleep Data object
```
    {
        "message": "update success",
        "data": {
            "id": integer,                                     
            "date": "string",               
            "sleepStart": integer,                   
            "sleepEnd": integer,
            "moodMorn": integer,
            "moodMid": integer,
            "moodNight": integer,
            "user_id": integer
        }
    }
```
---
## DELETE Delete Sleep Data with given id
### Endpoint /api/sleep-data/:id
#### Returns success response
```
    {
        "message": "deleted successfully",
        "recordsRemoved": 1
    }
```
---