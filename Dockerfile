FROM node:24-alpine3.21
COPY package.json package-lock.json /
RUN npm ci --omit=dev
COPY index.js /
COPY src /src
ARG API_PORT
ENV API_PORT=$API_PORT
#CMD ["npm", "start"]
ENTRYPOINT ["tail", "-f", "/dev/null"]
