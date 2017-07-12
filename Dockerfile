FROM node:6.11.1
RUN adduser -D myuser
WORKDIR /home/myuser/
COPY . .
RUN npm install --production
RUN chown -R myuser:myuser .
USER myuser
CMD npm start
