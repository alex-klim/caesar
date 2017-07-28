@ECHO OFF
cd ..
cd caesar
call Scripts\activate
cd src
python manage.py runserver

