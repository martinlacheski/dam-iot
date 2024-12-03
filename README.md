App Smart Cultives
==================

Este proyecto es una aplicación fullstack que se ejecuta sobre el ecosistema `Docker`. 
Utiliza el `Framework Ionic` para realizar el frontend. También tiene un servicio en `NodeJS` con `Express` que permite ejecutar código en backend para interactar con el servicio. Además tiene una `base de datos` MySQL que permite interactuar con el backend para guardar y consultar datos, y de manera adicional trae un `administrador` de base de datos para poder administrar la base en caso que lo necesites.

## Introducción

El proyecto corresponde al trabajo final de la asignatura **Desarrollo de Aplicaciones Multiplataforma** de la *Especialización en Internet de las Cosas* dictada en la *Facultad de Ingenieria* de la *Universidad de Buenos Aires*.

El sistema permite:
- controlar la apertura y cierre de la electroválvula de diferentes dispositivos,
- ver las mediciones de cada dispositivo y
- ver el registro de operaciones sobre la electroválvula.


## Inicialización 🚀

Esta sección es una guía con los pasos esenciales para que se pueda poner en marcha la aplicación.

<details><summary><b>Mirar los pasos necesarios</b></summary><br>

### Instalar las dependencias

Para correr este proyecto es necesario que se instale `Docker` y `Docker Compose`. 

En [este artículo](https://www.gotoiot.com/pages/articles/docker_installation_linux/) publicado se encuentran los detalles para instalar Docker y Docker Compose en una máquina Linux.

En caso que se quiera instalar las herramientas en otra plataforma o tengas algún incoveniente, se puede leer la documentación oficial de [Docker](https://docs.docker.com/get-docker/) y también la de [Docker Compose](https://docs.docker.com/compose/install/).

Continuar con la descarga del código cuando las dependencias estén instaladas y funcionando.

### Descargar el código

Para descargar el código, lo más conveniente es realizar un `fork` de este proyecto en tu cuenta personal haciendo click en [este link](https://github.com/martinlacheski/dam-iot/fork). Una vez que ya tengas el fork a tu cuenta, descargalo con este comando (acordate de poner tu usuario en el link):

```
git clone https://github.com/martinlacheski/dam-iot.git
```

> En caso que no se posea una cuenta en Github se puede clonar directamente este repositorio.

### Ejecutar la aplicación

Para ejecutar la aplicación se tiene que correr el comando desde la raíz del proyecto: 

```sh
docker compose up
```
Este comando va a descargar las imágenes de Docker de node, de typescript, de la base datos y del admin de la DB, y luego ponerlas en funcionamiento. 

### Detener la aplicación

Para detener la aplicación es necesario ejecutar el siguiente comando:

```sh
docker compose down
```
También es posible realizar `Ctrl-C` desde el shell o terminal donde se encuentra corriendo el sistema.

</details>

## Acceder a la aplicación

Para acceder al cliente web ingresar a a la URL [http://localhost:8100/](http://localhost:8100/) y para acceder al admin de la DB acceder a [http://localhost:8001/](http://localhost:8001/). 

Si se pudo acceder al cliente web y al administrador significa que la aplicación se ejecuta correctamente. 

> Si aparece un error la primera vez que se corre la aplicación, detener el proceso y volver a iniciarla. Esto es debido a que el backend espera que la base de datos esté creada al iniciar, y en la primera ejecución puede no alcanzar a crearse. A partir de la segunda vez el problema queda solucionado.

## Tecnologías utilizadas 🛠️

En esta sección se pueden ver las tecnologías más importantes utilizadas.

<details><summary><b>Mirar la lista completa de tecnologías</b></summary><br>

* [Docker](https://www.docker.com/) - Ecosistema que permite la ejecución de contenedores de software.
* [Docker Compose](https://docs.docker.com/compose/) - Herramienta que permite administrar múltiples contenedores de Docker.
* [Node JS](https://nodejs.org/es/) - Motor de ejecución de código JavaScript en backend.
* [MySQL](https://www.mysql.com/) - Base de datos para consultar y almacenar datos.
* [PHPMyAdmin](https://www.phpmyadmin.net/) - Administrador web de base de datos.
* [Ionic Framework](https://ionicframework.com/) - Bibliotecas de componentes para aplicaciones multiplataformas.
* [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript tipado y con clases.

</details>

## Contribuir 🖇️

Si desea participar del proyecto, por favor realizar un pull request con las sugerencias y el código.

## Autor 👥

**Martin Anibal Lacheski - Año 2024**

## Licencia 📄

Este proyecto está bajo Licencia ([MIT](https://choosealicense.com/licenses/mit/)).

---
