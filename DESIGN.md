# Project Design
120 years of Olympic history

## List of data sources:
- The first source comes from the platform Kaggle, and is the main source I'll be using for the visualisation. [link to data athletes history](https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results).
This csv file (athletes_events.csv) has been preprocessed by a file called clean_data.py into a JSON file (summer.json, containing only the data from the olympic summer games). Pandas were used to preprocess the data from the csv file.

- I am not yet sure how I will be using the [dataset world population](https://data.worldbank.org/indicator/SP.POP.TOTL) in the visualisation. But if I am going to use it I will only be utilizing the data I need from the years that the games were played 1896 to 2016. There however exists no data regarding the population before 1960, so I might narrow down the data I will use from other datasets. The preprocessing of data was again done with pandas done by a file called world_pop.py.

## Diagram with the overview of technical components:
![diagram link](/doc/designdata.jpg)
One html page that contains three linked views, an interactive world map bubble chart, a interactive sunburst and a steam graph.
### The world map
This map will be interactive in two ways:
1. The year of each olympic game can be selected with a slider. Depending on what year is given as input, the world map (including their bubbles which represent the amount of medals won in that year) will be updated accordingly.
2. If you click on a bubble, you will see the details from that country in the next linked view.

### The interactive sunburst
If a bubble on a country is clicked, the interactive sunburst will appear, with three layers: the inner circle will be the amount of gold, silver and bronze medals. If clicked on one of these layers, you will see the sports that won medals in that category.If clicked on one of these sports the next visualisation will appear, and the atlethes that have won a medal in that sport will appear.

### The steam graph
This graph will show you one particular sport and what country has been the best at that sport in particular. If you hoover over the country in the map will highlight.


## List of D3 plugins:
- d3-geo-projection - extended geographic projections
- d3-scale-chromatic - color schmes derived from ColorBrewer
