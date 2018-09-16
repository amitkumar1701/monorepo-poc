FROM node:8.9.4

# Create app directory
RUN mkdir -p /opt/apps/roofgraf-api
ARG registry
RUN npm config set user 0
RUN npm config set unsafe-perm true
RUN apt-get update && apt-get install -y \
    python-pip
RUN pip install PyMySQL elasticsearch redis
ENV DEBUG *
