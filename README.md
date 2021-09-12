# DocumentManager 
 API with NodeJS to *save, delete and download* documents with multer and fs

# Tecnologies
 * cors
 * express
 * mongoose
 * multer

# Styles
 * Bulma

# Directories
```bash
├── src
│   ├── config
│   │   ├── bd.config.js
│   |   └── properties.js
│   |
│   ├── controllers
│   │   ├── document.controller.js
│   |   └── file.controller.js
│   |
│   ├── middlewares
│   │   └── uploadFile.js
│   |
│   ├── models
│   │   ├── document.js
│   |   └── temp.js
│   |
│   ├── public
│   │   ├── css
│   │   │   └── style.css
│   │   ├── js
│   │   │   ├── app.js
│   │   │   ├── service.js
│   │   │   ├── utilities.js
│   │   │   └── business.js
│   │   └── index.html
│   |
│   ├── routes
│   │   ├── document.route.js
│   │   ├── file.route.js
│   |   └── routes.js
│   |
│   ├── service
│   │   ├── document.service.js
│   |   └── file.service.js
│   |
│   ├── utilities
│   |   └── utilities.js
│   |
│   └── app.js
```
# Structure
 * Views
   The UI is made in html, css and javascript, also using the visual framework Bulma.
 * Router
   This layer routes the maps to the controllers
 * Controller
   The controllers implement all the logic of the request params. 
   Too conten the application logic
 * Models
   Definition the Schemas of model
 * Service
   The services contain the consults to database and response the objects
   or errors of launch

```bash
     ____________ 
    |────────────|
    |   views    |
    └────────────┘
          ⇅
     ____________ 
    |────────────|
    |   router   |
    └────────────┘
          ⇅    
     ____________ 
    |────────────|
    | controller |
    └────────────┘
          ⇅    
     ____________      ____________  
    |────────────|    |────────────|
    |  services  | ⇾  |   models  |
    └────────────┘    └────────────┘

```

# Note
 * *The application is not responsive*
 * In the file *config/properties.js* configure the path for
   temporary files and folder final of documents, too the DataBase URL

# Preview
![Resume cv](/preview.png)