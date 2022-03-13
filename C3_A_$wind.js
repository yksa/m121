var pipeline = [
  {
    $match: {
      languages: "English",
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numFilms: { $sum: 1 },
      average_rating: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: {
      numFilms: -1,
    },
  },
];

db.movies.aggregate(pipeline);
