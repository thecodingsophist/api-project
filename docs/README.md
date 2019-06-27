# Headline
An awesome project: https://shrouded-ridge-38664.herokuapp.com/ (Shipped!)

# Routes and Endpoints
My routes/endpoints below are described as follows:

Example Req Expected Response

FOR PROJECTS

app.get('/') returns an index of projects

app.get('/projects/new') returns a template for new projects

app.post('/projects') creates the project

app.get('/projects/:id') calls the project and returns the projects plus its todos

app.get('/projects/:id/edit') shows a template that allows editing of the project

app.delete('/projects/:id') deletes the project by project id from the database

app.put('/projects/:id') the action of pushing the code to the database

FOR TO-DOs

app.post('/projects/:projectId/todos') returned Todo object --> Posts to Mongo Database

app.get('/projects/todo/:id/edit') this gives an edit form for todos

app.put('/projects/todos/:id') this is the action of pushing code to the database when a todo is changed

app.delete('/projects/todos/:id') this deletes a todo

# API Proposal
My proposal for my API project is to use RESTful architecture to create an API that allows the user to create, read, update, and delete different projects and todos for those projects. It uses MongoDB, provisions users, has a brochure site/documentation, uses MVC and RESTful architecture, uses TDD approach and has no exposed secrets.
