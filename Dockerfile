FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8091

ADD start.sh /
RUN chmod +x /start.sh

CMD ["./start.sh"]