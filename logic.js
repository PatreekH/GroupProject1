//$(document).ready(function(){


var laty = 40.9097802;
var long = -100.1617613;
var zoom = 3;
var map;
var marker;
var infowindow;
var shelterLat;
var shelterLong;
var name;

$(".panel").hide();

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: laty, lng: long},
        scrollwheel: false,
        zoom: zoom
    });
}

$(".typeDog").on("click", function(){
var name = "dog"
$(".nameOptions").animate({left: "-=250px"});
$("#autofill").empty()
$.getJSON('http://api.petfinder.com/breed.list?format=json&key=542589b85677d309b9e508711958b27a&animal=' + name + '&callback=?'
    ).done(function(dogData) { 

        console.log('Dog Breed Data retrieved!')
        console.log(dogData);
        $(".animalButton").empty();
        $(".animalButton").html("<b id='blackfont'>Dog</b>");

        for (i = 0; i < dogData.petfinder.breeds.breed.length; i++){
            $("#autofill").append("<option value='" + dogData.petfinder.breeds.breed[i].$t + "'>");
        }
    });
})
$(".typeCat").on("click", function(){
var name = "cat"
$(".nameOptions").animate({left: "-=250px"});
$("#autofill").empty()
$.getJSON('http://api.petfinder.com/breed.list?format=json&key=542589b85677d309b9e508711958b27a&animal=' + name + '&callback=?'
    ).done(function(catData) { 

        console.log('Cat Breed Data retrieved!')
        console.log(catData);
        $(".animalButton").empty();
        $(".animalButton").html("<b id='blackfont'>Cat</b>");

        for (i = 0; i < catData.petfinder.breeds.breed.length; i++){
            $("#autofill").append("<option value='" + catData.petfinder.breeds.breed[i].$t + "'>");
        }
    });
})
$(".typeBird").on("click", function(){
var name = "bird"
$(".nameOptions").animate({left: "-=250px"});
$("#autofill").empty()
$.getJSON('http://api.petfinder.com/breed.list?format=json&key=542589b85677d309b9e508711958b27a&animal=' + name + '&callback=?'
    ).done(function(birdData) { 

        console.log('Bird Breed Data retrieved!')
        console.log(birdData);
        $(".animalButton").empty();
        $(".animalButton").html("<b id='blackfont'>Bird</b>");

        for (i = 0; i < birdData.petfinder.breeds.breed.length; i++){
            $("#autofill").append("<option value='" + birdData.petfinder.breeds.breed[i].$t + "'>");
        }
    });
})

$(".animalButton").on("click", function(){
    $(".nameOptions").animate({left: "250px"});
});

