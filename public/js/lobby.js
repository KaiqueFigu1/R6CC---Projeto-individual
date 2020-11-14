function fetchAndSetBoxes(){

    fetch('/match/maps')
    .then(res => res.json())
    .then(res => {
        console.log(res);
    })


}

fetchAndSetBoxes()