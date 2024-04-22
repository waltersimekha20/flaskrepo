
from mainapp import app, db
from flask import request, make_response, jsonify
from .models import Staff
from .schemas import StaffSchema

@app.route("/staff", methods = ["GET", "POST"])
def staff_data():
    if request.method == "GET":
        staff_list = Staff.query.all()
        staff = StaffSchema(many = True).dump(staff_list)  
        return make_response(jsonify(staff), 200)
    
    if request.method == "POST":
        data = request.get_json()        
        staff = StaffSchema().load(data)
        new_staff = Staff(**staff)
        db.session.add(new_staff)
        db.session.commit()
        staff_schema = StaffSchema().dump(new_staff)
        return make_response(jsonify(staff_schema))
        
@app.route("/staff/<int:id>", methods = ["GET", "PATCH", "DELETE"])
def staff_by_id(id):
    if request.method == "GET":
        staff_name = Staff.query.filter_by(id = id).first()
        staff_data = StaffSchema().dump(staff_name)
        return make_response(jsonify(staff_data), 200)
    
    if request.method == "DELETE":
        staff_item = Staff.query.filter_by(id = id).first()
        db.session.delete(staff_item)
        db.session.commit()
        return make_response(jsonify(message = "staff deleted successfully"), 200)
    
    if request.method == "PATCH":
        staff = Staff.query.filter_by(id = id).first()
        data = request.get_json()
        staffs = StaffSchema().load(data)
        for field, value in staffs.items():
            setattr(staff, field, value)
        db.session.add(staff)
        db.session.commit() 

        staff_data = StaffSchema().dump(staff)
        return make_response(jsonify(staff_data))
