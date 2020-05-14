FROM node:lts-alpine as dev

RUN mkdir /code
WORKDIR /code

COPY . /code

WORKDIR /code/app
CMD tail -f /dev/null