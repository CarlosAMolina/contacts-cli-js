FROM node:24-alpine3.21

# Non root user.
# https://stackoverflow.com/questions/49955097/how-do-i-add-a-user-when-im-using-alpine-as-a-base-image
# https://github.com/OnekO/alpine-nonroot/blob/main/Dockerfile
ARG USER=app_user
ENV HOME=/home/$USER
RUN adduser -D $USER
# Use non root user
USER $USER
WORKDIR $HOME

COPY package.json package-lock.json $HOME
RUN npm ci --omit=dev
COPY index.js $HOME
COPY src $HOME/src
ARG API_IP
ARG API_PORT
ENV API_IP=$API_IP
ENV API_PORT=$API_PORT
#CMD ["npm", "start"]
ENTRYPOINT ["tail", "-f", "/dev/null"]
