## <a name="resource-session"></a>Session

A session is required to access to read-and-write API endpoints

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **id** | *string* | JSON web token for the session | `"eyJCJhbGci.eyJhaWwuY29tIn0.32wQOMci"` |
| **relationships:user:data:id** | *string* | ID of user | `"312"` |
| **[relationships:user:data:type](#resource-user)** | *string* | JSON API type field<br/> **pattern:** <code>^user$</code> | `"user"` |
| **[type](#resource-user)** | *string* | JSON API type field<br/> **pattern:** <code>^session$</code> | `"session"` |

### Session Create

Create a new session

```
POST /sessions
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data** | *string* |  |  |



#### Curl Example

```bash
$ curl -n -X POST https://site-api.datocms.com/sessions \
  -d '{
  "data": {
    "type": "email_credentials",
    "attributes": {
      "email": "foo@bar.com",
      "password": "changeme"
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "data": {
    "type": "session",
    "id": "eyJCJhbGci.eyJhaWwuY29tIn0.32wQOMci",
    "relationships": {
      "user": {
        "data": {
          "type": "user",
          "id": "312"
        }
      }
    }
  },
  "included": [
    {
      "type": "user",
      "id": "312",
      "attributes": {
        "email": "foo@bar.com",
        "first_name": "Mark",
        "last_name": "Smith",
        "state": "INVITATION_PENDING",
        "password": "example"
      }
    }
  ]
}
```


## <a name="resource-account"></a>Account

Dato account

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **attributes:api_token** | *string* | API token | `"example"` |
| **attributes:email** | *string* | Email | `"foo@bar.com"` |
| **attributes:password** | *string* | Password | `"example"` |
| **attributes:valid_card** | *boolean* | Whether the user has a valid card | `true` |
| **id** | *string* | ID of account | `"312"` |
| **type** | *string* | JSON API type field<br/> **pattern:** <code>^account$</code> | `"account"` |


## <a name="resource-user"></a>User

Dato user

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **attributes:email** | *string* | Email | `"foo@bar.com"` |
| **attributes:first_name** | *string* | First name | `"Mark"` |
| **attributes:last_name** | *string* | Last name | `"Smith"` |
| **attributes:password** | *string* | Password | `"example"` |
| **attributes:state** | *string* | Status of user registration<br/> **one of:**`"INVITATION_PENDING"` or `"REGISTERED"` | `"INVITATION_PENDING"` |
| **id** | *string* | ID of user | `"312"` |
| **type** | *string* | JSON API type field<br/> **pattern:** <code>^user$</code> | `"user"` |

### User Create

Invite a new user

```
POST /users
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes:email** | *string* | Email | `"foo@bar.com"` |
| **data:attributes:first_name** | *string* | First name | `"Mark"` |
| **data:attributes:last_name** | *string* | Last name | `"Smith"` |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^user$</code> | `"user"` |



#### Curl Example

```bash
$ curl -n -X POST https://site-api.datocms.com/users \
  -d '{
  "data": {
    "type": "user",
    "attributes": {
      "email": "foo@bar.com",
      "first_name": "Mark",
      "last_name": "Smith"
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "data": {
    "type": "user",
    "id": "312",
    "attributes": {
      "email": "foo@bar.com",
      "first_name": "Mark",
      "last_name": "Smith",
      "state": "INVITATION_PENDING",
      "password": "example"
    }
  }
}
```

### User Update

Updates a user

```
PUT /users/{user_id}
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes:email** | *string* | Email | `"foo@bar.com"` |
| **data:attributes:first_name** | *string* | First name | `"Mark"` |
| **data:attributes:last_name** | *string* | Last name | `"Smith"` |
| **data:attributes:password** | *string* | Password | `"example"` |
| **data:id** | *string* | ID of user | `"312"` |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^user$</code> | `"user"` |



#### Curl Example

```bash
$ curl -n -X PUT https://site-api.datocms.com/users/$USER_ID \
  -d '{
  "data": {
    "type": "user",
    "id": "312",
    "attributes": {
      "email": "foo@bar.com",
      "first_name": "Mark",
      "last_name": "Smith",
      "password": "example"
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "user",
    "id": "312",
    "attributes": {
      "email": "foo@bar.com",
      "first_name": "Mark",
      "last_name": "Smith",
      "state": "INVITATION_PENDING",
      "password": "example"
    }
  }
}
```

### User Index

Lists users

```
GET /users
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/users
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": [
    {
      "type": "user",
      "id": "312",
      "attributes": {
        "email": "foo@bar.com",
        "first_name": "Mark",
        "last_name": "Smith",
        "state": "INVITATION_PENDING",
        "password": "example"
      }
    }
  ]
}
```

### User Show

Show user

```
GET /users/{user_id}
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/users/$USER_ID
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "user",
    "id": "312",
    "attributes": {
      "email": "foo@bar.com",
      "first_name": "Mark",
      "last_name": "Smith",
      "state": "INVITATION_PENDING",
      "password": "example"
    }
  }
}
```

### User Reset password

Request a password reset

```
POST /users/reset_password
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes:email** | *string* | Email | `"foo@bar.com"` |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^user$</code> | `"user"` |



#### Curl Example

```bash
$ curl -n -X POST https://site-api.datocms.com/users/reset_password \
  -d '{
  "data": {
    "type": "user",
    "attributes": {
      "email": "foo@bar.com"
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "type": "user",
  "id": "312",
  "attributes": {
    "email": "foo@bar.com",
    "first_name": "Mark",
    "last_name": "Smith",
    "state": "INVITATION_PENDING",
    "password": "example"
  }
}
```

### User Delete

Deletes a user

```
DELETE /users/{user_id}
```


#### Curl Example

