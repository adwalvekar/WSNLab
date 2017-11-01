
class Config(object):
	DATABASE_URI = 'mysql+pymysql://root:password@localhost/move'
	SQLALCHEMY_TRACK_MODIFICATIONS = True
	DEBUG = False
	SECRET_KEY = 'I@IZRV@blablablaLf36bcbqcVME'

class ProductionConfig(Config):
	pass

class DevelopmentConfig(Config):
	SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:password@localhost/dbName"
	DEBUG = True

class TestingConfig(Config):
	SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:password@db.ip.xx.xx/dbName"
	TESTING = True
	DEBUG = True
