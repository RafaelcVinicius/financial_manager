FROM node:20.5.1-slim

RUN npm i -g @nestjs/cli

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]