```bash
$ curl -n -X DELETE https://site-api.datocms.com/users/$USER_ID \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "user",
    "id": "312",
    "attributes": {
      "email": "foo@bar.com",
      "first_name": "Mark",
      "last_name": "Smith",
      "state": "INVITATION_PENDING",
      "password": "example"
    }
  }
}
```


## <a name="resource-site"></a>Site

A site represents a specific Dato backend instance

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **attributes:deploy_adapter** | *nullable string* | Specify the deploy adapter to use | `"gitlab"` |
| **attributes:deploy_settings** | *nullable object* | Specify the deploy adapter options | `null` |
| **attributes:deploy_status** | *string* | Specifies deploy status<br/> **one of:**`"unstarted"` or `"pending"` or `"success"` or `"fail"` | `"unstarted"` |
| **attributes:deployable** | *boolean* | Specifies whether all the deploy informations are correctly setup or not | `true` |
| **attributes:domain** | *nullable string* | Site domain | `"admin.foobar.com"` |
| **attributes:favicon** | *nullable object* |  | `null` |
| **attributes:favicon:format** | *string* | Image format<br/> **one of:**`"png"` or `"jpg"` or `"gif"` | `"png"` |
| **attributes:favicon:height** | *integer* | Image height | `500` |
| **attributes:favicon:path** | *string* | The S3 path where the file will be stored | `"/7/1455102967-image.png"` |
| **attributes:favicon:size** | *integer* | The size of the image in bytes | `424112` |
| **attributes:favicon:width** | *integer* | Image width | `400` |
| **attributes:frontend_url** | *nullable string* | Specifies the URL of the generated static website | `null` |
| **attributes:global_seo** | *nullable object* | Specifies default global settings | `null` |
| **attributes:global_seo:facebook_page_url** | *nullable string* | URL of facebook page | `"http://facebook.com/awesomewebsite"` |
| **attributes:global_seo:fallback_seo:description** | *string* |  | `"Default meta description"` |
| **attributes:global_seo:fallback_seo:image** | *nullable object* |  | `null` |
| **attributes:global_seo:fallback_seo:image:format** | *string* | Image format<br/> **one of:**`"png"` or `"jpg"` or `"gif"` | `"png"` |
| **attributes:global_seo:fallback_seo:image:height** | *integer* | Image height | `500` |
| **attributes:global_seo:fallback_seo:image:path** | *string* | The S3 path where the file will be stored | `"/7/1455102967-image.png"` |
| **attributes:global_seo:fallback_seo:image:size** | *integer* | The size of the image in bytes | `424112` |
| **attributes:global_seo:fallback_seo:image:width** | *integer* | Image width | `400` |
| **attributes:global_seo:fallback_seo:title** | *string* |  | `"Default meta title"` |
| **attributes:global_seo:site_name** | *string* | Site name, used in social sharing | `"My awesome website"` |
| **attributes:global_seo:title_suffix** | *nullable string* | Title meta tag suffix | `" - My awesome website"` |
| **attributes:global_seo:twitter_account** | *nullable string* | Twitter account associated to website | `"@awesomewebsite"` |
| **attributes:internal_domain** | *nullable string* | DatoCMS internal domain | `"summer-star-15.admin.datocms.com"` |
| **attributes:items_count** | *integer* | Number of items present in the site | `42` |
| **attributes:last_data_change_at** | *nullable date-time* | Specifies the last time when a change of data occurred | `null` |
| **attributes:last_deploy_at** | *nullable date-time* | Specifies the last time when a deploy occurred | `null` |
| **attributes:last_dump_at** | *nullable date-time* | Specifies the last time an integration plugin called the API | `null` |
| **attributes:locales** | *array* | Site available locales | `["it"]` |
| **attributes:name** | *string* | Site name | `"My blog"` |
| **attributes:no_index** | *boolean* | Whether the website needs to be indexed by search engines or not | `true` |
| **attributes:readonly_token** | *string* | Specify the readonly API token for this Site | `"example"` |
| **attributes:readwrite_token** | *string* | Specify the read-write API token for this Site | `"example"` |
| **attributes:ssg** | *nullable string* | Specifies static site generator used | `null` |
| **attributes:theme_hue** | *integer* | Specifies the Hue to use primary color in Site backend | `42` |
| **attributes:timezone** | *string* | Site default timezone | `"Rome"` |
| **attributes:webhook_url** | *string* | Webhook URL | `"http://api.datocms.com/sites/summer-star-15/deploy-results"` |
| **id** | *string* | ID of site | `"155"` |
| **relationships:account:data:id** | *string* | ID of account | `"312"` |
| **[relationships:account:data:type](#resource-account)** | *string* | JSON API type field<br/> **pattern:** <code>^account$</code> | `"account"` |
| **[relationships:item_types:data](#resource-account)** | *array* | The list of site item types | `[{"type":"item_type","id":"post"}]` |
| **relationships:menu_items:data** | *array* | The list of site menu items | `[{"type":"menu_item","id":"34"}]` |
| **relationships:users:data** | *array* | The list of site users | `[{"type":"user","id":"312"}]` |
| **type** | *string* | JSON API type field<br/> **pattern:** <code>^site$</code> | `"site"` |

### Site Create

Retrieve a site

```
GET /site
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/site
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "site",
    "id": "155",
    "attributes": {
      "name": "My blog",
      "domain": "admin.foobar.com",
      "webhook_url": "http://api.datocms.com/sites/summer-star-15/deploy-results",
      "internal_domain": "summer-star-15.admin.datocms.com",
      "locales": [
        "it"
      ],
      "timezone": "Rome",
      "items_count": 42,
      "no_index": true,
      "favicon": {
        "path": "/7/1455102967-image.png",
        "width": 400,
        "height": 500,
        "format": "png",
        "size": 424112
      },
      "theme_hue": 42,
      "deploy_adapter": "gitlab",
      "deploy_settings": null,
      "readonly_token": "example",
      "readwrite_token": "example",
      "last_data_change_at": "2015-01-01T12:00:00Z",
      "last_deploy_at": "2015-01-01T12:00:00Z",
      "last_dump_at": "2015-01-01T12:00:00Z",
      "deployable": true,
      "deploy_status": "unstarted",
      "ssg": null,
      "frontend_url": null,
      "global_seo": {
        "site_name": "My awesome website",
        "fallback_seo": {
          "title": "Default meta title",
          "description": "Default meta description",
          "image": {
            "path": "/7/1455102967-image.png",
            "width": 400,
            "height": 500,
            "format": "png",
            "size": 424112
          }
        },
        "title_suffix": " - My awesome website",
        "facebook_page_url": "http://facebook.com/awesomewebsite",
        "twitter_account": "@awesomewebsite"
      }
    },
    "relationships": {
      "account": {
        "data": {
          "type": "account",
          "id": "312"
        }
      },
      "menu_items": {
        "data": [
          {
            "type": "menu_item",
            "id": "34"
          }
        ]
      },
      "users": {
        "data": [
          {
            "type": "user",
            "id": "312"
          }
        ]
      },
      "item_types": {
        "data": [
          {
            "type": "item_type",
            "id": "post"
          }
        ]
      }
    }
  },
  "included": [
    null
  ]
}
```

### Site Update

Updates a site settings

```
PUT /site
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes:deploy_adapter** | *nullable string* | Specify the deploy adapter to use | `"gitlab"` |
| **data:attributes:deploy_settings** | *nullable object* | Specify the deploy adapter options | `null` |
| **data:attributes:favicon** | *nullable object* |  | `null` |
| **data:attributes:favicon:format** | *string* | Image format<br/> **one of:**`"png"` or `"jpg"` or `"gif"` | `"png"` |
| **data:attributes:favicon:height** | *integer* | Image height | `500` |
| **data:attributes:favicon:path** | *string* | The S3 path where the file will be stored | `"/7/1455102967-image.png"` |
| **data:attributes:favicon:size** | *integer* | The size of the image in bytes | `424112` |
| **data:attributes:favicon:width** | *integer* | Image width | `400` |
| **data:attributes:frontend_url** | *nullable string* | Specifies the URL of the generated static website | `null` |
| **data:attributes:global_seo** | *nullable object* | Specifies default global settings | `null` |
| **data:attributes:global_seo:facebook_page_url** | *nullable string* | URL of facebook page | `"http://facebook.com/awesomewebsite"` |
| **data:attributes:global_seo:fallback_seo:description** | *string* |  | `"Default meta description"` |
| **data:attributes:global_seo:fallback_seo:image** | *nullable object* |  | `null` |
| **data:attributes:global_seo:fallback_seo:image:format** | *string* | Image format<br/> **one of:**`"png"` or `"jpg"` or `"gif"` | `"png"` |
| **data:attributes:global_seo:fallback_seo:image:height** | *integer* | Image height | `500` |
| **data:attributes:global_seo:fallback_seo:image:path** | *string* | The S3 path where the file will be stored | `"/7/1455102967-image.png"` |
| **data:attributes:global_seo:fallback_seo:image:size** | *integer* | The size of the image in bytes | `424112` |
| **data:attributes:global_seo:fallback_seo:image:width** | *integer* | Image width | `400` |
| **data:attributes:global_seo:fallback_seo:title** | *string* |  | `"Default meta title"` |
| **data:attributes:global_seo:site_name** | *string* | Site name, used in social sharing | `"My awesome website"` |
| **data:attributes:global_seo:title_suffix** | *nullable string* | Title meta tag suffix | `" - My awesome website"` |
| **data:attributes:global_seo:twitter_account** | *nullable string* | Twitter account associated to website | `"@awesomewebsite"` |
| **data:attributes:locales** | *array* | Site available locales | `["it"]` |
| **data:attributes:name** | *string* | Site name | `"My blog"` |
| **data:attributes:no_index** | *boolean* | Whether the website needs to be indexed by search engines or not | `true` |
| **data:attributes:ssg** | *nullable string* | Specifies static site generator used | `null` |
| **data:attributes:theme_hue** | *integer* | Specifies the Hue to use primary color in Site backend | `42` |
| **data:attributes:timezone** | *string* | Site default timezone | `"Rome"` |
| **data:id** | *string* | ID of site | `"155"` |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^site$</code> | `"site"` |



#### Curl Example

```bash
$ curl -n -X PUT https://site-api.datocms.com/site \
  -d '{
  "data": {
    "type": "site",
    "id": "155",
    "attributes": {
      "no_index": true,
      "favicon": {
        "path": "/7/1455102967-image.png",
        "width": 400,
        "height": 500,
        "format": "png",
        "size": 424112
      },
      "global_seo": {
        "site_name": "My awesome website",
        "fallback_seo": {
          "title": "Default meta title",
          "description": "Default meta description",
          "image": {
            "path": "/7/1455102967-image.png",
            "width": 400,
            "height": 500,
            "format": "png",
            "size": 424112
          }
        },
        "title_suffix": " - My awesome website",
        "facebook_page_url": "http://facebook.com/awesomewebsite",
        "twitter_account": "@awesomewebsite"
      },
      "name": "My blog",
      "theme_hue": 42,
      "deploy_adapter": "gitlab",
      "deploy_settings": null,
      "locales": [
        "it"
      ],
      "timezone": "Rome",
      "ssg": null,
      "frontend_url": null
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "site",
    "id": "155",
    "attributes": {
      "name": "My blog",
      "domain": "admin.foobar.com",
      "webhook_url": "http://api.datocms.com/sites/summer-star-15/deploy-results",
      "internal_domain": "summer-star-15.admin.datocms.com",
      "locales": [
        "it"
      ],
      "timezone": "Rome",
      "items_count": 42,
      "no_index": true,
      "favicon": {
        "path": "/7/1455102967-image.png",
        "width": 400,
        "height": 500,
        "format": "png",
        "size": 424112
      },
      "theme_hue": 42,
      "deploy_adapter": "gitlab",
      "deploy_settings": null,
      "readonly_token": "example",
      "readwrite_token": "example",
      "last_data_change_at": "2015-01-01T12:00:00Z",
      "last_deploy_at": "2015-01-01T12:00:00Z",
      "last_dump_at": "2015-01-01T12:00:00Z",
      "deployable": true,
      "deploy_status": "unstarted",
      "ssg": null,
      "frontend_url": null,
      "global_seo": {
        "site_name": "My awesome website",
        "fallback_seo": {
          "title": "Default meta title",
          "description": "Default meta description",
          "image": {
            "path": "/7/1455102967-image.png",
            "width": 400,
            "height": 500,
            "format": "png",
            "size": 424112
          }
        },
        "title_suffix": " - My awesome website",
        "facebook_page_url": "http://facebook.com/awesomewebsite",
        "twitter_account": "@awesomewebsite"
      }
    },
    "relationships": {
      "account": {
        "data": {
          "type": "account",
          "id": "312"
        }
      },
      "menu_items": {
        "data": [
          {
            "type": "menu_item",
            "id": "34"
          }
        ]
      },
      "users": {
        "data": [
          {
            "type": "user",
            "id": "312"
          }
        ]
      },
      "item_types": {
        "data": [
          {
            "type": "item_type",
            "id": "post"
          }
        ]
      }
    }
  }
}
```


## <a name="resource-menu_item"></a>Menu Item

A menu item helps organize item types within the backend interface

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **attributes:label** | *string* | The label of the menu item | `"Posts"` |
| **attributes:position** | *integer* | Ordering index | `1` |
| **id** | *string* | ID of menu item | `"34"` |
| **relationships:children:data** | *array* |  | `[{"type":"menu_item","id":"34"}]` |
| **relationships:item_type:data** | *string* | JSON API data |  |
| **relationships:parent:data** | *string* | JSON API data |  |
| **type** | *string* | JSON API type field<br/> **pattern:** <code>^menu_item$</code> | `"menu_item"` |

### Menu Item Create

Create a new menu item

```
POST /menu-items
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes:label** | *string* | The label of the menu item | `"Posts"` |
| **data:attributes:position** | *integer* | Ordering index | `1` |
| **data:relationships:item_type:data** | *string* | JSON API data |  |
| **data:relationships:parent:data** | *string* | JSON API data |  |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^menu_item$</code> | `"menu_item"` |



#### Curl Example

```bash
$ curl -n -X POST https://site-api.datocms.com/menu-items \
  -d '{
  "data": {
    "type": "menu_item",
    "attributes": {
      "label": "Posts",
      "position": 1
    },
    "relationships": {
      "item_type": {
        "data": null
      },
      "parent": {
        "data": null
      }
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "data": {
    "type": "menu_item",
    "id": "34",
    "attributes": {
      "label": "Posts",
      "position": 1
    },
    "relationships": {
      "item_type": {
        "data": null
      },
      "parent": {
        "data": null
      },
      "children": {
        "data": [
          {
            "type": "menu_item",
            "id": "34"
          }
        ]
      }
    }
  }
}
```

### Menu Item Update

Updates a menu item

```
PUT /menu-items/{menu_item_id}
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes:label** | *string* | The label of the menu item | `"Posts"` |
| **data:attributes:position** | *integer* | Ordering index | `1` |
| **data:id** | *string* | ID of menu item | `"34"` |
| **data:relationships:item_type:data** | *string* | JSON API data |  |
| **data:relationships:parent:data** | *string* | JSON API data |  |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^menu_item$</code> | `"menu_item"` |



#### Curl Example

```bash
$ curl -n -X PUT https://site-api.datocms.com/menu-items/$MENU_ITEM_ID \
  -d '{
  "data": {
    "type": "menu_item",
    "id": "34",
    "attributes": {
      "label": "Posts",
      "position": 1
    },
    "relationships": {
      "item_type": {
        "data": null
      },
      "parent": {
        "data": null
      }
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "menu_item",
    "id": "34",
    "attributes": {
      "label": "Posts",
      "position": 1
    },
    "relationships": {
      "item_type": {
        "data": null
      },
      "parent": {
        "data": null
      },
      "children": {
        "data": [
          {
            "type": "menu_item",
            "id": "34"
          }
        ]
      }
    }
  }
}
```

### Menu Item Index

Lists menu items

```
GET /menu-items
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/menu-items
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": [
    {
      "type": "menu_item",
      "id": "34",
      "attributes": {
        "label": "Posts",
        "position": 1
      },
      "relationships": {
        "item_type": {
          "data": null
        },
        "parent": {
          "data": null
        },
        "children": {
          "data": [
            {
              "type": "menu_item",
              "id": "34"
            }
          ]
        }
      }
    }
  ]
}
```

### Menu Item Show

Show menu item

```
GET /menu-items/{menu_item_id}
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/menu-items/$MENU_ITEM_ID
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "menu_item",
    "id": "34",
    "attributes": {
      "label": "Posts",
      "position": 1
    },
    "relationships": {
      "item_type": {
        "data": null
      },
      "parent": {
        "data": null
      },
      "children": {
        "data": [
          {
            "type": "menu_item",
            "id": "34"
          }
        ]
      }
    }
  }
}
```

### Menu Item Delete

Deletes menu item

```
DELETE /menu-items/{menu_item_id}
```


#### Curl Example

```bash
$ curl -n -X DELETE https://site-api.datocms.com/menu-items/$MENU_ITEM_ID \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "menu_item",
    "id": "34",
    "attributes": {
      "label": "Posts",
      "position": 1
    },
    "relationships": {
      "item_type": {
        "data": null
      },
      "parent": {
        "data": null
      },
      "children": {
        "data": [
          {
            "type": "menu_item",
            "id": "34"
          }
        ]
      }
    }
  }
}
```


## <a name="resource-deploy_event"></a>Deploy activity

Represents an event occurred during the deploy process

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **attributes:created_at** | *date-time* | The moment the activity occurred | `"2015-01-01T12:00:00Z"` |
| **attributes:data** | *object* | Any details regarding the event |  |
| **attributes:event_type** | *string* | The type of activity<br/> **one of:**`"request"` or `"request_failed"` or `"response_success"` or `"response_failure"` or `"response_timeout"` | `"response_success"` |
| **id** | *string* | ID of menu item | `"34"` |
| **relationships:site:data:id** | *string* | ID of site | `"155"` |
| **[relationships:site:data:type](#resource-site)** | *string* | JSON API type field<br/> **pattern:** <code>^site$</code> | `"site"` |
| **[type](#resource-site)** | *string* | JSON API type field<br/> **pattern:** <code>^deploy_event$</code> | `"deploy_event"` |

### Deploy activity Index

Lists deploy events

```
GET /deploy-events
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/deploy-events
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": [
    {
      "type": "deploy_event",
      "id": "34",
      "attributes": {
        "event_type": "response_success",
        "created_at": "2015-01-01T12:00:00Z",
        "data": null
      },
      "relationships": {
        "site": {
          "data": {
            "type": "site",
            "id": "155"
          }
        }
      }
    }
  ]
}
```

### Deploy activity Show

Show deploy event

```
GET /deploy-events/{deploy_event_id}
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/deploy-events/$DEPLOY_EVENT_ID
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "deploy_event",
    "id": "34",
    "attributes": {
      "event_type": "response_success",
      "created_at": "2015-01-01T12:00:00Z",
      "data": null
    },
    "relationships": {
      "site": {
        "data": {
          "type": "site",
          "id": "155"
        }
      }
    }
  }
}
```


## <a name="resource-item_type"></a>Item type

A item type is a specific kind of editable content

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **attributes:api_key** | *string* |  | `"post"` |
| **attributes:name** | *string* |  | `"Blog post"` |
| **attributes:ordering_direction** | *nullable string* | <br/> **one of:**`null` or `"asc"` or `"desc"` | `"desc"` |
| **attributes:singleton** | *boolean* |  | `true` |
| **attributes:sortable** | *boolean* |  | `true` |
| **id** | *string* | ID of item type | `"post"` |
| **relationships:fields:data** | *array* |  | `[{"type":"field","id":"124"}]` |
| **relationships:menu_item:data** | *string* | JSON API data |  |
| **relationships:ordering_field:data** | *string* | JSON API data |  |
| **relationships:singleton_item:data** | *string* | JSON API data |  |
| **type** | *string* | JSON API type field<br/> **pattern:** <code>^item_type$</code> | `"item_type"` |

### Item type Create

Create a new item type

```
POST /item-types
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes:api_key** | *string* |  | `"post"` |
| **data:attributes:name** | *string* |  | `"Blog post"` |
| **data:attributes:ordering_direction** | *nullable string* | <br/> **one of:**`null` or `"asc"` or `"desc"` | `"desc"` |
| **data:attributes:singleton** | *boolean* |  | `true` |
| **data:attributes:sortable** | *boolean* |  | `true` |
| **data:relationships:ordering_field:data** | *string* | JSON API data |  |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^item_type$</code> | `"item_type"` |



