from .extensions import ma 

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','name', 'email', 'password',
                 'phone_number','date_of_birth','gender',
                 'bio','avatar','expert')
        
class questionSchema(ma.Schema):
    class Meta:
        fields = ('id','question','answer','asker_id','expert_id')
        
    