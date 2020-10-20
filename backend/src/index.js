const express = require('express'); //express controla rotas
const { uuid, isUuid } = require('uuidv4'); //id unico universal

const app = express(); //aplicação criada

app.use(express.json()); //pega o body em json

const projects = [];

function logRequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}${url}]`;

  console.time(logLabel);

  next(); //proxima requisição no caso as rotas, sem interromper o fluxo da aplicação/ prox middleware

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: ' invalid project ID.' });
  }

  return next();
  boo;
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId); // pode passar diversas funções

//rota
app.get('/projects', (request, response) => {
  //const { title, owner } = request.query; //query param
  //console.log(title);
  // console.log(owner);
  const { title } = request.query;
  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  /*   const body = request.body;
  console.log(body); //undefined sem app.use(express.json()); */
  /*  const { title, owner } = request.body;
  console.log(title);
  console.log(owner); */

  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project); //sempre exibo o projeto recem criado numca a array inteira, lista completa
});

app.put('/projects/:id', (request, response) => {
  //const params = request.params; // route params
  //console.log(params);
  //const { id } = request.params; //desestruturação
  //console.log(id);
  const { id } = request.params; //desestruturação
  const { title, owner } = request.body;

  //const project = projects.find(project => project.id === id)// retornar true o projeto que o id é igual o id que estou recebendo na minha rota,
  //melhor forma de arualizar é pelo indice

  const projectIndex = projects.findIndex((project) => project.id === id); //pela posição

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

/* app.patch('/projects/:id', (request, response) => {
  return response.json(project);
});
 */

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  projects.splice(projectIndex, 1); //remover 1

  return response.status(200).send();
});

app.listen(3334, () => {
  console.log('back-end started 🐱‍👤');
});
