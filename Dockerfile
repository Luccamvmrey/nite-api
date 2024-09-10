FROM node:19-bullseye

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "run", "start:migrate"]