const topSection = document.querySelector("#topSection");
const gitRepos = document.querySelector("#gitRepos");
// console.log(gitRepos);
//This here is for getting the usual data from github
const gitData = async () => {
  const response = await fetch("https://api.github.com/users/suyogsubedi");
  const data = await response.json();
  return data;
};
// Writing the content to the html
let htmlContent = (image, url, name, followers, following, repos) => {
  let html = `
    <img height="200px"src=${image}" alt="">
    <p id="username">Username<a href=${url} target="_blank"> ${name}</a></p>
    <p id="followers">I have ${followers} followers and have ${repos} repos</p>
    <p id="following">I am following ${following} developers on github</p>
    `;
  topSection.innerHTML = html;
};
gitData().then((data) => {
  let username = data.login;
  let followers = data.followers;
  let following = data.following;
  let photo = data.avatar_url;
  let githubURL = data.html_url;
  let repos = data.public_repos;
  console.log(data);
  htmlContent(photo, githubURL, username, followers, following, repos);
});

// From here we are targetting the github repo

const repo = async () => {
  const repos = await fetch("https://api.github.com/users/suyogsubedi/repos");
  const result = await repos.json();
  return result;
};

repo().then((data) => {
  console.log(data);
  data.forEach((projects) => {
    // let things = [projects.name, projects.url];

    var project = projects.name;
    var projectsURL = projects.clone_url;
    repoDetails(project, projectsURL);
  });
});

// this function adds repo and their links to the HTML page
let repoDetails = (repoName, repoURL) => {
  let html = `
  <div id="repoInfo">
  <p>${repoName}</p>
  <p><a target=_blank href=${repoURL}>${repoURL}</a></p>
</div>

  `;
  gitRepos.innerHTML += html;
};
