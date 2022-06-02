

# GraphCache
This dir contains a stringified JSON of Panda's strava social data. 

This file is very large, but only contains a few percent of his connections. I initially intended to collect all of Panda's friends of friends. After getting a few tens of friends of friends, there were already over 10k athletes, and the in memory object was over 3 MB. 

I would need to setup a DB to track profiles and friends to properly save all the data. This is also wasy too much data to present in a friend end
UI, so I cut the data collection short here. This doc is a good future ref if you need to work through panda's social data again.