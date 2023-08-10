# Movies Explorer API

Дипломный проект Yandex.Praktikum факультета "Веб-разработка".
Проект работает на [download and install Node.js](https://nodejs.org/en/download/).

В данном репозитории находится backend часть приложения `Movie43`, включающий фронтенд и бэкенд части приложения со следующими возможностями: 
- авторизации и регистрации пользователей;
- добавление и удаление фильмов из избранного;
- редактирование данных пользователя.

##
Сервер имеет следующие Роуты сервера:
* GET     /users/me - возвращает информацию о пользователе (имя и почта);
* PATCH   /users/me - обновляет информацию о пользователе (имя и почта);
* GET     /movies - возвращает все сохранённые пользователем фильмы;
* POST    /movies - создаёт фильм;
* DELETE  /movies/_id - удаляет сохранённый фильм по id;

Адрес репозитория: https://github.com/toriomara/movies-explorer-api
Адрес сервера: https://movie43.nomoredomains.rocks
Адрес frontend части проекта: https://github.com/toriomara/movies-explorer-frontend

## Ссылки на проект
https://movie43.nomoreparties.co/

## Запуск проекта 

Для запуска необходимо установить:
* MongoDB (название базы movie43db, DB_URL = 'mongodb://127.0.0.1:27017/movie43db');
* Node.js
* NPM

Установите зависимости:

### `npm install` 
или
### `yarn init`

Запустите сервер разработки:

### `npm start`
или
### `yarn start`

Сборка проекта:
### `npm run build`

### Технологии

- Node JS
- Express JS
- JS
- React JS

