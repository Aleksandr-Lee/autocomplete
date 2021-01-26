let input = document.querySelector(".search__input");
let div = document.querySelector(".search__wrapper");
let divCard = document.querySelector(".card__wrapper");
const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};
function change() {
  getRepositories(input.value).then((data) => {
    console.log(data);
  });
}

changeDebounce = debounce(change, 500);
input.addEventListener("input", changeDebounce);

async function getRepositories(login) {
  if (login === "") return;
  let response = await fetch(
    `https://api.github.com/search/repositories?q=${login}`
  );
  let res = await response.json();
  res = res.items.splice(0, 5);
  searchResults(res);
  return res;
}

function searchResults(res) {
  div.innerHTML = "";
  res.forEach((element) => {
	  div.insertAdjacentHTML('beforeend', `<div class="result">${element.name}</div>`)
   //  div.innerHTML += `
	// 	 <div class="result">${element.name}</div>`;
  });
  div.addEventListener("click", function (e) {
    input.value = "";
    div.innerHTML = "";
    res.forEach((element) => {
      divCard.innerHTML += `
			         <p class="card__item card__name">Name: ${element.name}</p>
						<p class="card__item card__owner">Owner: ${element.owner.login}</p>
						<p class="card__item card__stars">Stars: ${element.stargazers_count}</p>
			`;
	 });
  });
}
// function activ(elem) {
// 	console.log(elem)
// }
// div.addEventListener("click", function (e)  {
// 	// console.log( input.value);
// 	input.value = "";
// 	div.innerHTML = "";
// 	// activ(e)
//    // console.log(e.target);
//    // for (let key of res) {
//   	//  console.log(key)

//    // }
//  });
// let html = 	`<p class="card__item card__name">Name: ${data[0].name}</p>
// 				<p class="card__item card__owner">Owner: ${data[0].owner.login}</p>
// 				<p class="card__item card__stars">Stars: ${data[0].stargazers_count}</p>
// 	`;
// data.forEach((element) => {

// divCard.insertAdjacentHTML("beforeend", html)
//   divCard.innerHTML = `
// 	<p class="card__item card__name">Name: ${element.name}</p>
// 				<p class="card__item card__owner">Owner: ${element.owner.login}</p>
// 				<p class="card__item card__stars">Stars: ${element.stargazers_count}</p>
// 	`;
//  let html = `
// 			<p class="card__item card__name">${element.name}</p>
// 			<p class="card__item card__owner"></p>
// 			<p class="card__item card__stars"></p>
// 		`
// 	 console.log(html)
// });

// div.addEventListener("click", (e) => {
// 	console.log(e)
//   input.value = "";
//   div.innerHTML = "";

// });

// 	div.addEventListener("click", (e) => {
// 		input.value = "";
// 		div.innerHTML = "";

// 		data.forEach((element) => {
// 			let html = 	`<p class="card__item card__name">Name: ${element.name}</p>
// 			<p class="card__item card__owner">Owner: ${element.owner.login}</p>
// 			<p class="card__item card__stars">Stars: ${element.stargazers_count}</p>
// `;
// 			divCard.insertAdjacentHTML("beforeend", html)

// 	 });
//   });
