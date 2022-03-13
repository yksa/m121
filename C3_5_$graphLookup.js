var pipeline = [
  {
    $match: { name: "Eliot" },
  },
  {
    $graphLookup: {
      from: "parent_reference",
      startWith: "$_id",
      connectFromField: "_id",
      connectToField: "reports_to",
      as: "all_reports",
    },
  },
];

var pipeline = [
  {
    $match: { name: "Shannon" },
  },
  {
    $graphLookup: {
      from: "parent_reference",
      startWith: "$reports_to",
      connectFromField: "reports_to",
      connectToField: "_id",
      as: "bosses",
    },
  },
];

db.parent_reference.aggregate(pipeline);

var pipeline = [
  {
    $match: { name: "Dev" },
  },
  {
    $graphLookup: {
      from: "child_reference",
      startWith: "$direct_reports",
      connectFromField: "direct_reports",
      connectToField: "name",
      as: "all_reports",
    },
  },
];

var pipeline = [
  {
    $match: { name: "Dev" },
  },
  {
    $graphLookup: {
      from: "child_reference",
      startWith: "$direct_reports",
      connectFromField: "direct_reports",
      connectToField: "name",
      as: "till_2_level_reports",
      maxDepth: 1
    },
  },
];

var pipeline = [
  {
    $match: { name: "Dev" },
  },
  {
    $graphLookup: {
      from: "child_reference",
      startWith: "$direct_reports",
      connectFromField: "direct_reports",
      connectToField: "name",
      as: "descendants",
      maxDepth: 1,
      depthField: 'level'
    },
  },
];

db.child_reference.aggregate(pipeline).pretty();
