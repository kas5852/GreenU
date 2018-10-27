from flask import Flask, render_template, request
import json 
from flask_sqlalchemy 
import mysql.connector
import sqllite3 




app = Flask(__name__)

@app.route('/dashboard', methods=['GET', 'POST'])
def login():
	dictonary = {}
	mydb = sqllite3.connect('local.db')
	cursor = mydb.cursor()
	if request.method == 'POST':
		user = request.json 
		username = user['username']
		cursor.execute('SELECT (%s) FROM STUDENTS')

		if(cursor.fetchone()):
			cursor.execute('SELECT ID, POINTS WHERE USERNAME = (%s) FROM STUDENTS',username)
			query = cursor.fetchone()
			studentID = query[0]
			totalPoints = query[1]

			cursor.execute('SELECT TASKS WHERE ID = (%s)', studentID)
			tasks = cursor.fetchone()

			for stuff in tasks:



sampleJSONForLogin = {
	'totalPoints' = int
	'items' = [(int(itemID), str(itemName), int(itemPoint))]
	'school' = str(school)
}





app.run()
		


# @app.route('/addStuff', ['GET', 'POST'])
# def addStuff():
# 	# mydb = mysql.connector.connect(host=, username=,password=)
# 	if request.method == 'POST':
# 		item = request.json 




