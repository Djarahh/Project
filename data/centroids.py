import pandas as pd

# source of dataset:(https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results)

INPUT_CSV = "country_centroids (1).csv"
OUTPUT_JSON = "centroids.json"

# Reading only Date, sex, age, from CSV
df = pd.read_csv(INPUT_CSV, usecols=["country", "latitude", "longitude",
                                     "name"], na_values=[''])

# # Changing data to make it usable
# df_gold = df.loc[df["Medal"].isin(["Gold", "Silver", "Bronze"])]
# df_summer = df_gold.loc[df["Season"] == "Summer"]

# Convert all data to JSON file
df.to_json(OUTPUT_JSON, orient="index")
