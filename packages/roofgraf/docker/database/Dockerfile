FROM mariadb:10.1

ENV MYSQL_ROOT_PASSWORD=temp4455
ENV MYSQL_DATABASE=roofgraf_api_db

RUN mv /etc/localtime /etc/localtime.bak && cp /usr/share/zoneinfo/America/Montreal /etc/localtime

ADD init.sql /docker-entrypoint-initdb.d/
