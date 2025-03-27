ErrorSummarizerPrompt='''Analyze the provided error and summarize the possible solutions along with the cause of the issue.
REfrain from using words like i am unable..

Output field should only contain the cause of the error and possible solution'''

SlackNotifyPrompt=''' send message to slack channel "pica-integration" with template "SlackNotificationTemplate"
Do no add anything on your own
STRictly follow the template
Please refrain from using words like i am unable.. '''