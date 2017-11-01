
class Config(object):
	DEBUG = False
	SECRET_KEY = 'I@IZRV@blablablaLf36bcbqcVME'
	MONGO_DBNAME = 'imu_wsan'

class ProductionConfig(Config):
	pass

class DevelopmentConfig(Config):
	DEBUG = True

class TestingConfig(Config):
	TESTING = True
	DEBUG = True
