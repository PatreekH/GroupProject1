$("#animalButtons").on('click', function(){


    var type = $("#breedType").val().trim();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
         var results = response.data;
         console.log(results);

    }); 
});
