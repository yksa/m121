// Problem:

// Let's find how many movies in our movies collection are a "labor of love", where the same person appears in cast, directors, and writers

// Hint: You will need to use $setIntersection operator in the aggregation pipeline to find out the result.

// Note that your dataset may have duplicate entries for some films. You do not need to count the duplicate entries.

// To get a count after you have defined your pipeline, there are two simple methods.

// With our first $match stage, we filter out documents that are not an array or have an empty array for the fields we are interested in.
var stage1 = {
  $match: {
    cast: { $elemMatch: { $exists: true } },
    directors: { $elemMatch: { $exists: true } },
    writers: { $elemMatch: { $exists: true } },
  },
};

// Next is a $project stage, removing the _id field and retaining both the directors and cast fields. We replace the existing writers field with a new computed value, cleaning up the strings within writers
var stage2 = {
  $project: {
    _id: 0,
    cast: 1,
    directors: 1,
    writers: {
      $map: {
        input: "$writers",
        as: "writer",
        in: {
          $arrayElemAt: [{ $split: ["$$writer", " ("] }, 0],
        },
      },
    },
  },
};

// We use another $project stage to computer a new field called labor_of_love that ensures the intersection of cast, writers, and our newly cleaned directors is greater than 0. This definitely means that at least one element in each array is identical! $gt will return true or false.
var stage3 = {
  $project: {
    labor_of_love: {
      $gt: [
        { $size: { $setIntersection: ["$cast", "$directors", "$writers"] } },
        0,
      ],
    },
  },
};

// Lastly, we follow with a $match stage, only allowing documents through where labor_of_love is true. In our example we use a $match stage, but itcount() works too.
// {
//     $match: { labor_of_love: true }
//   },
//   {
//     $count: "labors of love"
//   }

//   // or

//     {
//       $match: { labor_of_love: true }
//     }
//   ]).itcount()

db.movies.aggregate([
  {
    $match: {
      cast: { $elemMatch: { $exists: true } },
      directors: { $elemMatch: { $exists: true } },
      writers: { $elemMatch: { $exists: true } },
    },
  },
  {
    $project: {
      _id: 0,
      cast: 1,
      directors: 1,
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
  {
    $project: {
      labor_of_love: {
        $gt: [
          { $size: { $setIntersection: ["$cast", "$directors", "$writers"] } },
          0,
        ],
      },
    },
  },
  {
    $match: { labor_of_love: true },
  },
  {
    $count: "labors of love",
  },
]);
