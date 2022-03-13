var pipeline = [
  {
    $match: {
      airplane: /747|380/,
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      foreignField: "airlines",
      localField: "airline.name",
      as: "alliance",
    },
  },
  {
    $unwind: "$alliance",
  },
  {
    $group: {
      _id: "$alliance.name",
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1 },
  },
];

db.air_routes.aggregate(pipeline).pretty();
