//1. Vid pageload: Hitta feed, skapa upp objekt med all data för varje nyhet, lägg i array och kör generateHome('dataObjArray')


//2. Då användaren valt en kategori: radera data från homeView (removeContent('homeView')), generera och visa listView


//3. Då användaren klickar på en nyhet från listView: radera data i list (removeContent('listView')), ladda detail view (generateDetail('dataObj')), hämta nya viewen (showView('detailView'))

var dataObjArray = [];


function listCategory(category){
      showView('listView');
      loadCategory(category);

}

function listDetails(newsNumber){
      showView('detailView');
      loadDetails(newsNumber);
}

//Generates the detail view by adding content to the divs
function loadDetails(newsNumber) {
	var image = document.getElementById('imageDiv');
	var title = document.getElementById('titleDiv');
	var date = document.getElementById('dateDiv');
   var link = document.getElementById('linkDiv');
   var category = document.getElementById('categoryDetail');

	console.log(title+ " details: "+newsNumber);
	image.innerHTML = "<img class='img-responsive' class ='img-rounded' src="+dataObjArray[newsNumber].image+" alt='Chania' width='460' height='345'>";
	category.innerHTML = "<h2>About <b><sub id = 'headerCategory'>"+dataObjArray[newsNumber].category+"</sub></b></h2>";
	title.innerHTML = "<h4>"+dataObjArray[newsNumber].title+"</h4>";
	date.innerHTML = dataObjArray[newsNumber].pubDate;
   link.innerHTML = "<h4><a href = "+dataObjArray[newsNumber].link+">Go to page of article</a></h4>";
}



//Function that loads and displays a list of the
//news in a given category
function loadCategory(category){
            
      dataObjArray = []; //clean

      var title;
      var pubDate; 
      var link;
      var image;

      var title = document.getElementById('categoryTitle'); 
      title.innerHTML = "<h2>News from <b><sub id = 'headerCategory'>"+category+"</sub></b></h2>";

      var feed = new google.feeds.Feed('http://www.rendip.com/c/'+category+'/rss');
      feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
      feed.setNumEntries(20);
      feed.load(function(result) {
        if (!result.error) {
          var container = document.getElementById("feed");				//TODO
        //  for (var i = 0; i < result.feed.entries.length; i++) {	//Loop in the other direction to get the news in order by date
		    for (var i = result.feed.entries.length-1; i >= 0; i--) {	            
				var entry = result.feed.entries[i];
               title = entry.title;
               pubDate = entry.publishedDate;
               var tmp = pubDate.split(" ");
               pubDate = tmp[0] +" "+ tmp[1] +" "+ tmp[2] +" "+ tmp[3];
               link = entry.link;
               var mediaEntries = entry.xmlNode.getElementsByTagNameNS('*','thumbnail');
                   for (var j = 0; j < mediaEntries.length; j++) {
                    image = mediaEntries[j].attributes.getNamedItem('url').value
              }
            
            //Store the news as an object
            dataObjArray.push({title : title, pubDate : pubDate, link: link, category: category, image: image});  
				//dataObjArray.reverse();
            //Display the news to the listView
				var tmp = (result.feed.entries.length-1)-i;
				console.log(title+ " number: "+tmp);
            $("tbody").prepend("<tr><th onclick = listDetails("+tmp+")>"+title+"</th><th>"+pubDate+"</th></tr>");
          }
	
        }
      });
}

//Toggle between the different views
	function showView(goto) {
		var views = document.getElementsByClassName('views');
		for (var i=0; i < views.length; i++) {
			views[i].style.display = 'none';
			}
		var next = document.getElementById(goto);
		next.style.display = 'block';
	}