#### Curl Example

```bash
$ curl -n -X POST https://site-api.datocms.com/item-types \
  -d '{
  "data": {
    "type": "item_type",
    "attributes": {
      "name": "Blog post",
      "api_key": "post",
      "singleton": true,
      "sortable": true,
      "ordering_direction": "desc"
    },
    "relationships": {
      "ordering_field": {
        "data": null
      }
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "data": {
    "type": "item_type",
    "id": "post",
    "attributes": {
      "name": "Blog post",
      "api_key": "post",
      "singleton": true,
      "sortable": true,
      "ordering_direction": "desc"
    },
    "relationships": {
      "menu_item": {
        "data": null
      },
      "singleton_item": {
        "data": null
      },
      "fields": {
        "data": [
          {
            "type": "field",
            "id": "124"
          }
        ]
      },
      "ordering_field": {
        "data": null
      }
    }
  },
  "included": [
    null
  ]
}
```

### Item type Update

Updates a item type

```
PUT /item-types/{item_type_id}
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes:api_key** | *string* |  | `"post"` |
| **data:attributes:name** | *string* |  | `"Blog post"` |
| **data:attributes:ordering_direction** | *nullable string* | <br/> **one of:**`null` or `"asc"` or `"desc"` | `"desc"` |
| **data:attributes:singleton** | *boolean* |  | `true` |
| **data:attributes:sortable** | *boolean* |  | `true` |
| **data:id** | *string* | ID of item type | `"post"` |
| **data:relationships:ordering_field:data** | *string* | JSON API data |  |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^item_type$</code> | `"item_type"` |



#### Curl Example

```bash
$ curl -n -X PUT https://site-api.datocms.com/item-types/$ITEM_TYPE_ID \
  -d '{
  "data": {
    "type": "item_type",
    "id": "post",
    "attributes": {
      "name": "Blog post",
      "api_key": "post",
      "singleton": true,
      "sortable": true,
      "ordering_direction": "desc"
    },
    "relationships": {
      "ordering_field": {
        "data": null
      }
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "item_type",
    "id": "post",
    "attributes": {
      "name": "Blog post",
      "api_key": "post",
      "singleton": true,
      "sortable": true,
      "ordering_direction": "desc"
    },
    "relationships": {
      "menu_item": {
        "data": null
      },
      "singleton_item": {
        "data": null
      },
      "fields": {
        "data": [
          {
            "type": "field",
            "id": "124"
          }
        ]
      },
      "ordering_field": {
        "data": null
      }
    }
  }
}
```

### Item type Index

Lists item types

```
GET /item-types
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/item-types
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": [
    {
      "type": "item_type",
      "id": "post",
      "attributes": {
        "name": "Blog post",
        "api_key": "post",
        "singleton": true,
        "sortable": true,
        "ordering_direction": "desc"
      },
      "relationships": {
        "menu_item": {
          "data": null
        },
        "singleton_item": {
          "data": null
        },
        "fields": {
          "data": [
            {
              "type": "field",
              "id": "124"
            }
          ]
        },
        "ordering_field": {
          "data": null
        }
      }
    }
  ]
}
```

### Item type Show

Show item type

```
GET /item-types/{item_type_id}
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/item-types/$ITEM_TYPE_ID
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "item_type",
    "id": "post",
    "attributes": {
      "name": "Blog post",
      "api_key": "post",
      "singleton": true,
      "sortable": true,
      "ordering_direction": "desc"
    },
    "relationships": {
      "menu_item": {
        "data": null
      },
      "singleton_item": {
        "data": null
      },
      "fields": {
        "data": [
          {
            "type": "field",
            "id": "124"
          }
        ]
      },
      "ordering_field": {
        "data": null
      }
    }
  }
}
```

### Item type Delete

Deletes item type

```
DELETE /item-types/{item_type_id}
```


#### Curl Example

```bash
$ curl -n -X DELETE https://site-api.datocms.com/item-types/$ITEM_TYPE_ID \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "item_type",
    "id": "post",
    "attributes": {
      "name": "Blog post",
      "api_key": "post",
      "singleton": true,
      "sortable": true,
      "ordering_direction": "desc"
    },
    "relationships": {
      "menu_item": {
        "data": null
      },
      "singleton_item": {
        "data": null
      },
      "fields": {
        "data": [
          {
            "type": "field",
            "id": "124"
          }
        ]
      },
      "ordering_field": {
        "data": null
      }
    }
  }
}
```


## <a name="resource-field"></a>Field

A field represents a single chunk of data associated to a item type

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **attributes:api_key** | *string* | Field API key | `"title"` |
| **attributes:appeareance** | *nullable object* | Field appeareance | `{"type":["wysiwyg"]}` |
| **attributes:field_type** | *string* | Type of input | `"string"` |
| **attributes:hint** | *nullable string* | Field hint | `"This field will be used as post title"` |
| **attributes:label** | *string* | The label of the field | `"Title"` |
| **attributes:localized** | *boolean* | Whether the field needs to be multilanguage or not | `true` |
| **attributes:position** | *integer* | Ordering index | `1` |
| **attributes:validators** | *object* | Optional field validations | `{"required":{}}` |
| **id** | *string* | ID of field | `"124"` |
| **relationships:item_type:data:id** | *string* | ID of item type | `"post"` |
| **[relationships:item_type:data:type](#resource-item_type)** | *string* | JSON API type field<br/> **pattern:** <code>^item_type$</code> | `"item_type"` |
| **[type](#resource-item_type)** | *string* | JSON API type field<br/> **pattern:** <code>^field$</code> | `"field"` |

### Field Create

Create a new field

```
POST /item-types/{item_type_id}/fields
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes:api_key** | *string* | Field API key | `"title"` |
| **data:attributes:appeareance** | *nullable object* | Field appeareance | `{"type":["wysiwyg"]}` |
| **data:attributes:field_type** | *string* | Type of input | `"string"` |
| **data:attributes:hint** | *nullable string* | Field hint | `"This field will be used as post title"` |
| **data:attributes:label** | *string* | The label of the field | `"Title"` |
| **data:attributes:localized** | *boolean* | Whether the field needs to be multilanguage or not | `true` |
| **data:attributes:position** | *integer* | Ordering index | `1` |
| **data:attributes:validators** | *object* | Optional field validations | `{"required":{}}` |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^field$</code> | `"field"` |



