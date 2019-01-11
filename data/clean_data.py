import pandas as pd

# source of dataset:(https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results)

INPUT_CSV = "athlete_events.csv"
OUTPUT_JSON = "summer.json"

# Reading only usable columns from CSV
df = pd.read_csv(INPUT_CSV, usecols=["ID", "Sex", "Age", "Year",
                                     "Team", "NOC", "Season",
                                     "Sport", "Event",
                                     "Medal"], na_values=[''])

# Selecting only the rows needed
df_gold = df.loc[df["Medal"].isin(["Gold", "Silver", "Bronze"])]
df_summer = df_gold.loc[df["Season"] == "Summer"]

df_sort = df_summer.stack().reset_index().set_index(["Year",
                                                                    "Team",
                                                                    "Medal",
                                                                    "Event",
                                                                    "Athlete"]).sort_index()

print(df_sort)
# Convert all data to JSON file
# df_summer.to_json(OUTPUT_JSON, orient="index")
