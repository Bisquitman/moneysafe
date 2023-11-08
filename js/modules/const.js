export const API_URL = 'https://silent-gleaming-tsunami.glitch.me';

/*
API Endpoints
GET /api/finance: Получение всех записей о доходах и расходах, передав searchParams startDate и/или endDate можно отфильтровать по дате (формат ГГГГ-ММ-ДД)
POST /api/finance: Добавление новой записи о доходе или расходе
GET /api/categories: Получение списка категорий
DELETE /api/finance/:id: Удаление записи
GET /api/reset: Сброс БД до стартового состояния
GET /api/test: Получение тестовых записей

Формат данных
Объекты о доходах и расходах имеют следующую структуру:
{
  "id": "уникальный идентификатор",
  "type": "тип записи (income/outcome)",
  "amount": "сумма",
  "description": "описание операции",
  "category": "категория операции"
}

Пример структуры категорий:
{
  "income": ["Зарплата", "Подарки"],
  "outcome": ["Еда", "Транспорт", "Развлечения", "Образование"]
}
*/