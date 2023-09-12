const form = document.querySelector("#github-form");
const userList = document.querySelector("#user-list");
const repoList = document.querySelector("#repos-list");
const searchTypeButton = document.querySelector("#search-type-button");

let currentSearchType = "users";

searchTypeButton.addEventListener("click", function() {
    if (currentSearchType === "users") {
        currentSearchType = "repos";
        searchTypeButton.textContent = "Search Users";
        form.querySelector("input").placeholder = "Search Repositories";
    } else {
        currentSearchType = "users";
        searchTypeButton.textContent = "Search Repos";
        form.querySelector("input").placeholder = "Search Users";
    }
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const searchText = document.querySelector("#search").value;

    let url;
    if (currentSearchType === "users") {
        url = `https://api.github.com/search/users?q=${searchText}`;
    } else {
        url = `https://api.github.com/search/repositories?q=${searchText}`;
    }

    fetch(url) 
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        userList.innerHTML = "";
        repoList.innerHTML = "";

        if (currentSearchType === "users"){
            data.items.forEach(function(user){
                const listItem = document.createElement("li");

                const profileLink = document.createElement("a");
                profileLink.href = user.html_url;
                profileLink.textContent = user.login;

                const avatar = document.createElement("img");
                avatar.src = user.avatar_url;

                listItem.appendChild(profileLink);
                listItem.appendChild(avatar);

                userList.appendChild(listItem);
            });
        } else {
            data.items.forEach(function(repo){
                const listItem = document.createElement("li");
                
                const repoLink = document.createElement("a");
                repoLink.href = repo.html_url;
                repoLink.textContent = repo.name;

            listItem.appendChild(repoLink);

            userList.appendChild(listItem);
        });
    }
    });
});