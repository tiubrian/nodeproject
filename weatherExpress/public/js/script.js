$(document).ready(function(){

	function update(){
		alert('hey');
	}

//	$("#cityfield").keyup(function() {
  	$('#button').click(function() {      
        var str = $('#cityfield').val();
        if (str != "") {
			str = str.toLowerCase().trim();
			strArr = str.split(" ");
			for (var i = 0; i < strArr.length; i++) {
				strArr[i] = strArr[i][0].toUpperCase() + strArr[i].substr(1);
			}
			str = strArr.join(" ");
		}

        $.getJSON("/getcity?q="+str, function(data) {
	    	var everything = "";
	    	$.each(data, function(i, item) {
	    		if (data[i].city != 'undefined'){
	      		everything += "<li class='list-group-item suggestion'> "+data[i].city;+"</li>"
	      	}
	    	});
	    	$("#suggestion_list").html(everything);
	    })
	    .done(function() { 
	    	console.log('Success'); 
	    })
	    .fail(function(jqXHR, textStatus, errorThrown) { 
	    	console.log('JSON request failed!' + textStatus); 
	    	console.log("Response text: " + jqXHR.responseText);
	    })
	    .always(function() { 
	    	console.log('JSON request finished');
	    })
	    .complete(function() { 
	    	console.log("Completed JSON request"); 
		});

    });
/*
    $("#button").click(function(e){
		
		var value = $("#cityfield").val();
		value = value.toLowerCase().trim();
		pieces = value.split(" ");
		for (var i = 0; i < strArr.length; i++) {
			pieces[i] = pieces[i][0].toUpperCase() + pieces[i].substr(1);
		}
		value = pieces.join(" ");
		$("#city").text(value);
		
		e.preventDefault();

		var list = $("#suggestion_list li");
		for (var i = 0; i < list.length; i++) {
			if (list[i].innerHTML.trim() != value) {
				list[i].style.display = "none";
			}
		}

		var theurl= "https://api.wunderground.com/api/2fbe9dd598f2cfba/geolookup/conditions/q/UT/";
		theurl += value;
		theurl += ".json";
		console.log(theurl);
		
		$.ajax({
		  	url : theurl,
		  	dataType : "jsonp",
		  	success : function(data) {
		    	var location = data['location']['city'];
		    	var temp_string = data['current_observation']['temperature_string'];
		    	var current_weather = data['current_observation']['weather'];
		    	var icon = data['current_observation']['icon_url'];
		    	everything = "<ul style='padding-left: 0;'>";
		    	everything += "<li>Location: " + location;
		    	everything += "<li>Temperature: " + temp_string;
		    	everything += "<li>Weather: " + current_weather;
		    	everything += "</ul>";
		    	everything += "<img src='" + icon + "'/>";
		    	$("#weather").html(everything);
	  		}
		});

	});*/

});
