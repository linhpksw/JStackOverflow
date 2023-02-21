from .extensions import ma 

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','name', 'email', 'password',
                 'phone_number','date_of_birth','gender',
                 'bio','avatar','education','experience','year_of_experience','reputation','expert')
        '''(self, id, name, email, password,
                 phone_number, date_of_birth, gender,
                 bio, avatar, education = None,
                 experience = None, year_of_experience = None, 
                 reputation=0, expert= False):
        '''
        
class QuestionSchema(ma.Schema):
    class Meta:
        fields = ('id','question','answer','asker_id','expert_id')
        
    