#### Curl Example

```bash
$ curl -n -X POST https://site-api.datocms.com/item-types/$ITEM_TYPE_ID/fields \
  -d '{
  "data": {
    "type": "field",
    "attributes": {
      "label": "Title",
      "field_type": "string",
      "localized": true,
      "api_key": "title",
      "hint": "This field will be used as post title",
      "validators": {
        "required": {
        }
      },
      "appeareance": {
        "type": [
          "wysiwyg"
        ]
      },
      "position": 1
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "data": {
    "type": "field",
    "id": "124",
    "attributes": {
      "label": "Title",
      "field_type": "string",
      "localized": true,
      "api_key": "title",
      "hint": "This field will be used as post title",
      "validators": {
        "required": {
        }
      },
      "appeareance": {
        "type": [
          "wysiwyg"
        ]
      },
      "position": 1
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      }
    }
  }
}
```

### Field Update

Updates a field

```
PUT /fields/{field_id}
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes:api_key** | *string* | Field API key | `"title"` |
| **data:attributes:appeareance** | *nullable object* | Field appeareance | `{"type":["wysiwyg"]}` |
| **data:attributes:hint** | *nullable string* | Field hint | `"This field will be used as post title"` |
| **data:attributes:label** | *string* | The label of the field | `"Title"` |
| **data:attributes:localized** | *boolean* | Whether the field needs to be multilanguage or not | `true` |
| **data:attributes:position** | *integer* | Ordering index | `1` |
| **data:attributes:validators** | *object* | Optional field validations | `{"required":{}}` |
| **data:id** | *string* | ID of field | `"124"` |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^field$</code> | `"field"` |



#### Curl Example

```bash
$ curl -n -X PUT https://site-api.datocms.com/fields/$FIELD_ID \
  -d '{
  "data": {
    "type": "field",
    "id": "124",
    "attributes": {
      "label": "Title",
      "api_key": "title",
      "localized": true,
      "validators": {
        "required": {
        }
      },
      "appeareance": {
        "type": [
          "wysiwyg"
        ]
      },
      "position": 1,
      "hint": "This field will be used as post title"
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "field",
    "id": "124",
    "attributes": {
      "label": "Title",
      "field_type": "string",
      "localized": true,
      "api_key": "title",
      "hint": "This field will be used as post title",
      "validators": {
        "required": {
        }
      },
      "appeareance": {
        "type": [
          "wysiwyg"
        ]
      },
      "position": 1
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      }
    }
  }
}
```

### Field Index

Lists fields

```
GET /item-types/{item_type_id}/fields
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/item-types/$ITEM_TYPE_ID/fields
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": [
    {
      "type": "field",
      "id": "124",
      "attributes": {
        "label": "Title",
        "field_type": "string",
        "localized": true,
        "api_key": "title",
        "hint": "This field will be used as post title",
        "validators": {
          "required": {
          }
        },
        "appeareance": {
          "type": [
            "wysiwyg"
          ]
        },
        "position": 1
      },
      "relationships": {
        "item_type": {
          "data": {
            "type": "item_type",
            "id": "post"
          }
        }
      }
    }
  ]
}
```

### Field Show

Show field

```
GET /fields/{field_id}
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/fields/$FIELD_ID
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "field",
    "id": "124",
    "attributes": {
      "label": "Title",
      "field_type": "string",
      "localized": true,
      "api_key": "title",
      "hint": "This field will be used as post title",
      "validators": {
        "required": {
        }
      },
      "appeareance": {
        "type": [
          "wysiwyg"
        ]
      },
      "position": 1
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      }
    }
  }
}
```

### Field Delete

Deletes field

```
DELETE /fields/{field_id}
```


#### Curl Example

```bash
$ curl -n -X DELETE https://site-api.datocms.com/fields/$FIELD_ID \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "field",
    "id": "124",
    "attributes": {
      "label": "Title",
      "field_type": "string",
      "localized": true,
      "api_key": "title",
      "hint": "This field will be used as post title",
      "validators": {
        "required": {
        }
      },
      "appeareance": {
        "type": [
          "wysiwyg"
        ]
      },
      "position": 1
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      }
    }
  }
}
```


## <a name="resource-item"></a>Item

A item is a single instance of a item type

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **attributes** | *object* | The JSON data associated to the item | `{"title":"This is a item!"}` |
| **id** | *string* | ID of item | `"4235"` |
| **relationships:item_type:data:id** | *string* | ID of item type | `"post"` |
| **[relationships:item_type:data:type](#resource-item_type)** | *string* | JSON API type field<br/> **pattern:** <code>^item_type$</code> | `"item_type"` |
| **[relationships:last_editor:data](#resource-item_type)** | *string* | JSON API data |  |
| **type** | *string* | JSON API type field<br/> **pattern:** <code>^item$</code> | `"item"` |

### Item Validate existing item

Validates an existing item field

```
POST /items/{item_id}/validate
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes** | *object* | The JSON data associated to the item | `{"title":"This is a item!"}` |
| **data:id** | *string* | ID of item | `"4235"` |
| **data:relationships:item_type:data:id** | *string* | ID of item type | `"post"` |
| **data:relationships:item_type:data:type** | *string* | JSON API type field<br/> **pattern:** <code>^item_type$</code> | `"item_type"` |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^item$</code> | `"item"` |



