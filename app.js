import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API_URL = "https://api.github.com";

// GitHub API request headers
const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

// 1. Get GitHub profile details
app.get("/github", async (req, res) => {
  try {
    const { data: user } = await axios.get(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}`, { headers });
    const { data: repos } = await axios.get(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos`, { headers });

    res.json({
      username: user.login,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      repositories: repos.map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        stars: repo.stargazers_count,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
});

// 2. Get details of a specific repo
app.get("/github/:repoName", async (req, res) => {
  const repoName = req.params.repoName;
  try {
    const { data: repo } = await axios.get(`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}`, { headers });

    res.json({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      open_issues: repo.open_issues_count,
      repo_url: repo.html_url,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch repository data" });
  }
});

// 3. Create an issue in a repository
app.post("/github/:repoName/issues", async (req, res) => {
  const repoName = req.params.repoName;
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  try {
    const { data: issue } = await axios.post(
      `${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}/issues`,
      { title, body },
      { headers }
    );

    res.json({ message: "Issue created successfully", issue_url: issue.html_url });
  } catch (error) {
    res.status(500).json({ error: "Failed to create issue" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
