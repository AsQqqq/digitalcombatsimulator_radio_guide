registerSection({
  id: "landing",
  category: "airfield",
  order: 5,
  number: "1.5",
  title: { ru: "Посадка", en: "Landing" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F6EC}",
      title: "Запрос посадки",
      type: "normal",
      defaultOpen: true,
      phrases: [
        { label: "Борт \u2192 РП (за 50 км)", text: "Сенаки, {cs}, возврат", speaker: "pilot" },
        { label: "РП \u2192 Борт (векторение)", text: "{cs}, Сенаки, идите курсом 270, снижайтесь до 2000 ft", speaker: "atc" },
        { label: "Борт", text: "Сенаки, {cs}, курс 270 занял", speaker: "pilot" },
        { label: "РП \u2192 Борт (разрешение)", text: "{cs}, Сенаки, посадку разрешаю, ВПП 27, посадочный курс 290, QFE 00.00, ветер 270, 7 узлов", speaker: "atc" }
      ],
      explanation: {
        title: "Что это значит",
        items: [
          "<strong>возврат</strong> \u2014 запрашивается за ~50 км от аэродрома",
          "РП ведёт вас курсами (векторение) до посадочного",
          "<strong>посадочный курс 290</strong> \u2014 курс выхода на глиссаду"
        ]
      },
      response: {
        title: "Твой ответ",
        text: "Посадку разрешили, ВПП 27, курс 290, {cs}"
      },
      responseAfter: {
        title: "После касания",
        text: "Сенаки, {cs}, посадка"
      }
    },
    {
      lang: "en",
      icon: "\u{1F6EC}",
      title: "Request Landing",
      type: "normal",
      phrases: [
        { label: "ACFT \u2192 ATC", text: "Senaki, {cs}, inbound", speaker: "pilot" },
        { label: "ATC \u2192 ACFT (vectors)", text: "{cs}, continue on heading 212, descend to flight level 2000", speaker: "atc" },
        { label: "ATC \u2192 ACFT (clearance)", text: "{cs}, cleared to land runway 27, wind 270 degrees at 8 kts", speaker: "atc" }
      ],
      response: {
        title: "Your response",
        text: "Cleared to land runway 27, {cs}"
      },
      responseAfter: {
        title: "After touchdown",
        text: "Senaki, {cs}, on ground"
      }
    }
  ]
});
