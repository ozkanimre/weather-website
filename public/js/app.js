console.log('cdasdd');


const weatherForm = document.querySelector('#getAddress')
const searchIput = document.querySelector('#searchIput')
const msgOne = document.querySelector('#msgOne')
const msgTwo = document.querySelector('#msgTwo')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = searchIput.value
  fetch('http://localhost:3000/weather?address=' + location).then((respose) => {
    respose.json().then((data) => {
      if (data.error) {
        return msgOne.textContent = data.error
      }
      msgOne.textContent = data.forecast
      msgTwo.textContent = data.location
    })
  })
})