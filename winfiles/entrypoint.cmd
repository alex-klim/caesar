@ECHO OFF
SETLOCAL
cd ..
SET ROOT=%CD%
python -m venv caesar
xcopy src %ROOT%\caesar\src\ /s
copy requirements.txt %ROOT%\caesar\
cd caesar
call Scripts\activate
pip install -r requirements.txt
pause
ENDLOCAL
