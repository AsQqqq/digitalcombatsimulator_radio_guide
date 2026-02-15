registerSection({
  id: "takeoff",
  category: "airfield",
  order: 4,
  number: "1.4",
  title: { ru: "Взлёт", en: "Takeoff" },
  cards: [
    {
      lang: "ru",
      icon: "\u2708\uFE0F",
      title: "Запрос взлёта",
      type: "normal",
      defaultOpen: true,
      phrases: [
        { label: "Борт \u2192 РП", text: "Сенаки, {cs}, взлёт", speaker: "pilot" },
        { label: "РП \u2192 Борт", text: "{cs}, Сенаки, взлёт разрешаю, ветер у земли 270, 7 узлов, удачного полёта", speaker: "atc" }
      ],
      action: {
        title: "Что ты делаешь",
        items: ["Выполняешь взлёт"]
      },
      response: {
        title: "Твой ответ (после взлёта)",
        text: "Сенаки, {cs}, в воздухе, конец связи"
      }
    },
    {
      lang: "en",
      icon: "\u2708\uFE0F",
      title: "Request Takeoff",
      type: "normal",
      phrases: [
        { label: "ACFT \u2192 ATC", text: "Senaki, {cs}, request take-off", speaker: "pilot" },
        { label: "ATC \u2192 ACFT", text: "{cs}, Senaki, cleared for take-off runway 27, wind 270 degrees at 7 kts", speaker: "atc" }
      ],
      response: {
        title: "Your response",
        text: "Taking off, {cs}"
      }
    }
  ]
});
