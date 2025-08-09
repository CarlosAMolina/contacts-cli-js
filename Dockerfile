FROM node:22.14.0-slim
COPY package.json package-lock.json /
RUN npm ci --omit=dev
COPY index.js /
COPY src /src
ARG API_PORT
ENV API_PORT=$API_PORT
#CMD ["npm", "start"]
ENTRYPOINT ["tail", "-f", "/dev/null"]