#### Curl Example

```bash
$ curl -n -X POST https://site-api.datocms.com/items/$ITEM_ID/validate \
  -d '{
  "data": {
    "id": "4235",
    "type": "item",
    "attributes": {
      "title": "This is a item!"
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      }
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "item",
    "id": "4235",
    "attributes": {
      "title": "This is a item!"
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      },
      "last_editor": {
        "data": null
      }
    }
  },
  "included": [
    {
      "type": "item_type",
      "id": "post",
      "attributes": {
        "name": "Blog post",
        "api_key": "post",
        "singleton": true,
        "sortable": true,
        "ordering_direction": "desc"
      },
      "relationships": {
        "menu_item": {
          "data": null
        },
        "singleton_item": {
          "data": null
        },
        "fields": {
          "data": [
            {
              "type": "field",
              "id": "124"
            }
          ]
        },
        "ordering_field": {
          "data": null
        }
      }
    }
  ]
}
```

### Item Validate new item

Validates a item fields

```
POST /items/validate
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes** | *object* | The JSON data associated to the item | `{"title":"This is a item!"}` |
| **data:relationships:item_type:data:id** | *string* | ID of item type | `"post"` |
| **data:relationships:item_type:data:type** | *string* | JSON API type field<br/> **pattern:** <code>^item_type$</code> | `"item_type"` |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^item$</code> | `"item"` |



#### Curl Example

```bash
$ curl -n -X POST https://site-api.datocms.com/items/validate \
  -d '{
  "data": {
    "type": "item",
    "attributes": {
      "title": "This is a item!"
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      }
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "item",
    "id": "4235",
    "attributes": {
      "title": "This is a item!"
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      },
      "last_editor": {
        "data": null
      }
    }
  },
  "included": [
    {
      "type": "item_type",
      "id": "post",
      "attributes": {
        "name": "Blog post",
        "api_key": "post",
        "singleton": true,
        "sortable": true,
        "ordering_direction": "desc"
      },
      "relationships": {
        "menu_item": {
          "data": null
        },
        "singleton_item": {
          "data": null
        },
        "fields": {
          "data": [
            {
              "type": "field",
              "id": "124"
            }
          ]
        },
        "ordering_field": {
          "data": null
        }
      }
    }
  ]
}
```

### Item Create

Create a new item

```
POST /items
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes** | *object* | The JSON data associated to the item | `{"title":"This is a item!"}` |
| **data:relationships:item_type:data:id** | *string* | ID of item type | `"post"` |
| **data:relationships:item_type:data:type** | *string* | JSON API type field<br/> **pattern:** <code>^item_type$</code> | `"item_type"` |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^item$</code> | `"item"` |



