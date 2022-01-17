let favoriteNumber = 9;
let url = `http://numbersapi.com`;

// Solution 1.
async function getNumberData() {
  let response = await axios.get(`${url}/${favoriteNumber}?json`);
  console.log(response.data);
}

getNumberData();

// Solution 2.
let favoriteNumbers = [5, 7, 9];
async function getNumbers() {
  let response = await axios.get(`${url}/${favoriteNumbers}?json`);
  console.log(response.data);
}

getNumbers();

// Solution 3.
let result = document.querySelector('#result');

async function getNumbersData() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => axios.get(`${url}/${favoriteNumber}?json`))
  );
  facts.forEach(resp => {
    let newFact = document.createElement('div');
    newFact.innerHTML = resp.data.text;
    result.append(newFact);
  })
}

getNumbersData();