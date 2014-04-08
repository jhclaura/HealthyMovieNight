// movieDB key: 07c77f21aa08756c2719275432259622
// food key: f327e486a75501c9ac20653a2a894388
// nutritionix ID: 8b31d27c, Keys: b5233afaf66b388e0b1b0d5a1973a738
// beer: public_66e76053df0f2b09b243dd8f8b6b7ef1ab92d196429f4055d8e91a72f4ecb551
// beer: private_3465886069fd09cd39f4e5bf0305d9181a1b9dcf20a216e92f566e74b323daa3
// data.gov: 8FBOgvUuIUghZAyIs20peGPq7DvB3jCo6rYPAZBV


var idMovie;
var movieTitle;
var duration;

var idFood;
var nameFood;
var calories;
var servingSize;
var servingSizeUnit;

var weightUnit;
var exerciseType;	// int
var exerciseTypeText;
var caloriesExercise;

var caloriesBurnAfterExersice;
var amountToEat;

var base_url = "http://image.tmdb.org/t/p/w500";

function getDuration(){
	var url = 'https://api.themoviedb.org/3/',
		mode = 'movie/',
		key = '?api_key=07c77f21aa08756c2719275432259622';

	$.ajax({
		url: url + mode + idMovie + key,
		dataType: 'jsonp',
		success: function(data){
			console.log(data);
			console.log("<img srt=\"" + base_url + data.backdrop_path + "\">");

			movieTitle = data.original_title;

			duration = data.runtime;
			$('#articles').append("<div class='articleBox'>");
			//$('#articles').append("<p>" + movieTitle + "'s runtime: " + duration +"min" + "</p>");
			//$('#articles').append("<img src=\"" + base_url + data.backdrop_path + "\">");
			$('#articles').append("</div>");

			$('#articles').css({
				"color": "white"
			});

			$('body').css({
				"background-image": "url(\"" + base_url + data.backdrop_path + "\")",
				"color": "white"
			});
			getFoodID();
		}
	});

}



function getFoodID(){
	var url = 'https://api.nutritionix.com/v1_1/',
		search = 'search/',
		appId = '&appId=8b31d27c',
		appKey = '&appKey=b5233afaf66b388e0b1b0d5a1973a738',
		setUp = 'results=0%3A10&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id';


	var input = $('#food').val(),
		foodName = encodeURI(input);

	$.ajax({
		url: url + search + foodName + '?' + setUp + appId + appKey,
		dataType: 'json',

		error: function(data){
			console.log("Something wrong!");
		},
		success: function(data){
			console.log(data);

			idFood = data.hits[0]._id;
			nameFood = data.hits[0].fields.brand_name + "'s " + data.hits[0].fields.item_name;

			console.log(idFood + nameFood);


			getNutrition();
		}
	});

	
}


function getNutrition(){
	var url = 'https://api.nutritionix.com/v1_1/',
		item = 'item?',
		appId = '&appId=8b31d27c',
		appKey = '&appKey=b5233afaf66b388e0b1b0d5a1973a738';

	// nutrition search
	$.ajax({
		url: url + item + 'id=' + idFood + appId + appKey,
		dataType: 'json',

		error: function(data){
			console.log("Something wrong!");
		},
		success: function(data){
			console.log(data);

			// calories = data.nf_calories;
			// servingSize = data.nf_serving_size_qty;
			if(data.nf_serving_size_unit !== null){
				servingSizeUnit = data.nf_serving_size_unit;
			}

			if(data.nf_serving_size_qty !== null){
				calories = data.nf_calories / data.nf_serving_size_qty;
			} else {
				calories = data.nf_calories;
			}

			// $('#articles').append("<div class='articleBox'>");
			// //$('#articles').append("<p>" + nameFood + "'s calories: " + calories + " per 1 " + servingSizeUnit + "</p>");
			// $('#articles').append("</div>");

			calculateEat();
		}
	});
}


function caloriesSetUp(){

	$('#jog').click(function(){
		exerciseType = 363;
		exerciseTypeText = "jog in water";
	});

	$('#saw').click(function(){
		exerciseType = 318;
		exerciseTypeText = "saw trees";
	});

	$('#fish').click(function(){
		exerciseType = 114;
		exerciseTypeText = "fish";
	});
	
	$('#dance').click(function(){
		exerciseType = 205;
		exerciseTypeText = "dance ballet";
	});


	// unit set-up
	$('#kgButton').click(function(){
		weightUnit = "kg";
	});

	$('#lbsButton').click(function(){
		weightUnit = "lbs";
	});

}

function caloriesBurn(){

	var input = $('#weight').val();
	if (weightUnit == "lbs") {
		caloriesExercise = exerciseType / 100 * input;
	} else {
		caloriesExercise = exerciseType / 100 * (input*2.20462);
	}

	return caloriesExercise;
}


function calculateEat(){

	caloriesBurn();

	// how many calories it will burn after exercising
	caloriesBurnAfterExersice = caloriesExercise / 60 * duration;

	// for certain calories, how many I can eat(per 1 serving size)
	amountToEat = caloriesBurnAfterExersice / calories;
	amountToEat = Math.round( amountToEat *10)/10;


	console.log(amountToEat);

	$('#articles2').append("<div class='articleBox'>");
	if(servingSizeUnit !== null){
		$('#articles2').append("<p>During <b>" + movieTitle + "</b>, if you <b>" + exerciseTypeText + "</b> all the way through it, you can eat <b>" + amountToEat + "</b> " + servingSizeUnit + " of " + nameFood + " without worrying gaining any weights!</p>");
	} else {
		$('#articles2').append("<p>During <b>" + movieTitle + "</b>, if you <b>" + exerciseTypeText + "</b> all the way through it, you can eat <b>" + amountToEat + "</b> " + nameFood + " without worrying gaining any weights!</p>");
	}
	$('#articles2').append("<p><b>Calories burnnnnnn.</b></p>");
	// $('#articles').append("<img src=\"" + base_url + data.backdrop_path + "\">");
	$('#articles2').append("</div>");
}





$(document).ready(function(){
	var url = 'https://api.themoviedb.org/3/',
		mode = 'search/movie',
		input,
		movieName,
		//var url = "https://api.themoviedb.org/3/movie/550?api_key=";
		key = '?api_key=07c77f21aa08756c2719275432259622';

	caloriesSetUp();

	$('#searchButton').click(function(){
		var input = $('#movie').val(),
			movieName = encodeURI(input);

		$.ajax({
			url: url + mode + key + '&query=' + movieName,
			dataType: 'jsonp',
			success: function(data){
				console.log(data);

				idMovie = data.results[0].id;

				getDuration();
				
				
			}
		});

	});

});