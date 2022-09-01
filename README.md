# 📞📕 Личный кабинет (список контактов)

## О чём проект? 
📄🗿 Личный кабинет (список контактов) - страница аторизации, личный кабинет со списком контактов

## Суть проекта?
Проект - практика верстки SPA с помощью UI-библиотекой, Redux: авторизация и работа с HTTP-запросами

*Сайт создан под Google Chrome, адоптивная верстка до 300px ширины*

Практика навыков:
  - Использование React, Redux
  - Создание SPA
  - Работа с HTTP запросами с помощью Redux Toolkit (RTK Query)
    - GET
    - POST
    - PUT
    - DELETE
  - Работа с авторизацией - Redux Toolkit (Slice, Dispatch)
  - Работа с UI-библиотекой (Ant Design)
  - Практика TypeScript
  - Практика верстки, декомпозиции, React-хуков

## Демо
Сайт работает на локальный БД. Для взаимодействия и просмотра необходимо скачать сборку (инструкция ниже)

## Используемые библиотеки
[package.json](./package.json)

## Инструкции по сборке и запуску проекта
Все компоненты ноходятся в папке `src`

**Версия NODE - 16.17.0**

Не кликайте на кнопки слишком часто, json-server может выдать ошибку и прекратить работу. В случае ошибки перезапустите проект (пункт 3)

Запуск проекта:
  1. Клонирование проекта `https://github.com/Mohiroo/personal-account.git`
  2. Установка зависимостей `npm i`
  3. Запуск проекта
      - `npm run dev`
      - В случае если командна не сработала, необходимо в разных терминалах ввести
        1. `json-server --watch db.json` - ожидаем запуска
        2. `npm start` - предложит сменить стандартный порт, соглашаемся (Y)
