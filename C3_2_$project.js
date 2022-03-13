db.icecream_data.aggregate();

var pipeline = [
  {
    $project: {
      _id: 0,
      max_high: {
        $reduce: {
          input: "$trends",
          initialValue: -Infinity,
          in: {
            $cond: [
              { $gt: ["$$this.avg_high_tmp", "$$value"] },
              "$$this.avg_high_tmp",
              "$$value",
            ],
          },
        },
      },
    },
  },
];

var pipeline = [
  {
    $project: {
      _id: 0,
      max_high: {
        $max: "$trends.avg_high_tmp",
      },
    },
  },
];

var pipeline = [
  {
    $project: {
      _id: 0,
      max_low: {
        $min: "$trends.avg_high_tmp",
      },
    },
  },
];

var pipeline = [
  {
    $project: {
      _id: 0,
      average_cpi: { $avg: "$trends.icecream_cpi" },
      cpi_deviation: { $stdDevPop: "$trends.icecream_cpi" },
    },
  },
];

var pipeline = [
  {
    $project: {
      _id: 0,
      "yearly_sales (millions)": { $sum: "$trends.icecream_sales_in_millions" },
    },
  },
];
