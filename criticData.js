const critics = [
  {
    name: "Robert Parker",
    awards: [
      "Order of Merit of the French Republic",
      "James Beard Foundation Award",
    ],
    experience: 40,
  },
  {
    name: "Jancis Robinson",
    awards: [
      "Officer of the Order of the British Empire",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 45,
  },
  {
    name: "James Suckling",
    awards: ["Wine Spectator Critics Award", "Decanter Power List"],
    experience: 35,
  },
  {
    name: "Tim Atkin",
    awards: [
      "British Wine Writer Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 30,
  },
  {
    name: "Neal Martin",
    awards: [
      "Roederer International Wine Writers’ Award",
      "Wine Writer of the Year",
    ],
    experience: 25,
  },
  {
    name: "Antonio Galloni",
    awards: ["Wine Advocate Critics Award", "Best Wine Critic - Vinous"],
    experience: 20,
  },
  {
    name: "Stephen Tanzer",
    awards: ["James Beard Foundation Award", "Wine Spectator Critics Award"],
    experience: 35,
  },
  {
    name: "Lisa Perrotti-Brown",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 20,
  },
  {
    name: "Allen Meadows",
    awards: [
      "International Wine Challenge Judge",
      "Wine Spectator Critics Award",
    ],
    experience: 25,
  },
  {
    name: "Steven Spurrier",
    awards: ["Decanter Power List", "Wine Spectator Critics Award"],
    experience: 45,
  },
  {
    name: "Eric Asimov",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 25,
  },
  {
    name: "Karen MacNeil",
    awards: ["James Beard Foundation Award", "Wine Enthusiast Wine Star Award"],
    experience: 30,
  },
  {
    name: "Oz Clarke",
    awards: [
      "Order of the British Empire",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 40,
  },
  {
    name: "Tom Stevenson",
    awards: [
      "Roederer International Wine Writers’ Award",
      "Wine Spectator Critics Award",
    ],
    experience: 35,
  },
  {
    name: "David Schildknecht",
    awards: [
      "Wine Spectator Critics Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 25,
  },
  {
    name: "Raymond Blake",
    awards: [
      "Wine Enthusiast Wine Star Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 20,
  },
  {
    name: "Elin McCoy",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 30,
  },
  {
    name: "Fiona Beckett",
    awards: [
      "Roederer International Wine Writers’ Award",
      "Best Drink Writer - Fortnum & Mason",
    ],
    experience: 20,
  },
  {
    name: "Matthew Jukes",
    awards: [
      "International Wine Challenge Judge",
      "Wine Spectator Critics Award",
    ],
    experience: 25,
  },
  {
    name: "Sarah Jane Evans",
    awards: ["Master of Wine", "Roederer International Wine Writers’ Award"],
    experience: 30,
  },
  {
    name: "Jamie Goode",
    awards: [
      "Roederer International Wine Writers’ Award",
      "Wine Spectator Critics Award",
    ],
    experience: 20,
  },
  {
    name: "Michael Broadbent",
    awards: ["Order of the British Empire", "James Beard Foundation Award"],
    experience: 50,
  },
  {
    name: "Terry Theise",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 30,
  },
  {
    name: "Claude Dugat",
    awards: [
      "Wine Spectator Critics Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 35,
  },
  {
    name: "Michel Bettane",
    awards: ["Best Wine Writer - France", "Decanter Power List"],
    experience: 40,
  },
  {
    name: "Thierry Desseauve",
    awards: ["Best Wine Writer - France", "Wine Spectator Critics Award"],
    experience: 35,
  },
  {
    name: "Burghound Meadows",
    awards: [
      "International Wine Challenge Judge",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 25,
  },
  {
    name: "Richard Juhlin",
    awards: ["Decanter Power List", "Wine Spectator Critics Award"],
    experience: 30,
  },
  {
    name: "Nick Stock",
    awards: [
      "Best Wine Writer - Australia",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 25,
  },
  {
    name: "Tyson Stelzer",
    awards: ["Best Wine Writer - Australia", "Wine Spectator Critics Award"],
    experience: 20,
  },
  {
    name: "Max Allen",
    awards: ["Best Wine Writer - Australia", "James Beard Foundation Award"],
    experience: 25,
  },
  {
    name: "Jay McInerney",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 15,
  },
  {
    name: "Jordan Mackay",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 15,
  },
  {
    name: "Kelli White",
    awards: [
      "Best Young Wine Writer",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 10,
  },
  {
    name: "Victoria James",
    awards: [
      "Best Young Sommelier",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 10,
  },
  {
    name: "Alice Feiring",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 20,
  },
  {
    name: "Jon Bonné",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 15,
  },
  {
    name: "Hugh Johnson",
    awards: ["Order of the British Empire", "James Beard Foundation Award"],
    experience: 50,
  },
  {
    name: "André Dominé",
    awards: ["Best Wine Book - France", "Wine Spectator Critics Award"],
    experience: 30,
  },
  {
    name: "Linda Murphy",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 20,
  },
  {
    name: "Maggie Hoffman",
    awards: [
      "Best Drink Writer - America",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 15,
  },
  {
    name: "Paul Grieco",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 20,
  },
  {
    name: "Tom Cannavan",
    awards: ["Best Wine Website", "Roederer International Wine Writers’ Award"],
    experience: 25,
  },
  {
    name: "Will Lyons",
    awards: [
      "Roederer International Wine Writers’ Award",
      "Wine Spectator Critics Award",
    ],
    experience: 20,
  },
  {
    name: "Stuart Pigott",
    awards: ["Best Wine Writer - Germany", "Wine Spectator Critics Award"],
    experience: 25,
  },
  {
    name: "John Gilman",
    awards: [
      "Roederer International Wine Writers’ Award",
      "James Beard Foundation Award",
    ],
    experience: 20,
  },
  {
    name: "Rebecca Gibb",
    awards: ["Master of Wine", "Roederer International Wine Writers’ Award"],
    experience: 15,
  },
  {
    name: "Benjamin Lewin",
    awards: ["Master of Wine", "Roederer International Wine Writers’ Award"],
    experience: 20,
  },
  {
    name: "Jeannie Cho Lee",
    awards: ["Master of Wine", "Roederer International Wine Writers’ Award"],
    experience: 25,
  },
];

module.exports = critics