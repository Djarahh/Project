import csv
from collections import defaultdict
import pprint
import json as jsonner
print = pprint.pprint
# source of dataset:(https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results)

INPUT_CSV = "athlete_events.csv"
OUTPUT_JSON = "summer.json"

with open(INPUT_CSV, 'r') as input_file:
    json = defaultdict(dict)
    lines = csv.reader(input_file)
    next(lines)
    for line in lines:
        json[line[9]][line[6].split('-')[0]] = {"name": 'Medals',
                                                "children": [{"name": 'Gold', "value": 0},
                                                             {"name": 'Silver', "value": 0},
                                                             {"name": 'Bronze', "value": 0},
                                                             ],
                                                'Total': 0
                                                }
    input_file.seek(0)
    next(lines)
    for line in lines:
        medal = line[14]
        if medal == "Gold":
            number = 0
        elif medal == "Silver":
            number = 1
        elif medal == "Bronze":
            number = 2

        year = line[9]
        country = line[6].split('-')[0]
        sport = line[12]
        athlete = {"name": line[1], "event": line[13], "value": 1}
        # event = line[13]
        if medal == "NA":
            continue

        if "children" not in json[year][country]['children'][number]:
            del json[year][country]['children'][number]["value"]
            json[year][country]['children'][number]["children"] = []

        if len(json[year][country]['children'][number]["children"]) == 0:
            json[year][country]['children'][number]["children"].append({"name": sport, "children": []})
            json[year][country]["children"][number]["children"][0]["children"].append(athlete)
        else:
            list = []
            for i in (json[year][country]['children'][number]["children"]):
                list.append(i["name"])
            if sport not in list:
                json[year][country]['children'][number]["children"].append({"name": sport, "children": []})
                list.append(sport)
            # print(list)
            count = list.index(sport)
            json[year][country]["children"][number]["children"][count]["children"].append(athlete)
            # break
    #     json[year][country]['Medal'][medal][sport] = []
        # json[year][country]['Medal'][medal][sport].append(athlete)
        json[year][country]['Total'] = json[year][country]['Total'] + 1


print(json['1900']['Russia']['children'])
with open("pretty_json.json", 'w') as output_file:
    jsonner.dump(json, output_file, indent=2)
