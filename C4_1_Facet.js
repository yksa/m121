db.companies.createIndex({ description: "text", overview: "text" });
var pipeline = [
  {
    $match: {
      $text: { $search: "network" },
    },
  },
  {
    $sortByCount: "$category_code",
  },
];

var pipeline = [
  {
    $match: { $text: { $search: "network" } },
  },
  {
    $unwind: "$offices",
  },
  {
    $match: { "offices.city": { $ne: "" } },
  },
  {
    $sortByCount: "$offices.city",
  },
];

db.companies.aggregate(pipeline);
