from flask import Flask,request,abort,render_template
from flask_pymongo import PyMongo
import json
 
app = Flask(__name__)
app.config.from_object("config.DevelopmentConfig")
mongo = PyMongo(app, config_prefix='MONGO')

@app.route('/')
def index():
	return render_template("index.html")

@app.route('/upload', methods = ['POST'])
def upload():
	data = request.form.get("data")
	if data is not None:
		data_list = data.split(",")
		doc = mongo.db.imu.insert({'x':data[0],'y':data[1],'z':data[2]})
		return json.dumps({"status":True})
	else :
		print request.form
		return json.dumps({"status":False})

@app.route('/loadIMUData')
def loadIMUdata():
	traces = []
	opdata = {}
	layout = {}
	psql = mongo.db.imu.find()
	tempx = {}
	tempx['x'] = []
	tempx['y'] = []
	tempy = {}
	tempy['x'] = []
	tempy['y'] = []
	tempz = {}
	tempz['x'] = []
	tempz['y'] = []
	i = 0
	for line in psql:
		i+=1
		tempx['y'].append(line["x"])
		tempy['y'].append(line["x"])
		tempz['y'].append(line["x"])
		tempx['x'].append(i)
		tempy['x'].append(i)
		tempz['x'].append(i)
	tempx['name'] = "X"
	tempx['type'] = 'scatter'
	tempy['name'] = "Y"
	tempy['type'] = 'scatter'
	tempz['name'] = "Z"
	tempz['type'] = 'scatter'
	traces.append(tempx)
	traces.append(tempy)
	traces.append(tempz)
	layout['title'] = "Live IMU Data"
	layout['yaxis'] = {}
 	opdata['traces'] = traces
	opdata['layout'] = layout
	return json.dumps(opdata)

if __name__=='__main__':
	app.run(debug=True)