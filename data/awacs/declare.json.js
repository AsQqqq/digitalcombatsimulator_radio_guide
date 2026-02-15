registerSection({
  id: "declare",
  category: "awacs",
  order: 3,
  number: "4.3",
  title: { ru: "DECLARE — свой/чужой", en: "DECLARE — Friend/Foe" },
  cards: [
    {
      lang: "ru",
      icon: "\u2753",
      title: "DECLARE (RU)",
      type: "awacs",
      phrases: [
        { label: "Борт", text: "Magic, {cs}, группа, Bullseye 204/8, 12 тысяч, DECLARE", speaker: "pilot" },
        { label: "AWACS", text: "{cs}, Magic, группа, Bullseye 204/8, 12 тысяч, враг, одиночный контакт, фланкер", speaker: "atc" }
      ]
    },
    {
      lang: "en",
      icon: "\u2753",
      title: "DECLARE (EN)",
      type: "awacs",
      phrases: [
        { label: "ACFT", text: "Magic, {cs}, Group, Bullseye 204/8, 12 thousand, DECLARE", speaker: "pilot" },
        { label: "AWACS", text: "{cs}, Magic, Group, Bullseye 204/8, 12 thousand, hostile, single contact, flanker", speaker: "atc" }
      ]
    }
  ]
});
