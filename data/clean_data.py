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
        json[line[9]][line[6].split('-')[0]] = {'Medal': {'Gold': {},
                                                          'Silver': {},
                                                          'Bronze': {},
                                                          },
                                                'Total': 0
                                                }
    input_file.seek(0)
    next(lines)
    for line in lines:
        medal = line[14]
        sport = line[12]
        athlete = (line[1], line[13])
        # event = line[13]
        if medal == "NA":
            continue
        if sport not in json[line[9]][line[6].split('-')[0]]['Medal'][medal]:
            json[line[9]][line[6].split('-')[0]]['Medal'][medal][sport] = []
        json[line[9]][line[6].split('-')[0]]['Medal'][medal][sport].append(athlete)
        json[line[9]][line[6].split('-')[0]]['Total'] = json[line[9]][line[6].split('-')[0]]['Total'] + 1


print(json['1920']['Finland']['Medal'])
with open("pretty_json.json", 'w') as output_file:
    jsonner.dump(json, output_file, indent=2)
