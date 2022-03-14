let container = document.querySelector('.container'),
    input = document.querySelector('input'),
    reposContanier = document.querySelector(".repos-container"),
    getReposBtn = document.querySelector('.get-repos');


getReposBtn.addEventListener('click', (e) => {
  getRepos();
  e.preventDefault();
})

// Get Repos Function
async function getRepos() {
  // If the input value is empty
  if (input.value == '') {
    reposContanier.innerHTML = "<p>Please Write Github Username.</p>";
  } else {
    reposContanier.innerHTML = '';
    let apiLink = `https://api.github.com/users/${input.value}/repos`,
        response = await fetch(apiLink),
        reposData = await response.json();
    // For each repo
    reposData.map(repo => {
      // Create repo  
      let repoBlock =  
                  `<div class="repo">
                      <h3>${repo.name}</h3>
                      <p>${repo.description || "No description"}</p>
                      <div class="info">
                        <div class="langs">
                          <span></span>
                          ${repo.language || "Unknown"}
                        </div>
                        <div class="stars"><span class="icon-star-empty"></span>${repo.stargazers_count}</div>
                        <button class="view"><a href="${repo.html_url}" target="_blank">View</a></button>
                      </div>
                    </div>`
        // Add the repo to reposContanier
        reposContanier.innerHTML += repoBlock;
    })
  }
}
