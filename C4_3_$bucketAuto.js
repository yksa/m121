var pipeline = [
  {
    $match: { "offices.city": "New York" },
  },
  {
    $bucketAuto: {
      groupBy: "$founded_yeaar",
      buckets: 5,
    },
  },
];

var pipeline = [
  {
    $match: { "offices.city": "New York" },
  },
  {
    $bucketAuto: {
      groupBy: "$founded_yeaar",
      buckets: 5,
      output: {
        total: { $sum: 1 },
        average: { $avg: "$number_of_employees" },
      },
    },
  },
];

db.companies.aggregate(pipeline);
