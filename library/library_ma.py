from .extensions import ma


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password',
                  'phone_number', 'date_of_birth', 'gender',
                  'bio', 'avatar', 'education', 'experience', 'year_of_experience', 'reputation')
        


class QuestionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'content', 'datetime_posted', 'title', 'tag',
                  'datetime_updated', 'asker_id', 'rating', 'topic')


class AnswerSchema(ma.Schema):
    class Meta:
        fields = ('id', 'answer', 'datetime_posted', 'datetime_updated',
                  'respondent_id', 'question_id', 'like', 'unlike')

class Vote_QuestionSchema(ma.Schema):
    class Meta:
        fields = ("id", "vote", "question_id", "voter_id")

class Vote_AnswerSchema(ma.Schema):
    class Meta:
        fields = ("id","answer_id","voter_id","react")
        