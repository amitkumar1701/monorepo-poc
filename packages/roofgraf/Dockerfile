FROM node:carbon-alpine as builder
# Create app directory
RUN mkdir -p /opt/apps/roofgraf-api
RUN apk add --no-cache --update krb5-dev alpine-sdk python
WORKDIR /opt/apps/roofgraf-api
ENV PATH=$PATH:/opt/apps/roofgraf-api
ENV NODE_ENV=production
COPY . /opt/apps/roofgraf-api
ARG registry
RUN npm config set user 0 && npm config set unsafe-perm true && npm install
RUN npm rebuild bcrypt --build-from-source

FROM node:carbon-alpine
RUN mkdir -p /opt/apps/roofgraf-api
ENV PATH=$PATH:/opt/apps/roofgraf-api
WORKDIR /opt/apps/roofgraf-api
COPY --from=builder /opt/apps/roofgraf-api .
ENV DEBUG *
ENV NODE_ENV=production
EXPOSE 5000
CMD ["npm", "run", "start"]