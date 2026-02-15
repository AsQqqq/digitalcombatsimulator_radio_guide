registerSection({
  id: "decompression",
  category: "emergency",
  order: 7,
  number: "E.7",
  title: { ru: "Разгерметизация", en: "Explosive Decompression" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F4A8}",
      title: "Разгерметизация",
      type: "emergency",
      phrases: [
        { label: "Борт", text: "{cs}, аварийное снижение, полная разгерметизация", speaker: "pilot" },
        { label: "РП (всем бортам)", text: "Внимание, всем бортам, в районе Сенаки выполняется аварийное снижение с эшелона ...", speaker: "atc" }
      ]
    },
    {
      lang: "en",
      icon: "\u{1F4A8}",
      title: "Explosive Decompression",
      type: "emergency",
      phrases: [
        { label: "ACFT", text: "{cs}, EMERGENCY DESCENT, explosive decompression", speaker: "pilot" },
        { label: "ATC (all aircraft)", text: "Attention all aircraft in the vicinity of Senaki, emergency descent in progress from flight level ...", speaker: "atc" }
      ]
    }
  ]
});
