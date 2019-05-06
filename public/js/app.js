const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
               msg1.textContent = data.error
               msg2.textContent = ''
               search.value = ''
               search.focus
            }
            else {
                msg1.textContent = 'Location: ' + data.Location
                msg2.textContent = 'Weather Report: ' + data.ForecastData
                search.value = ''
            }
        })
    })
})