# These 2 lines caused error (due to the db variable being initialized 2 times, once here, and once in models.py)
# from flask_sqlalchemy import SQLAlchemy
# db = SQLAlchemy()

from models import db

def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
