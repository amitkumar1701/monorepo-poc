FROM node:8.9.4

WORKDIR /workspaces

# add code
COPY . /workspaces
RUN yarn install --frozen-lockfile --no-cache
ENV NODE_ENV=dev
ARG registry
RUN npm config set user 0 && npm config set unsafe-perm true
RUN npm rebuild bcrypt --build-from-source
RUN apt-get update && apt-get install -y \
    python-pip
RUN pip install PyMySQL
ENV DEBUG * 
