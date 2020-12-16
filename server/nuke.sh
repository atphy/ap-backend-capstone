#!/bin/bash

rm -rf fullstackapi/migrations
rm db.sqlite3
python manage.py makemigrations fullstackapi
python manage.py migrate
python manage.py loaddata users
python manage.py loaddata profiles
python manage.py loaddata customers
python manage.py loaddata shops
python manage.py loaddata records
python manage.py loaddata stacks
python manage.py loaddata tokens
