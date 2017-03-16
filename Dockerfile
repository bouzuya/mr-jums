FROM node:6.10-alpine
RUN adduser -D myuser
USER myuser
WORKDIR /home/myuser/
COPY . .
CMD npm start