#### Curl Example

```bash
$ curl -n -X POST https://site-api.datocms.com/items \
  -d '{
  "data": {
    "type": "item",
    "attributes": {
      "title": "This is a item!"
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      }
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "data": {
    "type": "item",
    "id": "4235",
    "attributes": {
      "title": "This is a item!"
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      },
      "last_editor": {
        "data": null
      }
    }
  },
  "included": [
    {
      "type": "item_type",
      "id": "post",
      "attributes": {
        "name": "Blog post",
        "api_key": "post",
        "singleton": true,
        "sortable": true,
        "ordering_direction": "desc"
      },
      "relationships": {
        "menu_item": {
          "data": null
        },
        "singleton_item": {
          "data": null
        },
        "fields": {
          "data": [
            {
              "type": "field",
              "id": "124"
            }
          ]
        },
        "ordering_field": {
          "data": null
        }
      }
    }
  ]
}
```

### Item Update

Updates a item

```
PUT /items/{item_id}
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes** | *object* | The JSON data associated to the item | `{"title":"This is a item!"}` |
| **data:id** | *string* | ID of item | `"4235"` |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^item$</code> | `"item"` |



#### Curl Example

```bash
$ curl -n -X PUT https://site-api.datocms.com/items/$ITEM_ID \
  -d '{
  "data": {
    "type": "item",
    "id": "4235",
    "attributes": {
      "title": "This is a item!"
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "item",
    "id": "4235",
    "attributes": {
      "title": "This is a item!"
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      },
      "last_editor": {
        "data": null
      }
    }
  }
}
```

### Item Index

Lists items

```
GET /items
```

#### Optional Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **filter[ids]** | *string* | IDs to fetch, comma separated | `"12,31"` |
| **filter[query]** | *string* | textual query to match | `"foo"` |
| **filter[type]** | *string* | item type to filter | `"post"` |
| **page[limit]** | *integer* | number of items to fetch<br/> **default:** `30` | `15` |
| **page[offset]** | *integer* | index of first item to fetch<br/> **default:** `1` | `2` |


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/items
 -G \
  -d filter[ids]=12%2C31 \
  -d filter[type]=post \
  -d filter[query]=foo \
  -d page[offset]=2 \
  -d page[limit]=15
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": [
    {
      "type": "item",
      "id": "4235",
      "attributes": {
        "title": "This is a item!"
      },
      "relationships": {
        "item_type": {
          "data": {
            "type": "item_type",
            "id": "post"
          }
        },
        "last_editor": {
          "data": null
        }
      }
    }
  ],
  "meta": {
    "total_count": 42
  }
}
```

