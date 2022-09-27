# EFEM Users Feathers

Servicio de administración de usuarios.

## Despliegue en Testing

Para levantar EFEM Users Feathers debe iniciarse un contenedor Docker con la imagen `acdi/efem-users-feathers` de la siguiente manaera:

```
$ docker run --name efem-users-feathers -v /etc/efem-users-service/.env:/usr/src/app/.env -p 3032:3032/tcp -e 'NODE_ENV=TESTING' -e 'FEATHERS_USERS_SERVICE_PORT=3032' -e 'NODE_VERSION=10.21.0' -e 'YARN_VERSION=1.22.4' -d acdi/efem-users-feathers
```

### Update

Para actualizar el contenedor con una nueva image debe ejecutarse lo siguiente, donde `CONTAINER_ID` es el identificador del contenedor de EFEM Users Feathers.

```
$ docker container stop CONTAINER_ID
$ docker container rm CONTAINER_ID
$ docker pull acdi/efem-users-feathers
$ docker run --name efem-users-feathers -v /etc/efem-users-service/.env:/usr/src/app/.env -p 3032:3032/tcp -e 'NODE_ENV=TESTING' -e 'FEATHERS_USERS_SERVICE_PORT=3032' -e 'NODE_VERSION=10.21.0' -e 'YARN_VERSION=1.22.4' -d acdi/efem-users-feathers
```

## Despliegue en Producción

Para levantar EFEM Users Feathers debe iniciarse un contenedor Docker con la imagen `acdi/efem-users-feathers` de la siguiente manaera:

```
$ docker run --name efem-users-feathers -v /etc/efem-users-service/.env:/usr/src/app/.env -p 3031:3031/tcp -e 'NODE_ENV=PRODUCTION' -e 'FEATHERS_USERS_SERVICE_PORT=3031' -e 'NODE_VERSION=10.21.0' -e 'YARN_VERSION=1.22.4' -d acdi/efem-users-feathers
```

### Update

Para actualizar el contenedor con una nueva image debe ejecutarse lo siguiente, donde `CONTAINER_ID` es el identificador del contenedor de EFEM Users Feathers.

```
$ docker container stop CONTAINER_ID
$ docker container rm CONTAINER_ID
$ docker pull acdi/efem-users-feathers
$ docker run --name efem-users-feathers -v /etc/efem-users-service/.env:/usr/src/app/.env -p 3031:3031/tcp -e 'NODE_ENV=PRODUCTION' -e 'FEATHERS_USERS_SERVICE_PORT=3031' -e 'NODE_VERSION=10.21.0' -e 'YARN_VERSION=1.22.4' -d acdi/efem-users-feathers
```