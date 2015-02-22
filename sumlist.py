import sys

input = raw_input("Ask user for something.")
numlist = input.split(',')

totalSum = 0
for numStr in numlist:
	totalSum += int(numStr)
	print( totalSum), 
	print(','),

