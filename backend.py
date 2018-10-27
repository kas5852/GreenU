from flask import Flask, request, jsonify
import sqlite3
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/register', methods=['GET', 'POST'])
def register():
    mydb = sqlite3.connect('CodeForGood.db')
    cursor = mydb.cursor()
    returnJSON = {}
    if request.method == 'POST':
        user = request.json
        email = user['email']
        name = user['name']
        school = user['school']

        cursor.execute('SELECT EMAIL FROM STUDENTS WHERE email=?', (email,))

        if cursor.fetchone():
            return "User already exist :("
        else:
            cursor.execute('INSERT INTO STUDENTS (ID, EMAIL, NAME, SCHOOL, POINTS) VALUES (NULL, ?, ?, ?, 0)', (email, name, school,))
            d1 = {'totalPoints': 0}
            d2 = {'items': {}}
            d3 = {'school': school}
            returnJSON.update(d1)
            returnJSON.update(d2)
            returnJSON.update(d3)
            mydb.commit()
            return jsonify(returnJSON)


@app.route('/dashboard', methods=['GET', 'POST'])
def login():
    mydb = sqlite3.connect('CodeForGood.db')
    cursor = mydb.cursor()
    # list of dictionaries to return
    dictionaryList = []
    # the return will go into here
    returnJSON = {}
    
    if request.method == 'POST':
        
        user = request.json 
        email = user['email']
        cursor.execute('SELECT ? FROM STUDENTS', (email,))

        if cursor.fetchone():

            # gets student ID, total points and school name

            cursor.execute("SELECT ID, POINTS, SCHOOL,NAME FROM STUDENTS WHERE EMAIL = ?", (email,))
            query = cursor.fetchone()
            if query:
                studentID = query[0]
                totalPoints = query[1]
                school = query[2]
                name = query[3]

                tasks = []

                # gets the tasks done by student & points
                cursor.execute("SELECT KEYWORD FROM STUDENTTASKS WHERE ID = ?", (studentID,))
                keywords = cursor.fetchall()
                if keywords:
                    for word in keywords:
                        cursor.execute("SELECT TASKDESC, POINTVALUE FROM TASKSIDS WHERE KEYWORD = ?", (word[0],))
                        tasks.append(cursor.fetchall())

                    for counter, task in enumerate(tasks):
                        # the dictionaries that will be turned into jsons
                        dictionary = {}
                        # this will give name of the thing
                        item = keywords[counter][0]
                        # this will give description of item
                        itemDescrip = task[0][0]
                        # this will add to return dictionary

                        d1 = {'itemID': item}
                        d2 = {'itemDescrip': itemDescrip}
                        d3 = {'itemPoint': task[0][1]}
                        dictionary.update(d1)
                        dictionary.update(d2)
                        dictionary.update(d3)

                        dictionaryList.append(dictionary)

                    d1 = {'totalPoints': str(totalPoints)}
                    d2 = {'items': (dictionaryList)}
                    d3 = {'school': school}
                    d4 = {'name': name}

                    cursor.execute('SELECT sum(points) AS score, school FROM students WHERE SCHOOL = ?', (school,))
                    query = cursor.fetchone()

                    returnJSON.update(d1)
                    returnJSON.update(d2)
                    returnJSON.update(d3)
                    returnJSON.update(d4)
                    returnJSON["universityPoints"] = query[0]

                    return jsonify(returnJSON)

                else:
                    d1 = {'totalPoints': str(0)}
                    d3 = {'school': school}
                    returnJSON.update(d1)
                    returnJSON.update({})
                    returnJSON.update(d3)
                    return jsonify(returnJSON)

            else:
                return "Student info was empty for some reason"

        else:
            return "Invalid Username"


@app.route('/leaderboard', methods=['GET', 'POST'])
def leaderboard():
    mydb = sqlite3.connect('CodeForGood.db')
    cursor = mydb.cursor()
    #list of dictionaries to return 
    dictionaryList = []
    #the return will go into here
    returnJSON = {}
    
    if request.method == 'POST':
        cursor.execute('SELECT sum(points) as score, school from students group by school order by score desc')
        query = cursor.fetchall()
        for school in query: 
            dictionary = {}
            d1 = {'score': school[0]}
            d2 = {'school': school[1]}
            dictionary.update(d1)
            dictionary.update(d2)
            dictionaryList.append(dictionary)

        for dictate in dictionaryList:
            returnJSON.update(dictate)
        
        return jsonify(dictionaryList)


@app.route('/schoolPoints', methods=['POST'])
def school():
    mydb = sqlite3.connect('CodeForGood.db')
    cursor = mydb.cursor()
    cursor.execute('SELECT sum(points) AS score, school FROM students WHERE SCHOOL = ?', (request.json["school"],))
    query = cursor.fetchone()
    return json.dumps(query)


@app.route('/addTask', methods=['GET', 'POST'])
def add():
	mydb = sqlite3.connect('CodeForGood.db')
	cursor = mydb.cursor()
	returnJSON = {}
	if request.method == 'POST':
		
		user = request.json
		email = user['email']
		
		keyword = user['keyword']

		cursor.execute('SELECT POINTVALUE FROM TASKSIDS WHERE KEYWORD=?', (keyword,))
		value = cursor.fetchone()

		if value:

			cursor.execute('SELECT ID, POINTS, SCHOOL FROM STUDENTS WHERE EMAIL = ?', (email,))
			query = cursor.fetchone()
			studentID = query[0]
			totalPoints = int(value[0]) + int(query[1])
			school = query[2]

			cursor.execute('INSERT INTO STUDENTTASKS (ID, KEYWORD) VALUES (?,?)', (studentID, keyword,))
			cursor.execute('UPDATE STUDENTS SET POINTS = ? WHERE ID = studentID', (totalPoints,))
			d1 = {'totalPoints': totalPoints}
			d2 = {'items': keyword}
			d3 = {'school': school}
			returnJSON.update(d1)
			returnJSON.update(d2)
			returnJSON.update(d3)
			mydb.commit()
			return jsonify(returnJSON)
			
		else:
			return("wrong keyword")
			


@app.route('/getUni', methods=['GET', 'POST'])
def getUni():
	mydb = sqlite3.connect('CodeForGood.db')
	cursor = mydb.cursor()
	returnJSON = {}
	dictionaryList = []
	if request.method == 'POST':
		user = request.json
		school = user['school']

		cursor.execute('SELECT ID, NAME, POINTS FROM STUDENTS WHERE SCHOOL = ? order by points desc',(school,))
		query = cursor.fetchall()

		for student in query: 
			dictionary = {}
			d1 = {'score': student[2]}
			d2 = {'name': student[1]}
			d3 = {'student': student[0]}
			dictionary.update(d1)
			dictionary.update(d2)
			dictionaryList.append(dictionary)

		return jsonify(dictionaryList)

app.run(debug=True)





