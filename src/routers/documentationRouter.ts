import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const documentationRouter = Router();

const swaggerOptions = {
  swaggerOptions: { supportedSubmitMethods: []  } 
};

documentationRouter.use('/api-docs', swaggerUi.serve);
documentationRouter.get('/api-docs', swaggerUi.setup(
  {
    "openapi": "3.0.0",
    "info": {
      "title": "RepoProvas API",
      "description": "[ BaseUrl: http://localhost:5000 ]",
      "version": "1.0.0"
    },

    "paths": {

      "/sign-up": {
        "post": {
          "summary": "Sign up into the system",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "title": "Users",
                  "required": [
                    "email", 
                    "password"
                  ],
                  "properties": {
                    "email": {
                      "type": "string"
                    },
                    "password": {
                      "type": "string"
                    }
                  }
                },
                "examples": {
                  "user": {
                    "value": {
                      "email": "jane@mail.com",
                      "password": "123456"
                    }
                  }
                }           
              }
            }
          },
          "responses": {
            "409": {
              "description": "Conflict"
            },
            "422": {
              "description": "Unprocessable entity"
            },
            "201": {
              "description": "Created"
            }
          }
        }
      },

      "/sign-in": {
        "post": {
          "summary": "Sign in into the system",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "title": "Users",
                  "required": [
                    "email", 
                    "password"
                  ],
                  "properties": {
                    "email": {
                      "type": "string"
                    },
                    "password": {
                      "type": "string"
                    }
                  }
                },
                "examples": {
                  "user": {
                    "value": {
                      "email": "jane@mail.com",
                      "password": "123456"
                    }
                  }
                }                       
              }
            }
          },

          "responses": {
            "404": {
              "description": "Invalid user/password"
            },
            "422": {
              "description": "Unprocessable entity"
            },
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "properties": {
                      "token": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }

          }
      }

    }
  }, 
  swaggerOptions
));



export default documentationRouter;