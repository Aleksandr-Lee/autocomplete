let input = document.querySelector(".search__input");
let divSearch = document.querySelector(".search__wrapper");
let divCard = document.querySelector(".card__wrapper");

const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};
function change() {
  getRepositories(input.value);
}
input.addEventListener("input", debounce(change, 500));

async function getRepositories(login) {
  if (login === "") {
    divSearch.innerHTML = "";
    return;
  }
  let response = await fetch(
    `https://api.github.com/search/repositories?q=${login}`
  );
  let res = await response.json();
  res = res.items.splice(0, 5);
  searchResults(res);
  return res;
}

function searchResults(res) {
  divSearch.innerHTML = "";
  res.forEach((element, i) => {
    let divRes = document.createElement("div");
    divRes.classList.add("search__result");
    divRes.textContent = element.name;
    divRes.setAttribute("id", `${i}`);
    divRes.addEventListener("click", (e) => {
      input.value = "";
      divSearch.innerHTML = "";
      let divCardResult = document.createElement("div");
      divCardResult.classList.add("card__result");
      divCard.append(divCardResult);
      divCardResult.insertAdjacentHTML(
        "beforeend",
        `<p class="card__item">Name: ${res[e.target.id].name}</p>`
      );
      divCardResult.insertAdjacentHTML(
        "beforeend",
        `<p class="card__item">Owner: ${res[e.target.id].owner.login}</p>`
      );
      divCardResult.insertAdjacentHTML(
        "beforeend",
        `<p class="card__item">Stars: ${res[e.target.id].stargazers_count}</p>`
      );
      let close = document.createElement("div");
      close.classList.add("card__result_close");
      divCardResult.append(close);
      close.textContent = "+";
      close.addEventListener("click", (e) => {
        divCardResult.remove();
      });
    });
    divSearch.append(divRes);
  });
}

