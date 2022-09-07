# ratp

## Setup

### Yarn

### Clone

From your sources (or workspace) directory:

- `https://github.com/ANASGHANAM/ratp.git`
- `cd ratp`
- `yarn`

## Configure docker

Docker engine and Docker-compose must be installed on local host. Please follow these links :

- [Install Docker](https://docs.docker.com/install/) on your system
- [Install Docker-compose](https://docs.docker.com/compose/install/) on your system

In order to use docker correctly you need to define environment variables like below:
`export RATP_USER=$(id -u ${USER}):$(id -g ${USER})`

### Usage

> Docker image will be build if it is not present in local docker repository on start, thanks to docker compose.

> NodeJS component is configured in debug mode. You can link your IDE to container for debug.

#### RATP

In your project directory:

- start `docker-compose up -d`
- stop `docker-compose down`
- build `docker-compose build`

Once service started, services are available on dedicated ports:

| RATP |
| --------- |
| `3300`    |

### Example

Classical launch:

- `cd [RATP_PATH]`
- `docker-compose -p ratp up -d`



Access swagger http://localhost:3300/documentation


http://localhost:3300/api/catalog/wc_catalog
