import xml.etree.ElementTree as ET
# -*- coding: utf-8 -*-

filename = "SIMC_Urzedowy_2021-04-07.xml"
tree = ET.parse(filename)
root = tree.getroot()


rows = root.findall('.//row')

# Array for places
places = []


for row in rows:
    place = row.find("NAZWA").text
    if place not in places:
        places.append(place)
        print(place)

# Erase content of places.sql file
open('places.sql', 'w').close()


with open('places.sql', 'a', encoding='utf8') as fd:
    for place in places:
        item = f"""INSERT INTO tour_places (place) VALUES ("{place}"); \n"""
        fd.write(item)

