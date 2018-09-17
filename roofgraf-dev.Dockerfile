FROM node:8.9.4

WORKDIR /workspaces

# add code
COPY . /workspaces
RUN yarn install --frozen-lockfile --no-cache
ENV NODE_ENV=dev
ARG registry
RUN npm config set user 0
RUN npm config set unsafe-perm true
RUN apt-get update && apt-get install -y \
    python-pip
RUN pip install PyMySQL
ENV DEBUG * 


# FROM node:carbon-alpine as builder
# # Create app directory
# RUN mkdir -p /opt/apps/roofgraf-api
# RUN apk add --no-cache --update krb5-dev alpine-sdk python
# WORKDIR /opt/apps/roofgraf-api
# ENV PATH=$PATH:/opt/apps/roofgraf-api
# ENV NODE_ENV=production
# COPY . /opt/apps/roofgraf-api
# ARG registry
# RUN npm config set user 0 && npm config set unsafe-perm true && npm install
# RUN npm rebuild bcrypt --build-from-source

# FROM node:carbon-alpine
# RUN mkdir -p /opt/apps/roofgraf-api
# ENV PATH=$PATH:/opt/apps/roofgraf-api
# WORKDIR /opt/apps/roofgraf-api
# COPY --from=builder /opt/apps/roofgraf-api .
# ENV DEBUG *
# ENV NODE_ENV=production
# EXPOSE 5000
# CMD ["npm", "run", "start"]


# FROM node:8.9.4

# # Create app directory
# RUN mkdir -p /opt/apps/roofgraf-api
# ARG registry
# RUN npm config set user 0
# RUN npm config set unsafe-perm true
# RUN apt-get update && apt-get install -y \
#     python-pip
# RUN pip install PyMySQL elasticsearch redis
# ENV DEBUG *