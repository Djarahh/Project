# Day 2 (Wednesday 9-1-2019)
Today I started working on my bubble map. I found out that I needed an extra data set with the longitude and latitude of the centre of all the countries in the world. I found one on the following website (http://worldmap.harvard.edu/data/geonode:country_centroids_az8). For the steamgraph I found some code on the following website and made it work on mine. Just not yet with my own data. (https://bl.ocks.org/john-guerra/f898333fb41d69978945d315e7b7980c).
I talked to a TA and we figuered that I should change the format of my data the CSV to a nested JSON. I have not figuered out how to do this yet.

# Day 3 (Thursday 10-1-2019)
I was absent This day due to illness, I did not do anything.

# Day 4 (Friday 11-1-2019)
Today I am going to work on my dataset so I can work with it more easy. After half a day of struggeling I Have finally put my JSON file into the right format in the order of Year -> Countries -> Medals -> Sports and Athletes. Now I am going to make the world map that that is colour dependent on the amount of medals won in a year. I am going to use the year 2016 as reference as it was the year with the most sports and therefore medals won. Furthermore, I have changed my plan to use a map instead of a bubble map (as I forsee lots of difficulties with them).
I asked a question on how to format my nested json file and I have finally figuered out how. I now have a map with colours and the data in each country how many medals there are. After I put in a legend I can now continue with the next visualisations.


# Day 5 (Monday 14-11-2019)
Today I will fix the legend and the colour of the boundries in the map. Also a legend will be made. Furthermore I would like to have the interactivity of the slider and the worldmap fixedd. Then I will start working on the sunburst. The following site gives a step by step tutorial to draw a sunburst. (https://bl.ocks.org/denjn5/e1cdbbe586ac31747b4a304f8f86efa5)
I fixed the world map transitions in combination with the slider. I have had some difficulties with the data that was represented in the map (tooltip did not show the data I had selected with the silder, only the initial data I loaded into the function). Now I will start on the sunburst.
The sunburst tutorial is helping understand the way I should programm the graph, however I found out that I should reformat my data again --> The data should be formatted as follows:
A list of dictionaries that each have a name. So there should be a list medal dictionaries, that contains a list of sports dictionaries, containing a dictionary of athletes. I just do not know how I should be implementing this yet. At this point I have a dictionary of medals, with a dictionary of sports, with a list of sporters and events.

# Day 6 (Tuesday 15-11-2019)
Today I am trying to format my data into the right format for the sunburst. And I have finally managed to create a dictionary in a list in a list of dictionaries etc. It was then pretty easy to create a sunburst with the data in the right format. However, the colours are not yet applicable. Also, the chart doesn't update yet, it creates a new sunburst with every click on a country. I dont know if I can make the sunburst appear and update afterwards, as it does't exist in the initial page. This is a question I will ask tomorrow. I have figuered out how to give certain colors to a specific catagory.
Today I also found out that for the years in which there is no data available (such as 1940 due to the world war), there are still errors coming up. This is something that I will fix tomorrow.

# Day 7 (Wednesday 16-11-2019)
Today I managed to get the on click function (with the right data into the sunburst) working. I also coloured all the layers of the sunburst. I choose these colours (per layer) randomly so there could be differentiated between the different layers more easily. Furthermore, the on click function now also works for the the steam graph with the appropriate data. The tooltip just doesn't work for the sunburst.

# Day 8 (Thursay 17-1-2019)
