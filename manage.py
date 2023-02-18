import os 
import unittest

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from .library import create_app,db
from .library.model import models

app = create_app(os.getenv('BOILERPLATE_ENV') or 'development')

app.app_context().push()

manager = Manager(app)

migrate = Migrate(app,db)

manager.add_command('db',MigrateCommand)

@manager.command
def run():
    app.run()

def test():
    tests = unittest.TestLoader().discover('app/test',pattern ='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == '__main__':
    manager.run()