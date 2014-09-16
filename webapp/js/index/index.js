(function() {
    var utils = window._utils;
    var app = angular.module('workLogApp', []);
    app.controller('workLogController', ['$scope', '$http',
        function($scope, $http) {
            var weeks = utils.getRecentWeeks(7),
                dayFmt = utils.getFormat('yyyy-MM-dd'),
                currentWeek = {};
            weeks[0].text = weeks[0].text + ' (本周)';
            weeks[0].canEdit = true;
            $scope.weeks = weeks;

            $scope.currentWeekRecs = [];

            $scope.switchWeek = function(week) {
                if (week && week.start && week.end && currentWeek != week) {
                    var d, d_str,
                        e_str = dayFmt(week.end),
                        recs = [],
                        i;
                    week.active = true;
                    currentWeek.active = false;
                    currentWeek = week;

                    $http.post(
                        './recoder/load', {
                            start: dayFmt(week.start),
                            end: e_str
                        }
                    ).success(function(rs) {
                        if (rs.type == 'success') {
                            for (i = 0; i < 7; i++) {
                                d = utils.addDays(week.start, i);
                                d_str = dayFmt(d);
                                var rec = $.extend({
                                    content: '',
                                    _content: '',
                                    recordTime: '',
                                    date: d_str,
                                    canEdit: week.canEdit
                                }, rs.data[i]);
                                rec._content = rec.content;
                                recs.push(rec);
                                if (d_str === e_str) {
                                    break;
                                }
                            }
                            $scope.currentWeekRecs = recs;
                        }
                    }).
                    error(function() {});
                }
            };

            $scope.switchWeek(weeks[0]);

            $scope.submitRecoder = function(rec) {
                $http.post(
                    './recoder/add', rec
                ).success(function(rs) {
                    if (rs.type == 'success') {
                        $.extend(rec, rs.data);
                        rec.editing = false;
                    }
                }).
                error(function() {});
            };
        }
    ]);
})()