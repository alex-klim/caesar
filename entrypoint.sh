#!/bin/bash
ROOT=`pwd`
echo $ROOT
python -m venv caesar
cp -r src $ROOT/caesar/src/
cp requirements.txt $ROOT/caesar/
cd caesar
source bin/activate
pip install -r requirements.txt
