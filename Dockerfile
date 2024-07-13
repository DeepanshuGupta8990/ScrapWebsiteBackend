FROM ghcr.io/puppeteer/puppeteer:22.13.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci 

RUN mkdir -p /usr/src/app/downloads && chmod -R 777 /usr/src/app/downloads

COPY . .

CMD ["node", "index.js"]
