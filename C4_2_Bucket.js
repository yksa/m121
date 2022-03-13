var pipeline = [
  {
    $match: { founded_year: { $gt: 1980 }, number_of_employees: { $ne: null } },
  },
  {
    $bucket: {
      groupBy: "$number_of_employees",
      boundaries: [0, 20, 50, 100, 500, 1000, Infinity],
      default: "Other",
    },
  },
];

var pipeline = [
  {
    $match: { founded_year: { $gt: 1980 }, number_of_employees: { $ne: null } },
  },
  {
    $bucket: {
      groupBy: "$number_of_employees",
      boundaries: [0, 20, 50, 100, 500, 1000, Infinity],
      default: "Other",
      output: {
        total: { $sum: 1 },
        average: { $avg: "$number_of_employees" },
        categories: { $addToSet: "$category_code" },
      },
    },
  },
];

db.companies.aggregate(pipeline);
