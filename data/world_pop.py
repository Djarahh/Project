import pandas as pd

# source of dataset:(https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results)

INPUT_CSV = "population_per_country.csv"
OUTPUT_JSON = "world_pop.json"

# Reading only Date, sex, age, from CSV
# df = pd.read_csv(INPUT_CSV)
# print(df)
df = pd.read_csv(INPUT_CSV, usecols=["Country Name", "Country Code",
                                     "1960", "1964", "1968", "1972",
                                     "1976", "1980", "1984", "1988",
                                     "1992", "1996", "2000", "2004",
                                     "2008", "2012", "2016"],
                 na_values=[''])

# Convert all data to JSON file
df.to_json(OUTPUT_JSON, orient="index")
