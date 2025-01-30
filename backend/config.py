import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default-secret-key')
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:9ox(CK^C<W@localhost/tsec'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

config = Config
