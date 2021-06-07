export const playersArr = [{index: "1", name: ["max_players"], value: [1], label: "solo"}, 
{index: "2", name:["gt_min_players", "lt_max_players"], value: [1, 5], label: "2-4"}, 
{index: "3", name:["gt_min_players", "lt_max_players"], value: [3, 7], label: "4-6"},
{index: "4", name:["gt_min_players", "lt_max_players"], value: [5, 9], label: "6-8"},
{index: "5", name:["gt_min_players"], value: [8], label: "9+"}]

export const playtimeArr= [{index: "1",name: ["lt_max_playtime"], value: [30], label: "<30"},
{index: "2",name:["min_playtime", "lt_max_playtime"], value: [30, 60], label: "30-59"}, 
{index: "3",name:["min_playtime", "lt_max_playtime"], value: [60, 120], label: "60-119"},
{index: "4",name:["min_playtime", "lt_max_playtime"], value: [120, 180], label: "120-180"},
{index: "5",name:["gt_min_playtime"], value: [180], label: "180+"}]

export const minAgeArr= [{index: "1",name: ["gt_min_age"], value:[0], label: "1 year"},
{index: "2",name: ["gt_min_age"], value:[4], label: "5 years"},
{index: "3",name: ["gt_min_age"], value:[9], label: "10 years"},
{index: "4",name: ["gt_min_age"], value:[12], label: "13 years"},
{index: "5",name: ["gt_min_age"], value:[15], label: "16 years"}]

export const yearsArr = [{index: "1", name: ["lt_year_published"], value: [2000], label: "pre 2000"}, 
{index: "2", name:["gt_year_published", "lt_year_published"], value: [2000, 2008], label: "2000-2007" }, 
{index: "3", name:["gt_year_published", "lt_year_published"], value: [2007, 2015], label: "2008-2014"},
{index: "4", name:["gt_year_published", "lt_year_published"], value: [2014, 2020], label: "2015-2019"},
{index: "5", name:["gt_year_published"], value: [2020], label: "2020+" }]