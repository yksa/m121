var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      generes: { $nin: ["Crime", "Horror"] },
      $or: [{ rated: "PG" }, { rated: "G" }],
      languages: { $all: ["English", "Japanese"] },
    },
  },
];

var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Japanese"] },
    },
  },
];

var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Japanese"] },
    },
  },
  {
    $project: {
      title: 1,
      rated: 1,
      _id: 0,
    },
  },
];

var pipeline = [
  {
    $project: { gg: { $split: ["$title", " "] } },
  },
];