### Item Show

Show item

```
GET /items/{item_id}
```


#### Curl Example

```bash
$ curl -n https://site-api.datocms.com/items/$ITEM_ID
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "item",
    "id": "4235",
    "attributes": {
      "title": "This is a item!"
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      },
      "last_editor": {
        "data": null
      }
    }
  }
}
```

### Item Delete

Deletes a item

```
DELETE /items/{item_id}
```


#### Curl Example

```bash
$ curl -n -X DELETE https://site-api.datocms.com/items/$ITEM_ID \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "type": "item",
    "id": "4235",
    "attributes": {
      "title": "This is a item!"
    },
    "relationships": {
      "item_type": {
        "data": {
          "type": "item_type",
          "id": "post"
        }
      },
      "last_editor": {
        "data": null
      }
    }
  }
}
```


## <a name="resource-upload_request"></a>Upload request

To upload a file in Dato through a direct PUT request, first you need an upload permission.

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **attributes:url** | *string* | The URL to use to PUT the file | `"https://dato-images.s3-eu-west-1.amazonaws.com/7/1455102967-image.png?X-Amz-Credential=AKIAJDTXTZHHDUCKAUMA%2F20160210"` |
| **id** | *string* | The S3 path where the file will be stored | `"/7/1455102967-image.png"` |
| **type** | *string* | JSON API type field<br/> **pattern:** <code>^upload_request$</code> | `"upload_request"` |

### Upload request Create

Create a new upload request

```
POST /upload-requests
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **data:attributes:filename** | *string* | The original file name | `"image.png"` |
| **data:type** | *string* | JSON API type field<br/> **pattern:** <code>^upload_request$</code> | `"upload_request"` |



#### Curl Example

```bash
$ curl -n -X POST https://site-api.datocms.com/upload-requests \
  -d '{
  "data": {
    "type": "upload_request",
    "attributes": {
      "filename": "image.png"
    }
  }
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "data": {
    "type": "upload_request",
    "id": "/7/1455102967-image.png",
    "attributes": {
      "url": "https://dato-images.s3-eu-west-1.amazonaws.com/7/1455102967-image.png?X-Amz-Credential=AKIAJDTXTZHHDUCKAUMA%2F20160210"
    }
  }
}
```


