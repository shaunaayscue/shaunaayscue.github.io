let searchBtn = document.getElementById("search-btn");
let inputUsername = document.getElementById("github-username");

let defaultUsername = "shaunaayscue"
fetchRepos(defaultUsername);

searchBtn.addEventListener("click", onClick);

/** Handles the search button click event. - Retrieves the username from the input field and calls fetchRepos. */
function onClick() {
    let githubUsername = inputUsername.value;
    if (githubUsername) {
        fetchRepos(githubUsername);
    }
}

/**
 * Fetches the repositories of a GitHub user and displays them on the page.
 * @param {string} githubUsername - GitHub username's repositories that are fetched.
 * @return {void} Updates the HTML element with repository information.
 */
async function fetchRepos(githubUsername) {
    const repoContainer = document.getElementById("repo-container");
    
    repoContainer.textContent = "";

    try {
        let res = await fetch("https://api.github.com/users/" + githubUsername + "/repos?sort=updated&per_page=20");

        if (!res.ok) {
            throw new Error(await res.text())
        }

        res = await res.json();

        for (let index = 0; index < res.length; index++) {
            let repo = res[index];

            let repository = document.createElement("div");
            repository.classList.add("repo-card");

            let repoName = document.createElement("h2");
            let githubIcon = document.createElement("i");
            githubIcon.classList.add("fab", "fa-github");
            let repoLink = document.createElement("a");
            repoLink.href = repo.html_url;
            repoLink.target = "_blank";
            repoLink.textContent = repo.name;

            repoName.appendChild(githubIcon);
            repoName.appendChild(repoLink);
            repository.appendChild(repoName);

            let description = document.createElement("p");
            if (repo.description) {
                description.textContent = repo.description;
            } else {
                description.textContent = "No description";
            }
            repository.appendChild(description);
            
            let creationDate = document.createElement("p");
            creationDate.textContent = "Created: " + new Date(repo.created_at).toLocaleDateString();
            repository.appendChild(creationDate);

            let updateDate = document.createElement("p");
            updateDate.textContent = "Updated: " + new Date(repo.updated_at).toLocaleDateString();
            repository.appendChild(updateDate);

            let watchersNumber = document.createElement("p");
            watchersNumber.textContent = "Watchers: " + repo.watchers_count;
            repository.appendChild(watchersNumber);

            let langRes = await fetch(repo.languages_url);
            let languages = await langRes.json();
            let languageList = Object.keys(languages).join(", ");
            let languageTypes = document.createElement("p");
            languageTypes.textContent = "Languages: " + languageList;
            repository.appendChild(languageTypes);

            let commitNumber = document.createElement("p");
            let commitRes = await fetch("https://api.github.com/repos/" + githubUsername + "/" + repo.name + "/commits");
            let commits = await commitRes.json();
            let commitCount = 0;
            if (Array.isArray(commits)) {
                commitCount = commits.length;
            } else {
                commitCount = 0;
            }
            commitNumber.textContent = "Commits: " + commitCount;
            repository.appendChild(commitNumber);
            
            repoContainer.appendChild(repository);
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

