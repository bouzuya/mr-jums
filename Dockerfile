FROM node:6.10-alpine
RUN adduser -D myuser
WORKDIR /home/myuser/
COPY . .
RUN chown -R myuser:myuser .
USER myuser
CMD npm start
