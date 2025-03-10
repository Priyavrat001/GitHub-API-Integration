# GitHub Activity API

This project is an API that connects to the GitHub API to fetch and display your GitHub activity log. It provides endpoints to retrieve general GitHub profile data, repository details, and create issues in repositories. The API is deployed online and can be integrated into your portfolio website at the `/github` route.

## Features

- Fetch GitHub profile details such as followers, following, and repositories.
- Get detailed information about a specific repository.
- Create an issue in a given repository by providing a title and body.

## API Endpoints

### 1. Get GitHub Profile Data
**Endpoint:** `GET /github`  
**Description:** Retrieves basic profile details including followers, following, and a list of repositories.

#### Response Example:
```json
{
  "username": "your-github-username",
  "followers": 150,
  "following": 50,
  "repositories": [
    {
      "name": "project-1",
      "url": "https://github.com/your-github-username/project-1"
    },
    {
      "name": "project-2",
      "url": "https://github.com/your-github-username/project-2"
    }
  ]
}
```

---

### 2. Get Repository Details
**Endpoint:** `GET /github/{repo-name}`  
**Description:** Retrieves details about a specific repository, including stars, forks, and open issues.

#### Response Example:
```json
{
  "repository": "project-1",
  "description": "A sample project",
  "stars": 100,
  "forks": 20,
  "issues": 5,
  "url": "https://github.com/your-github-username/project-1"
}
```

---

### 3. Create an Issue in a Repository
**Endpoint:** `POST /github/{repo-name}/issues`  
**Description:** Creates a new issue in the specified repository by providing a title and description.

#### Request Body Example:
```json
{
  "title": "Bug found in feature X",
  "body": "Detailed description of the issue..."
}
```

#### Response Example:
```json
{
  "issue_url": "https://github.com/your-github-username/project-1/issues/1"
}
```

