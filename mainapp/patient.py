
from mainapp import app, db
from flask import request, make_response, jsonify
from .models import Patient
from .schemas import PatientSchema

@app.route("/patient", methods = ["GET", "POST"])
def patient_data():
    if request.method == "GET":
        patient_list = Patient.query.all()
        patient = PatientSchema(many = True).dump(patient_list)  
        return make_response(jsonify(patient), 200)
    
    if request.method == "POST":
        data = request.get_json()        
        patient = PatientSchema().load(data)
        new_patient = Patient(**patient)
        db.session.add(new_patient)
        db.session.commit()
        patient_schema = PatientSchema().dump(new_patient)
        return make_response(jsonify(patient_schema))
        
@app.route("/patient/<int:id>", methods = ["GET", "PATCH", "DELETE"])
def patient_by_id(id):
    if request.method == "GET":
        patient_name = Patient.query.filter_by(id = id).first()
        patient_data = PatientSchema().dump(patient_name)
        return make_response(jsonify(patient_data), 200)
    
    if request.method == "DELETE":
        patient_item = Patient.query.filter_by(id = id).first()
        db.session.delete(patient_item)
        db.session.commit()
        return make_response(jsonify(message = "patient deleted successfully"), 200)
    
    if request.method == "PATCH":
        patient = Patient.query.filter_by(id = id).first()
        data = request.get_json()
        patients = PatientSchema().load(data)
        for field, value in patients.items():
            setattr(patient, field, value)
        db.session.add(patient)
        db.session.commit() 

        patient_data = PatientSchema().dump(patient)
        return make_response(jsonify(patient_data))
