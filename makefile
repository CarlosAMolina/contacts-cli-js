CLI_IMAGE_NAME=contacts-cli-js
CLI_CONTAINER_NAME=$(CLI_IMAGE_NAME)-container
API_PORT=5000

build:
	docker build --build-arg PORT=$(API_PORT) -t $(CLI_IMAGE_NAME) .

run:
	docker run --rm -d --name $(CLI_CONTAINER_NAME) $(CLI_IMAGE_NAME)

stop:
	docker stop $(CLI_CONTAINER_NAME)

# More commands in package.json > scripts
