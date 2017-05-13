import csv
from colour import Color

with open('light_patterns/sim.csv') as infile:
    with open('light_patterns/sim2.csv', 'w') as outfile:
        count = 1
        for line in csv.reader(infile):

            _time, _colors = line[0], line[1:]
            print _time

            new_colors = []
            if _time != 'time_ms':
                count += 1
                for color in _colors:
                    meow = Color("#"+color[2:])
                    new_colors.extend(list(meow.rgb))

            newline = []
            newline.extend([str(float(x)) for x in new_colors])
            outfile.write(",".join(newline) + "\n")
