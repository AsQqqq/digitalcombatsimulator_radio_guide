registerSection({
  id: "startup",
  category: "airfield",
  order: 2,
  number: "1.2",
  title: { ru: "Запуск на аэродроме", en: "Engine Startup at Airfield" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F525}",
      title: "Запрос запуска",
      type: "normal",
      defaultOpen: true,
      phrases: [
        { label: "Борт \u2192 РП", text: "Сенаки, {cs}, разрешите запуск", speaker: "pilot" },
        { label: "РП \u2192 Борт", text: "{cs}, Сенаки, запуск разрешаю, ВПП 27, ветер 270, 6 узлов, QFE 00.00", speaker: "atc" }
      ],
      explanation: {
        title: "Что это значит",
        items: [
          "<strong>запуск разрешаю</strong> \u2014 можно запускать двигатели",
          "<strong>ВПП 27</strong> \u2014 активная полоса (курс ~270\u00B0)",
          "<strong>ветер 270, 6 узлов</strong> \u2014 ветер дует с 270\u00B0, скорость 6 узлов",
          "<strong>QFE 00.00</strong> \u2014 давление аэродрома, высотомер на ВПП покажет 0"
        ]
      },
      action: {
        title: "Что ты делаешь",
        items: [
          "Запускаешь двигатели",
          "Выставляешь QFE",
          "Запоминаешь полосу"
        ]
      },
      response: {
        title: "Твой ответ",
        text: "Запуск разрешили, {cs}"
      }
    },
    {
      lang: "en",
      icon: "\u{1F525}",
      title: "Request Start Up",
      type: "normal",
      phrases: [
        { label: "ACFT \u2192 ATC", text: "Senaki, {cs}, request start up", speaker: "pilot" },
        { label: "ATC \u2192 ACFT", text: "{cs}, Senaki, start up approved, runway 27, wind 270 at 7 kts, QFE 00.00, Overcast 030", speaker: "atc" }
      ],
      explanation: {
        title: "What it means",
        items: [
          "<strong>start up approved</strong> \u2014 you may start engines",
          "<strong>runway 27</strong> \u2014 active runway (heading ~270\u00B0)",
          "<strong>wind 270 at 7 kts</strong> \u2014 wind from 270\u00B0, 7 knots",
          "<strong>QFE 00.00</strong> \u2014 airfield pressure, altimeter reads 0 on runway",
          "<strong>Overcast 030</strong> \u2014 solid cloud cover, ceiling at 3000 ft"
        ]
      },
      action: {
        title: "What you do",
        items: [
          "Start engines",
          "Set QFE on altimeter",
          "Note active runway"
        ]
      },
      response: {
        title: "Your response",
        text: "Start up approved, {cs}"
      }
    }
  ]
});
