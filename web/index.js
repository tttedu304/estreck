const form = document.getElementById('addCode');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Submitted");
});

function getData() {
    fetch('http://localhost:3000/codes', {mode: 'no-cors'})
        .then(function(res){
        return console.log(res.json())
    })
        .then(function(data){
           return console.log(data)
        })
}

getData();