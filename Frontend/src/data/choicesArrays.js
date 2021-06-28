export const minAgeArr= [{index: "1",name: ["gt_min_age"], value:[0], label: "1 year"},
{index: "2",name: ["gt_min_age"], value:[4], label: "5 years"},
{index: "3",name: ["gt_min_age"], value:[9], label: "10 years"},
{index: "4",name: ["gt_min_age"], value:[12], label: "13 years"},
{index: "5",name: ["gt_min_age"], value:[15], label: "16 years"}]

export const ageRange= [{index: "1",name: ["lt_max_age"], value:[5], label: "0-4 years"},
{index: "2",name: ["gt_min_age", "lt_max_age"], value:[4,11], label: "5-10 years"},
{index: "3",name: ["gt_min_age", "lt_max_age"], value:[10, 14], label: "10-13 years"},
{index: "4",name: ["gt_min_age", "lt_max_age"], value:[13,17], label: "14-17 years"},
{index: "5",name: ["gt_min_age"], value:[17], label: "18+ years"}]

export const yearRange= [{index: "1",name: ["lt_publish_year"], value:[2000], label: "Pre 2000"},
{index: "2",name: ["gt_publish_year", "lt_publish_year"], value:[1999,2009], label: "2000-2008"},
{index: "3",name: ["gt_publish_year", "lt_publish_year"], value:[2008-2017], label: "2009-2016"},
{index: "4",name: ["gt_publish_year", "lt_publish_year"], value:[2017-2021], label: "2018-2020"},
{index: "5",name: ["publish_year"], value:[2021], label: "2021"}]

export const playerRange= [{index: "1",name: ["lt_max_players"], value:[2], label: "Solo"},
{index: "2",name: ["gt_min_players", "lt_max_players"], value:[1,4], label: "2-3"},
{index: "3",name: ["gt_min_players", "lt_max_players"], value:[3,7], label: "4-6"},
{index: "4",name: ["gt_min_players", "lt_max_players"], value:[6,11], label: "7-10"},
{index: "5",name: ["gt_min_players"], value:[10], label: "10+"}]

export const playtimeRange= [{index: "1",name: ["lt_max_playtime"], value:[30], label: "Under 30 mins"},
{index: "2",name: ["gt_min_playtime", "lt_max_playtime"], value:[29,61], label: "30-60 mins"},
{index: "3",name: ["gt_min_playtime", "lt_max_playtime"], value:[59,121], label: "60-120 mins"},
{index: "4",name: ["gt_min_playtime", "lt_max_playtime"], value:[119,181], label: "2-3 hours"},
{index: "5",name: ["gt_min_playtime"], value:[3], label: "Over 3 hours"}]

