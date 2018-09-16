#!/usr/local/bin/python

import pymysql.cursors
import subprocess as sb
import os
import shutil
import time
from string import Template

MYSQL_HOST = "roofgraf-database"
DBNAME = "roofgraf_api_db"
USERNAME = "root"
PASSWORD = "temp4455"

RD_PORT = 6379
RD_DB = 0
API_DIR = "/opt/apps/roofgraf-api"


def run_db_migrations():
    proc = sb.Popen(['npm', 'run', 'migrate'], stdout=sb.PIPE, cwd=API_DIR)
    out, err = proc.communicate()
    if err:
        print(err)
    else:
        print(out)
    # env={'FAKE_SEED': 'true'}

print("Checking if all services are up")
keep_checking = True
while keep_checking:
    try:
        print("Checking DB")
        conn = pymysql.connect(db=DBNAME, user=USERNAME, host=MYSQL_HOST, password=PASSWORD)
        keep_checking = False
    except Exception as e:
        print("Dependencies are not ready yet:", e)
        time.sleep(10)
    else:
        print("All services are up and running, continuing with roofgraf-API startup...")

proc = sb.Popen(['npm', 'install', '--build-from-source=bcrypt'], stdout=sb.PIPE, cwd=API_DIR)
out, err = proc.communicate()
if err:

    print(err)
else:
     print(out)
# Setup Databases
try:
    run_db_migrations()
except Exception as e:
    print("Couldn't run db migrations", e)
