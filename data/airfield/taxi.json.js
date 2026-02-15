registerSection({
  id: "taxi",
  category: "airfield",
  order: 3,
  number: "1.3",
  title: { ru: "Руление", en: "Taxi" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F6DE}",
      title: "Руление к полосе",
      type: "normal",
      defaultOpen: true,
      phrases: [
        { label: "Борт \u2192 РП (запрос руления)", text: "Сенаки, {cs}, разрешите руление", speaker: "pilot" },
        { label: "РП \u2192 Борт", text: "{cs}, Сенаки, руление разрешаю, на предварительный 27 полосы", speaker: "atc" },
        { label: "Борт (на предварительном)", text: "Сенаки, {cs}, на предварительном", speaker: "pilot" },
        { label: "Борт (запрос исполнительного)", text: "Сенаки, {cs}, разрешите руление на исполнительный", speaker: "pilot" },
        { label: "РП \u2192 Борт", text: "{cs}, Сенаки, разрешаю руление на исполнительный 27 полосы", speaker: "atc" }
      ],
      explanation: {
        title: "Что это значит",
        items: [
          "<strong>предварительный</strong> \u2014 точка ожидания перед ВПП (holding point)",
          "<strong>исполнительный</strong> \u2014 на полосе, готов к взлёту (lineup)",
          "РП может сразу дать исполнительный, если полоса свободна",
          "Могут сказать <strong>\u00ABвзлёт по готовности\u00BB</strong> \u2014 взлетай без запроса"
        ]
      },
      response: {
        title: "Твой ответ",
        text: "Руление разрешили, на предварительный 27, {cs}"
      }
    },
    {
      lang: "en",
      icon: "\u{1F6DE}",
      title: "Taxi to Runway",
      type: "normal",
      phrases: [
        { label: "ACFT \u2192 ATC", text: "Senaki, {cs}, request taxi", speaker: "pilot" },
        { label: "ATC \u2192 ACFT", text: "{cs}, Senaki, taxi to holding point runway 27", speaker: "atc" },
        { label: "ACFT (at holding point)", text: "Senaki, {cs}, holding short runway 27", speaker: "pilot" },
        { label: "ATC \u2192 ACFT", text: "{cs}, Senaki, line up runway 27 and wait", speaker: "atc" }
      ],
      explanation: {
        title: "What it means",
        items: [
          "<strong>holding point</strong> \u2014 wait position before runway",
          "<strong>line up and wait</strong> \u2014 enter runway, ready for takeoff, wait for clearance"
        ]
      },
      response: {
        title: "Your response",
        text: "Line up runway 27 and wait, {cs}"
      }
    }
  ]
});
