from flask import Flask, render_template, request
import json 
from flask_sqlalchemy 
import mysql.connector
import sqllite3 



thisdict =	{
  1: "Minimizing food loss and wastage",
  2: "Eating more plant-based foods and fewer animal proteinsand products",
  3: "Composting Converting biodegradable waste",
  4: "Adding trees",
  5: "Regenerative agriculture practice",
  6: "Restoring degraded, abandoned farmland",
  7: "Driving Eletric Vehicle",
  8: "Using ride-sharing services",
  9: "Using Public Transportation", 
  10: "Using video-conferencing technologies in place ofcommercial flights",
  11: "Driving hybrid cars",
  12: "Biking to destinations",
  13: "Walking to destinations",
  14: "Using electric bikes",
  15: "Installing rooftop solar panals",
  16: "Using energy efficient lighting in households",
  17: "Using water saving devices in homes such as low-flow showerheads",
  18: "Using smart thermostats",
  19: "Household recycling",
  20: "Turn off lights when leaving home",
  21: "Recylce Waste"
  22: "Use Reusable Bags"
  23: "Turn off faucet while washing teeth",
  24: "Use reuseable water bottle"
  25: "Use Rechargeable batteries"
  26: "Wash clothes with cold water"
}

mydb = sqllite3.connect('local.db')
cursor = mydb.cursor()
app = Flask(__name__)


def register():

	if request.method == 'POST':
		user = request.json
		username = user['username']
		school = user['school']
		




@app.route('/dashboard', methods=['GET', 'POST'])
def login():
	#list of dictionaries to return 
	dictionaryList = []
	#the return will go into here
	returnJSON = {}
	
	if request.method == 'POST':
		
		user = request.json 
		username = user['username']
		cursor.execute('SELECT (%s) FROM STUDENTS', username)

		if cursor.fetchone():
			
			#gets student ID, total points and school name
			cursor.execute('SELECT ID, POINTS, SCHOOL FROM STUDENTS WHERE USERNAME = (%s)',username)
			query = cursor.fetchone()
			studentID = query[0]
			totalPoints = query[1]
			school = query[2]
			tasks = []

			#gets the tasks done by student & points 
			cursor.execute('SELECT KEYWORD FROM STUDENTTASK WHERE ID = (%s)', studentID)
			keywords = cursor.fetch()

			for word in keywords:
				cursor.execute('SELECT TASKDESCRIP, TASKPOINT FROM STUDENTTASK WHERE KEYWORD = (%s)',word)
				tasks.append(cursor.fetchone())

			
			for task in tasks:
				#the dictionaries that will be turned into jsons
				dictionary = {}
				#this will give name of the thing
				item = thisdict[(stuff[0])] 
				#this will give description of item
				itemDescrip = thisdict[item]['description']
				#this will add to return dictionary 
				dictionary.update('itemID': stuff[0])
				dictionary.update('itemName': )
				dictionary.update('itemPoint': stuff[1])

				dictionaryList.append(dictionary)

			returnJSON.update('totalPoints' = totalPoints)
			returnJSON.update('items' = json.dumps(dictionaryList))
			returnJSON.update('school'= school)

			return returnJSON

		else():
			return("Invalid Username")






app.run()
		


# @app.route('/addStuff', ['GET', 'POST'])
# def addStuff():
# 	# mydb = mysql.connector.connect(host=, username=,password=)
# 	if request.method == 'POST':
# 		item = request.json 