$("#submitName").on("click", function(){

    $(".panel").show();
    $(".animalInfo").empty();
    //var name = $("#animalName").val().trim();
    var breedType = $("#breedName").val().trim();
    var zip = $("#zip").val().trim();

    var apiMap = "https://maps.googleapis.com/maps/api/geocode/json?address=postal_code:" + zip + "&key=AIzaSyC1mvi9WJalAJi7wOxXsYjqtwbDU3h6C5s";
    $.ajax({
        url: apiMap,
        method: 'GET'
    }).done(function(mapData) {
        laty = mapData.results[0].geometry.location.lat;
        long = mapData.results[0].geometry.location.lng;
        zoom = 10;
        var cityName = ("<div>" + "<b>Rescues Near: </b>" + mapData.results[0].formatted_address + "</div>");
        $(".mapTitle").html(cityName)
        console.log(mapData);
        initMap();
        });

    var apiBreed = "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + breedType + "&callback=?";
    $.ajax({
        type: "GET",
        url: apiBreed,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log('Wiki Data retrieved!')
            console.log(data);
            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);
            // remove links as they will not work
            blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
            // remove any references
            blurb.find('sup').remove();
            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();
            $('.result').html($(blurb).find('p'));
        },

        error: function (errorMessage) {
        }
    })

    $.getJSON('http://api.petfinder.com/shelter.find?format=json&key=542589b85677d309b9e508711958b27a&count=7&location=' + zip + '&callback=?'
            ).done(function(shelterData) { 
            console.log('Shelter Data retrieved!')
            console.log(shelterData);
                for (var i = 0; i < shelterData.petfinder.shelters.shelter.length; i++){

                    var shelterLat = shelterData.petfinder.shelters.shelter[i].latitude.$t;
                    var shelterLong = shelterData.petfinder.shelters.shelter[i].longitude.$t;
                    var shelterName = shelterData.petfinder.shelters.shelter[i].name.$t;

                    //var shelterAddy = shelterData.petfinder.shelters.shelter[i].address1.$t;
                    var shelterCity = shelterData.petfinder.shelters.shelter[i].city.$t;
                    var shelterPhone = shelterData.petfinder.shelters.shelter[i].phone.$t;
                    var shelterZip = shelterData.petfinder.shelters.shelter[i].zip.$t;

                    marker = new google.maps.Marker({
                        position: {lat: parseFloat(shelterLat), lng: parseFloat(shelterLong)},
                        map: map,
                        animation: google.maps.Animation.DROP
                    });

                    var infowindow = new google.maps.InfoWindow();  
                    var content = shelterName;
                    var moreContent = "<b>" + shelterName + "</b><br><b>City: </b>" + shelterCity + "<br><b>Zipcode: </b>" + shelterZip + "<br><b>Phone #: </b>" + shelterPhone;

                    google.maps.event.addListener(marker,'mouseover', (function(marker,content,infowindow){ 
                        return function() {
                            infowindow.setContent(content);
                            infowindow.open(map,marker);
                        };
                    })(marker,content,infowindow));

                    //google.maps.event.addListener(marker,'mouseout', (function(marker,content,infowindow){ 
                      //  return function() {
                     //       infowindow.close()
                    //    };
                    //})(marker,content,infowindow));

                    google.maps.event.addListener(marker, 'click', (function(marker,moreContent,infowindow){ 
                        return function() {
                            infowindow.setContent(moreContent)
                            infowindow.open(map,marker);
                        };
                    })(marker,moreContent,infowindow)); 
                }

            });

    $.getJSON('http://api.petfinder.com/pet.find?format=json&key=542589b85677d309b9e508711958b27a&breed=' + breedType + '&location=' + zip + '&count=10&output=full&callback=?'
            ).done(function(petData) { 

            console.log('Pet Data retrieved!')
            console.log(petData);

            for (var i = 0; i < petData.petfinder.pets.pet.length; i++){
                var animalDiv = $("<div class='petDiv'>");
                animalDiv.attr({
                    height: '25%',
                    width: '100%'
                })

                var animalInfo = $("<div class='petInfo'>"
                    + "<div class='title'>Name: </div>" + "  " + petData.petfinder.pets.pet[i].name.$t + " "
                    + "<div class='title'>Gender: </div>" + "  " + petData.petfinder.pets.pet[i].sex.$t + " "
                    + "<div class='title'>Age: </div>" + "  " + petData.petfinder.pets.pet[i].age.$t + " "
                    + "<div class='title'>Mix: </div>" + "  " + petData.petfinder.pets.pet[i].mix.$t + " "
                    + "<div class='title'>Size: </div>" + "  " + petData.petfinder.pets.pet[i].size.$t + " "
                    + "<div class='title'>About Me: </div>" + "  " + petData.petfinder.pets.pet[i].description.$t + " "
                    + "</div>");

                var animalImg = $("<img class='petPic'>");
                animalImg.attr({
                    src: petData.petfinder.pets.pet[i].media.photos.photo[2].$t,
                    height: '200px',
                    width: '200px'
               });

                animalDiv.append(animalImg);
                animalDiv.append(animalInfo)

                $(".animalInfo").append(animalDiv); 
            }
             
            });  

   return false;
});



//});
