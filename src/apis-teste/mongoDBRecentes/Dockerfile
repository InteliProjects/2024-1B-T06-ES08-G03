FROM node:alpine

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=1536"

COPY . .

RUN npm i

CMD ["npm", "run", "start"]