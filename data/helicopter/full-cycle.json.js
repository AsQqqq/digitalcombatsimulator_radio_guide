registerSection({
  id: "heli",
  category: "helicopter",
  order: 1,
  number: "2.0",
  title: { ru: "Вертолёты — Запуск / Руление / Посадка", en: "Helicopters — Startup / Taxi / Landing" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F681}",
      title: "Вертолёт: полный цикл",
      type: "normal",
      phrases: [
        { label: "Запуск", text: "Сенаки, {cs}, разрешите запуск, стоянка 8, метеоинформацию имею", speaker: "pilot" },
        { label: "Запуск (ответ)", text: "{cs}, Сенаки, запуск на стоянке разрешаю", speaker: "atc" },
        { label: "Руление", text: "Сенаки, {cs}, готов к рулению, взлёт по-самолётному, с ВПП от РД Charlie", speaker: "pilot" },
        { label: "Руление (ответ)", text: "{cs}, ВПП 31, предварительный разрешаю, по РД Charlie", speaker: "atc" },
        { label: "Контрольное висение", text: "{cs}, занимайте ВПП 31, разрешаю контрольное висение на ВПП, район РД Charlie", speaker: "atc" },
        { label: "Взлёт", text: "{cs}, к взлёту готов", speaker: "pilot" },
        { label: "Взлёт (ответ)", text: "{cs}, ветер тихо, разрешаю взлёт ВПП 31", speaker: "atc" },
        { label: "Посадка", text: "Сенаки, {cs}, на прямой, готов к посадке, курс 330, на сопряжение РД Charlie и ВПП 31", speaker: "pilot" },
        { label: "Посадка (ответ)", text: "{cs}, ветер 300\u00B0 3 м/с, посадку разрешаю", speaker: "atc" },
        { label: "Руление после", text: "{cs}, разрешите руление по воздуху", speaker: "pilot" },
        { label: "Руление после (ответ)", text: "{cs}, стоянка 8, руление по воздуху разрешаю", speaker: "atc" }
      ]
    }
  ]
});
