//1. Vid pageload: Hitta feed, skapa upp objekt med all data för varje nyhet, lägg i array och kör generateHome('dataObjArray')
//2. Då användaren valt en kategori: radera data från homeView (removeContent('homeView')), generera och visa listView
//3. Då användaren klickar på en nyhet från listView: radera data i list (removeContent('listView')), ladda detail view (generateDetail('dataObj')), hämta nya viewen (showView('detailView'))




//Creates the home view and all the categories presented from the feed, parameter is dataObjArray
function generateHome(){

dataObjArray = [{image:"some image", category:"movies", title:"a title", description:"a description", author:"an author", date:"16/4"}, {category: '2'}, {category:'3'}];

	var categoryArray = [];
	for (var i = 0; i<dataObjArray.length; i++) {
		categoryArray.push(dataObjArray[i].category);
	}


		home = document.getElementById('homeView');
		catDiv = document.createElement('div');
		catDiv.setAttribute('id', 'catDiv');
		home.appendChild(catDiv);
		for (var i = 0; i<categoryArray.length; i++) {
			var newCategory = document.createElement('button');
			newCategory.setAttribute("class", "btn btn-primary");
			newCategory.setAttribute("onClick", "generateList('" + categoryArray[i] + "')");
			newCategory.innerHTML = categoryArray[i];
			catDiv.appendChild(newCategory);
	}
	}
//Generates the detail view by adding content to the divs, the parameter is an object containg all the data for the news feed
function generateDetail() {
	dataObj = {image:"some image", category:"movies", title:"a title", description:"a description", author:"an author", date:"16/4"};
	image = document.getElementById('imageDiv');
	category = document.getElementById('categoryDiv');
	title = document.getElementById('titleDiv');
	description = document.getElementById('descriptionDiv');
	author = document.getElementById('authorDiv');
	date = document.getElementById('dateDiv');

	image.innerHTML = dataObj.image;
	category.innerHTML = dataObj.category;
	title.innerHTML = dataObj.title;
	description.innerHTML = dataObj.description;
	author.innerHTML = dataObj.author;
	date.innerHTML = dataObj.date;
}


//Removes content from the views
function removeContent(view){
	if (view == 'homeView'){
			$('#catDiv').remove()
	}
	else if (view == 'listView'){
		alert('hej');
	}
	else if (view == 'detailView'){
		$('#imageDiv').empty();
		$('#categoryDiv').empty();
		$('#titleDiv').empty();
		$('#descriptionDiv').empty();
		$('#authorDiv').empty();
		$('#dateDiv').empty();
		
	}
}
//Toggle between the different views
	function showView(goto) {
		var views = document.getElementsByClassName('views');
		for (var i=0; i < views.length; i++) {
			views[i].style.display = 'none';
			}
		var next = document.getElementById(goto);
		next.style.display = "block";
		if (goto == 'homeView') {
			generateHome(categories);

		}
		if (goto == 'detailView') {
			generateDetail();
		}
	}