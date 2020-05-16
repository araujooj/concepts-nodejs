const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const id = uuid();

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return res.json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;

  let repository = repositories.filter((item) => item.id === id);

  if (repository.length < 1) {
    return res.status(400).json({
      error: "Repository not found",
    });
  }

  const { title, url, techs } = req.body;

  const updatedRepo = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.splice(repository);

  repository[0] = updatedRepo;

  repositories.push(repository[0]);

  return res.json(repository[0]);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  let repository = repositories.filter((item) => item.id === id);

  if (repository.length < 1) {
    return res.status(400).json({
      error: "Repository not found",
    });
  }

  repositories.splice(repository);

  return res.status(204).json();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;
  let repository = repositories.filter((item) => item.id === id);

  if (repository.length < 1) {
    return res.status(400).json({
      error: "Repository not found",
    });
  }

  let likedRepo = repository[0];

  likedRepo.likes = likedRepo.likes + 1;

  return res.json(likedRepo);
});

module.exports = app;
