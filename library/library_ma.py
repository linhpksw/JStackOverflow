from .extensions import ma


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password',
                  'phone_number', 'date_of_birth', 'gender',
                  'bio', 'avatar', 'education', 'experience', 'year_of_experience', 'reputation', 'expert')
        '''(self, id, name, email, password,
                 phone_number, date_of_birth, gender,
                 bio, avatar, education = None,
                 experience = None, year_of_experience = None, 
                 reputation=0, expert= False):
        '''


class QuestionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'question', 'datetime_posted',
                  'datetime_updated', 'asker_id', 'vote_id')


class AnswerSchema(ma.Schema):
    class Meta:
        fields = ('id', 'answer', 'datetime_posted', 'datetime_updated',
                  'respondent_id', 'question_id', 'like_id', 'unlike_id')
