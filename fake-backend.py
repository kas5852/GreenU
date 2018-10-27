from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
users = []

# given a email, returns the student details
@app.route("/dashboard", methods=["GET", "POST"])
def dashboard():
	if request.method == "POST":
		params = request.get_json(force=True)
		for user in users:
			if user["email"] == params["email"]:
				return jsonify(user)
		return jsonify({"error": "user not found"})
	else:
		return jsonify(users)

# given a email, school, and name registers the user
@app.route("/register", methods=["POST"])
def register():
	params = request.get_json(force=True)
	for user in users:
		if user["email"] == params["email"]:
			return jsonify({"error": "user already exists"})
	user = {"email": params["email"], "name": params["name"], "school": params["school"], "items": [], "score": "0"}
	users.append(user)
	# returns the newly created user
	return jsonify(user)

@app.route("/schools")
def getSchools():
	schools = [
		{
			"name": "Columbia University",
			"rank": 1,
			"score": "20000"
		},
		{
			"name": "University of Texas at Austin",
			"rank": 2,
			"score": "15000"
		},
		{
			"name": "Stevens Institute of Technology",
			"rank": 3,
			"score": "10000"
		},
		{
			"name": "University of Maryland",
			"rank": 4,
			"score": "5000"
		}
	]
	return jsonify(schools)

import names, random
@app.route("/students", methods=["POST"])
def getStudents():
	params = request.get_json(force=True)
	school = params["school"]
	students = []
	for i in range(1, 25):
		student = {"name": names.get_full_name(), "score": str(random.randint(50, 650))}
		students.append(student)
	students.sort(reverse=True, key=(lambda x: x["score"]))
	i = 1
	for student in students:
		student["rank"] = i
		i += 1
	return jsonify(students)
	
if __name__ == "__main__":
	app.run(debug=True)