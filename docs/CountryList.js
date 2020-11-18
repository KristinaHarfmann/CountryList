function Prompt() {
	$("#dialog-form").dialog({
		autoOpen: true,
		modal: true,
		width: "360px",
		buttons: {
			"Ok": function() {
				var prompt_input = $("#prompt_input");
				Find(prompt_input.val());
				$(this).dialog("close");
			},
			"Cancel": function() {
				$(this).dialog("close");
			}
		}
	});
}//make a prompt for input


function Find(end_loc) {
	list = ["USA", "MEX", "GTM", "HND", "NIC", "CRI", "PAN"];
	data = [];//array of the path

	if(end_loc == "CAN"){
		data = ["USA"];
	}else if(end_loc == "BLZ"){
		data = ["USA", "MEX"];
	}else if(end_loc == "SLV"){
		data = ["USA", "MEX", "GTM"];
	}else{
		i = 0;
		while(list[i] != end_loc){
			data.push(list[i]);
			i = i + 1
		}
	}
	data.push(end_loc);

	var table = document.getElementById("table");//get the table in document
	var tbody = document.createElement("tbody");//create the body of the table
	table.appendChild(tbody);//add body to table in document
	data.forEach(function(item) {
	  var row = document.createElement("tr");//create row
		var cell = document.createElement("td");//create table data
		var img = document.createElement('img');//create image
		img.src = "../CountryList/images/" + item +".png";//get image from files
		img.style.width = "30px";
		img.style.height = "15px";

		cell.textContent = item;//add item name to table data
		cell.appendChild(img);//add img to same table data
		row.appendChild(cell);//add complete data to row
	  tbody.appendChild(row);//add each row to the body
	});

	var regions = [['Country'],['United States']];//array of path with complete country names
	for(i = 0; i < data.length; i++){
		if(data[i] == "MEX"){
			regions.push( ['Mexico']);
		}else if(data[i] == "GTM"){
			regions.push( ['Guatemala']);
		}else if(data[i] == "BLZ"){
			regions.push( ['Belize']);
		}else if(data[i] == "SLV"){
			regions.push( ['El Salvador']);
		}else if(data[i] == "HND"){
			regions.push( ['Honduras']);
		}else if(data[i] == "NIC"){
			regions.push( ['Nicaragua']);
		}else if(data[i] == "CRI"){
			regions.push( ['Costa Rica']);
		}else if(data[i] == "PAN"){
			regions.push( ['Panama']);
		}else if(data[i] == "CAN"){
			regions.push( ['Canada']);
		}
	}

	var test = google.visualization.arrayToDataTable(regions);//turn the complete country names array to table

	var options = {
		backgroundColor: '#61ccfa',
		datalessRegionColor: '#ffffff',
    	defaultColor: '#f52222',
      	region: '019'
	};//style for the chart

	var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));//make chart in documents

	chart.draw(test, options);//draw the chart
}

//load the map
google.charts.load('current', {
	'packages':['geochart'],
	'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});
