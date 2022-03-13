var pipeline = [
  {
    $match: {
      "imdb.rating": { $gt: 0 },
      year: { $gte: 2010, $lte: 2015 },
      runtime: { $gte: 90 },
    },
  },
  {
    $unwind: "$genres",
  },
  {
    $group: {
      _id: {
        year: "$year",
        genre: "$genres",
      },
      average_rating: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: { "_id.year": -1, average_rating: -1 },
  },
];

var pipeline = [
  {
    $match: {
      "imdb.rating": { $gt: 0 },
      year: { $gte: 2010, $lte: 2015 },
      runtime: { $gte: 90 },
    },
  },
  {
    $unwind: "$genres",
  },
  {
    $group: {
      _id: {
        year: "$year",
        genre: "$genres",
      },
      average_rating: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: { "_id.year": -1, average_rating: -1 },
  },
  {
    $group: {
      _id: "$_id.year",
      genre: { $first: "$_id.genre" },
      average_rating: { $first: "$average_rating" },
    },
  },
  {
    $sort: { _id: -1 },
  },
];

db.movies.aggregate(pipeline);

// Highlights:
// * $unwind only works on array values
// * There are two forms for unwind, short form and long form
// * Using unwind on large collections with big documents may lead to performance issues.
