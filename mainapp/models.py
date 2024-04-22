from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
import re

db = SQLAlchemy()

class User(db.Model):
    __tablename__= 'users'

    id = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String, unique=True, nullable= False)
    password = db.Column(db.String, nullable= False)
    email = db.Column(db.String, unique=True, nullable= False)
    role = db.Column(db.String, nullable= False)
    created_at= db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())


    def __repr__(self):
        return f"Username: {self.username} Role: {self.role}"

class Patient(db.Model):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    date_of_birth = db.Column(db.String, nullable=False)
    age= db.Column(db.Integer,nullable=False)
    gender = db.Column(db.String, nullable=False)
    contact_number = db.Column(db.String, nullable=False)
    created_at= db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    staff_id = db.Column(db.Integer, db.ForeignKey("staffs.id"))

    user =  db.relationship("User", backref="patients")
    staff =  db.relationship("Staff", backref="patients")

   

    def __repr__(self):
        return f"Patient('{self.name} {self.date_of_birth} {self.gender} {self.contact_number}')"

class Staff(db.Model):
    __tablename__ = "staffs"
    
    id= db.Column(db.Integer,primary_key=True)
    name=  db.Column(db.String,nullable=False)
    specialisation=  db.Column(db.String,nullable=False)
    start_date=  db.Column(db.String,nullable=False)
    end_date=   db.Column(db.String)
    contact_number=  db.Column(db.String, nullable=False)
    status=  db.Column(db.String)
    gender=  db.Column(db.String,nullable=False)
    created_at= db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user =  db.relationship("User", backref="staffs")


    def __repr__(self):
        return f"Staff: {self.name} {self.specialisation} {self.start_date}~{self.end_date if self.end_date else self.func.now()} {self.status}"

class Appointment(db.Model):
    __tablename__ = 'appointments'

    id=  db.Column(db.Integer, primary_key=True)
    appointment_type= db.Column(db.String)
    appointment_date=  db.Column(db.String, nullable=False)
    patient_name = db.Column(db.String, nullable=False)
    staff_name = db.Column(db.String, nullable=False)
    created_at= db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
    staff_id = db.Column(db.Integer, db.ForeignKey("staffs.id"))

    patients= db.relationship('Patient', backref= 'appointments')
    staffs = db.relationship('Staff', backref= 'appointments')


    def __repr__(self):
        return f"Appointment('{self.id}, '{self.appointment_type}, '{self.appointment_date})"


