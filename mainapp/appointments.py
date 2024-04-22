from mainapp import app, db
from flask import request, make_response, jsonify
from .models import Appointment
from .schemas import AppointmentSchema

@app.route("/appointment", methods = ["GET", "POST"])
def appointment_data():
    if request.method == "GET":
        appointment_list = Appointment.query.all()
        appointment = AppointmentSchema(many = True).dump(appointment_list)  
        return make_response(jsonify(appointment), 200)
    
    if request.method == "POST":
        data = request.get_json()        
        appointment = AppointmentSchema().load(data)
        new_appointment = Appointment(**appointment)
        db.session.add(new_appointment)
        db.session.commit()
        appointment_schema = AppointmentSchema().dump(new_appointment)
        return make_response(jsonify(appointment_schema))
        
@app.route("/appointment/<int:id>", methods = ["GET", "PATCH", "DELETE"])
def appointment_by_id(id):
    if request.method == "GET":
        appointment_name = Appointment.query.filter_by(id = id).first()
        appointment_data = AppointmentSchema().dump(appointment_name)
        return make_response(jsonify(appointment_data), 200)
    
    if request.method == "DELETE":
        appointment_item = Appointment.query.filter_by(id = id).first()
        db.session.delete(appointment_item)
        db.session.commit()
        return make_response(jsonify(message = "appointment deleted successfully"), 200)
    
    if request.method == "PATCH":
        appointment = Appointment.query.filter_by(id = id).first()
        data = request.get_json()
        appointments = AppointmentSchema().load(data)
        for field, value in appointments.items():
            setattr(appointment, field, value)
        db.session.add(appointment)
        db.session.commit() 

        appointment_data = AppointmentSchema().dump(appointment)
        return make_response(jsonify(appointment_data))
