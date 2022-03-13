db.movies.aggregate([
  {
    $group: { _id: "$year" },
  },
]);

var pipeline = [
  {
    $group: { _id: "$year" },
  },
];

var pipeline = [
  {
    $group: { _id: "$year", num_films_in_year: { $sum: 1 } },
  },
];

var pipeline = [
  {
    $group: { _id: "$year", num_films_in_year: { $sum: 1 } },
  },
  {
    $sort: { num_films_in_year: -1 },
  },
];

var pipeline = [
  {
    $group: {
      _id: {
        numDirectors: {
          $cond: [{ $isArray: "$directors" }, { $size: "$directors" }, 0],
        },
      },
      numFilms: { $sum: 1 },
      averageMetacritic: { $avg: "$metacritic" },
    },
  },
  {
    $sort: { "_id.numDirectors": -1 },
  },
];

db.movies.findOne({ directors: { $size: 44 } });

var pipeline = [
  {
    $group: {
      _id: null,
      count: { $sum: 1 },
    },
  },
];

var pipeline = [
  {
    $match: { metacritic: { $gte: 0 } },
  },
  {
    $group: {
      _id: null,
      averageMetacritic: { $avg: "$metacritic" },
    },
  },
];

// Summary
// * _id is where to specify what incoming documents should be grouped on
// * Can use all accumulator expressions within $group
// * $group can be used multiple times within a pipeline
// * It may be necessary to sanitize incoming data
