import csv
import os
import json
from garminconnect import Garmin


# Garmin Connect credentials
email = "username"
password = "password"

# Login to Garmin Connect
try:
    client = Garmin(email, password)
    client.login()
    print("Successfully logged in to Garmin Connect!")
except Exception as e:
    print(f"Error during login: {e}")
    exit()


activities = client.get_activities(0, 1)
activity_id = activities[0]["activityId"]
activity_name = activities[0]["activityName"]


print(f"Extracting data for Activity ID: {activity_id}")


activity_details = client.get_activity_details(activity_id)
json_file = "activity_details.json"
with open(json_file, "w", encoding="utf-8") as f:
    json.dump(activity_details, f, ensure_ascii=False, indent=4)

metric_descriptors = activity_details.get('metricDescriptors', [])
metrics = activity_details.get('activityDetailMetrics', [])
#print(metrics)


fieldnames = []


for descriptor in metric_descriptors:
    fieldnames.append(descriptor['key'])

# Prepare the CSV file
activity_name = "activity"

csv_file = f"{activity_name}_metrics.csv"


os.makedirs("output", exist_ok=True)
csv_file = os.path.join("output", csv_file)


with open(csv_file, mode="w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()


    for i in range(len(metrics)):
        row_data = {}
        for j in range(len(metrics[i].get('metrics'))):

            key = fieldnames[j]
            row_data[key] = metrics[i].get('metrics')[j]
        writer.writerow(row_data)


print(f"Activity data saved to '{csv_file}'")