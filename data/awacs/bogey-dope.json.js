registerSection({
  id: "bogey-dope",
  category: "awacs",
  order: 2,
  number: "4.2",
  title: { ru: "Bogey Dope", en: "Bogey Dope" },
  cards: [
    {
      lang: "ru",
      icon: "\u{1F3AF}",
      title: "Запрос Bogey Dope (RU)",
      type: "awacs",
      phrases: [
        { label: "Борт", text: "Magic, {cs}, Bogey Dope", speaker: "pilot" },
        { label: "AWACS", text: "{cs}, Magic, BRAA, 257/15, 10 тысяч, идёт на восток", speaker: "atc" },
        { label: "AWACS (если чисто)", text: "{cs}, Magic, чисто", speaker: "atc" }
      ]
    },
    {
      lang: "en",
      icon: "\u{1F3AF}",
      title: "Bogey Dope Request (EN)",
      type: "awacs",
      phrases: [
        { label: "ACFT", text: "Magic, {cs}, Bogey Dope", speaker: "pilot" },
        { label: "AWACS", text: "{cs}, Magic, BRAA, 257/15, 10 thousand, drag east", speaker: "atc" }
      ]
    }
  ]
});
