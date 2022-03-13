var pipeline = [
    {
        $match: {name: "TAP Portugal"}
    },
    {
        $graphLookup: {
            from: "air_routes",
            as: "chain",
            startWith: "$base",
            connectFromField: "dst_airport",
            connectToField: "src_airport",
            maxDepth: 1,
            restrictSearchWithMatch: { "airline.name": "TAP Portugal" }
        }
    }
];

db.air_airlines.aggregate(pipeline).pretty();