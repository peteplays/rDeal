module.exports = function($scope, $http) {

    $scope.getDBCheck = function() {
        $http.get('/dbCheck')
            .then(function(response) {
                if(response.data.db == 'ok') {
                    $scope.dbActive = true;
                    $scope.getDBCount();
                } else {
                    console.log(response.data);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    };
    $scope.getDBCheck();

    $scope.getAllNames = function() {
        $http.get('/dbGetAllNames')
            .then(function(response) {
                $scope.outputGetData = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
    };

    $scope.getDBCount = function() {
        $http.get('/dbCount')
            .then(function(response) {
                $scope.outputDBCountRes = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
    };

    $scope.postFindName = function(name) {
        if(name) {
            name = name.toLowerCase();
            var data = { name: name };
            $http.post('/dbFindName', data)
                .then(function(response) {
                    $scope.inputFeedback = response.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    };

  $scope.postInsertName = function(name, color, fun) {
        if(name && color && fun) {
            name = name.toLowerCase();
            color = color.toLowerCase();
            fun = fun.toLowerCase();
            var data = { name: name, color: color, fun: fun };
            $http.post('/dbInsert', data)
                .then(function(response) {
                    $scope.inputFeedback = response.data;
                    $scope.getDBCount();
                    $scope.getAllNames();
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
     };

     $scope.postDeleteName = function(name) {
        if(name) {
            name = name.toLowerCase();
            var data = { name: name };
            $http.post('/dbDelete', data)
                .then(function(response) {
                    $scope.inputFeedback = response.data;
                    $scope.getDBCount();
                    $scope.getAllNames();
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    };

    $scope.postUpdateVal = function(name, field, attr) {
        if(name && field && attr) {
            name = name.toLowerCase();
            var data = {};
            data.name = name;
            data[field.toLowerCase()] = attr.toLowerCase();
            $http.post('/dbUpdate', data)
                .then(function(response) {
                    $scope.inputFeedback = response.data;
                    $scope.getAllNames();
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    };

};