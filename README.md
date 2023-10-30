Запуск проекта:

npm i
npm run start

БД по урлу:

'postgres://postgres:postgres@localhost:5432/starpets_test'

cURL запроса:

curl --location --request PUT 'http://localhost:3000/balance/charge' \
--header 'Content-Type: application/json' \
--data '{
    "amount": 2,
    "userId": 1
}'
