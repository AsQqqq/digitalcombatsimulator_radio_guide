registerSection({
  id: "go-around",
  category: "emergency",
  order: 1,
  number: "E.1",
  title: { ru: "Уход на второй круг", en: "Go Around" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F504}",
      title: "Уход на второй круг",
      type: "emergency",
      phrases: [
        { label: "РП \u2192 Борт", text: "{cs}, Сенаки, посадку запрещаю, уходите на второй круг", speaker: "atc" },
        { label: "РП (с курсом)", text: "{cs}, Сенаки, посадку запрещаю, уход правым 217, перед вами борт", speaker: "atc" }
      ],
      explanation: {
        title: "Причины",
        items: [
          "Экстренная посадка другого борта",
          "Внеплановое руление на полосу",
          "Полоса разбита",
          "Встречный борт садится"
        ]
      }
    },
    {
      lang: "en",
      icon: "\u{1F504}",
      title: "Go Around",
      type: "emergency",
      phrases: [
        { label: "ATC \u2192 ACFT", text: "{cs}, go around", speaker: "atc" },
        { label: "ATC (with heading)", text: "{cs}, go around, right 217", speaker: "atc" }
      ],
      response: {
        title: "Your response",
        text: "Going around, {cs}"
      }
    }
  ]
});
