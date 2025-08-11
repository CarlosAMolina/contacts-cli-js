API_IP=172.20.0.2
API_PORT=5000
CLI_CONTAINER_IP=172.20.0.3
CLI_IMAGE_NAME=contacts-cli-js
CLI_CONTAINER_NAME=$(CLI_IMAGE_NAME)-container
NETWORK_NAME=contacts-network

build:
	docker build \
		--build-arg API_IP=$(API_IP) \
		--build-arg API_PORT=$(API_PORT) \
		-t $(CLI_IMAGE_NAME) .

connect:
	docker exec -it $(CLI_CONTAINER_NAME) /bin/sh

run:
	docker run \
		--rm \
		-dit \
		--net=$(NETWORK_NAME) \
		--name $(CLI_CONTAINER_NAME) \
		$(CLI_IMAGE_NAME)

# [pass argument](https://stackoverflow.com/a/2826069)
# Example: make search-term term='1'
search-id:
	docker exec -it $(CLI_CONTAINER_NAME) node index.js i $(term)

# [pass argument](https://stackoverflow.com/a/2826069)
# Example: make search-term term='carlos'
search-term:
	docker exec -it $(CLI_CONTAINER_NAME) node index.js c $(term)

stop:
	docker stop $(CLI_CONTAINER_NAME)

# More commands in package.json > scripts
