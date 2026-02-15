registerSection({
  id: "lso-calls",
  category: "carrier",
  order: 4,
  number: "3.4",
  title: { ru: "Команды LSO", en: "LSO Calls" },
  type: "terms",
  cardTitle: { ru: "Команды за \u00BE и \u00BD мили", en: "Calls at \u00BE and \u00BD mile" },
  cardIcon: "\u{1F4E2}",
  cardType: "carrier",
  terms: [
    { name: "\"You're high\"", def: "Выше глиссады / Above glideslope (\u22654.9\u00B0)" },
    { name: "\"You're low, POWER\"", def: "Ниже глиссады / Below glideslope (\u22642.7\u00B0)" },
    { name: "\"Lined up left/right\"", def: "Левее/правее посадочного курса (\u22651.7\u00B0)" },
    { name: "\"You're fast\"", def: "Скорость велика — увеличь AoA" },
    { name: "\"You're slow\"", def: "Скорость мала — уменьши AoA" },
    { name: "\"Easy with the nose\"", def: "Плавней по тангажу (>5\u00B0/сек)" },
    { name: "\"Easy with your wings\"", def: "Плавней по крену (>20\u00B0)" },
    { name: "\"Power, Power, POWER\"", def: "Проваливаешься! Обороты!" },
    { name: "\"Wave off \u00D73\"", def: "Уход на следующий круг" },
    { name: "\"Wave off, foul deck\"", def: "Уход — палуба занята" },
    { name: "\"Bolter \u00D73\"", def: "Гак не зацепил трос — взлетай!" }
  ]
});
