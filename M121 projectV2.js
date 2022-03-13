var pipeline = [
  {
    $project: {
      _id: 0,
      name: 1,
      myWeight: {
        $multiply: [{ $divide: ["$gravity.value", 9.8] }, 55],
      },
    },
  },
];

var pipeline = [
  {
    $project: { gg: { $split: ["$title", " "] } },
  },
];

var pipeline = [
  {
    $match: {
      title: {
        $type: "string",
      },
    },
  },
  {
    $project: {
      title: { $split: ["$title", " "] },
      _id: 0,
    },
  },
  {
    $match: {
      title: { $size: 1 },
    },
  },
];

// There are times when we want to make sure that the field is an array, and that it is not empty. We can do this within $match
var pipeline = [
  {
    $match: {
      writers: { $elemMatch: { $exists: true } },
    },
  },
];

// "writers" : [ "Vincenzo Cerami (story)", "Roberto Benigni (story)" ]
// remove "(story)" from writers
var pipeline = [
  {
    $match: {
      writers: { $elemMatch: { $exists: true } },
    },
  },
  {
    $project: {
      writers: {
        $map: {
          input: "$writers",
          as: "writer",
          in: {
            $arrayElemAt: [
              {
                $split: ["$$writer", " ("],
              },
              0,
            ],
          },
        },
      },
    },
  },
];
