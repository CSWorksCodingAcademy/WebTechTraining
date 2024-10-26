document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("fetchButton").addEventListener("click", function() {

        // Call the Dog CEO API to fetch a random dog image
        fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            // Set the image source to the fetched image URL
            document.getElementById("dogImage").src = data.message;
        })
        .catch(error => {
            console.error('Error fetching the dog image', error);
        });
    });
});


