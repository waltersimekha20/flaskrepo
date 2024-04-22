from marshmallow import Schema, fields, validate


class AppointmentSchema(Schema):
    id = fields.Integer()
    appointment_type = fields.String()
    appointment_date = fields.String(required=True)  # Assuming appointment_date is stored as string (e.g., 'YYYY-MM-DD')
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    patient_id = fields.Integer(required=True)
    staff_id = fields.Integer(required=True)
    patient_name = fields.String(required=True)
    staff_name = fields.String(required=True)

class PatientSchema(Schema):
    id = fields.Integer()
    name = fields.String(required=True, validate=validate.Length(min=1))
    date_of_birth = fields.String(required=True)  # Assuming date_of_birth is stored as string (e.g., 'YYYY-MM-DD')
    age = fields.Integer(required=True)
    gender = fields.String(required=True)
    contact_number = fields.String(required=True)
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    user_id = fields.Integer()
    staff_id = fields.Integer()

    appointments = fields.Nested(AppointmentSchema, many=True)

class StaffSchema(Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    specialisation = fields.String(required=True)
    start_date = fields.String(required=True)  # Assuming start_date is stored as string (e.g., 'YYYY-MM-DD')
    end_date = fields.String(allow_none=True)  # Optional field for end_date
    contact_number = fields.String()
    status = fields.String()
    gender = fields.String()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    user_id = fields.Integer()
    
    appointments = fields.Nested(AppointmentSchema, many=True)
    patients = fields.Nested(PatientSchema, many=True)



class UserSchema(Schema):
    id = fields.Integer()  # dump_only means this field is read-only
    email = fields.Email(required=True)
    username = fields.String(required=True, validate=validate.Length(min=1))
    password = fields.String(required=True, validate=validate.Length(min=1))
    role = fields.String(required=True)  # Assuming 'role' can be 'admin' or 'user'
    created_at = fields.DateTime()  # dump_only because this is automatically set by the database
    updated_at = fields.DateTime()  # dump_only for the same reason

    patients = fields.Nested(PatientSchema, many=True)
    staff = fields.Nested(StaffSchema, many=True)

