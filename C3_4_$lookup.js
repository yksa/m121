var pipeline = [
  {
    $lookup: {
      from: "air_airlines",
      localField: "airlines",
      foreignField: "name",
      as: "airlines",
    },
  },
];

db.air_alliances.aggregate(pipeline).pretty();

// * The from collection cannot be sharded
// * The from collection must be in the same database
// * The values in localField and foreignFeild are matched on equality
// * as can be any name, but if it exists in the working document that field will be overwritten
