registerSection({
  id: "taxi-cancel",
  category: "emergency",
  order: 3,
  number: "E.3",
  title: { ru: "Отмена руления", en: "Taxi Abort" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F6D1}",
      title: "Отмена руления",
      type: "emergency",
      phrases: [
        { label: "РП (пропуск борта)", text: "{cs}, Сенаки, пропустите борт", speaker: "atc" },
        { label: "РП (запрет)", text: "{cs}, Сенаки, руление запрещаю", speaker: "atc" }
      ]
    },
    {
      lang: "en",
      icon: "\u{1F6D1}",
      title: "Taxi Abort",
      type: "emergency",
      phrases: [
        { label: "ATC (give way)", text: "{cs}, give way to the fighter", speaker: "atc" },
        { label: "ATC (abort)", text: "{cs}, Senaki, abort taxiing", speaker: "atc" }
      ]
    }
  ]
});
