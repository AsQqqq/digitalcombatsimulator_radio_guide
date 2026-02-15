registerSection({
  id: "emergency-land",
  category: "emergency",
  order: 2,
  number: "E.2",
  title: { ru: "Экстренная посадка", en: "Emergency / Priority Landing" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F6A8}",
      title: "Экстренная посадка",
      type: "emergency",
      phrases: [
        { label: "Борт \u2192 РП", text: "Сенаки, {cs}, запрашиваю экстренную", speaker: "pilot" }
      ],
      explanation: {
        title: "Что это значит",
        text: "После запроса РП начнёт векторение на ближайший посадочный курс. Докладывайте неисправности: отказ двигателей, гидросистемы, навигации, стойки шасси и т.д."
      }
    },
    {
      lang: "en",
      icon: "\u{1F6A8}",
      title: "Priority Landing (MAYDAY)",
      type: "emergency",
      phrases: [
        { label: "ACFT \u2192 ATC", text: "MAYDAY MAYDAY MAYDAY, {cs}, request priority landing", speaker: "pilot" }
      ],
      explanation: {
        title: "What it means",
        text: "ATC will vector you to the nearest approach course. Report all failures: engine, hydraulics, nav, gear, etc."
      }
    }
  ]
});
