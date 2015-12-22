angular.module('serialApp', [])
	.controller('mainController', function ($scope, $http) {
        $scope.formData = {};
        $scope.serialOp = {};
        //Get current serial numbers
        $http.get('/api/serial')
            .success(function(data) {
                $scope.serialOp = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });

        $scope.createNSerial = function(howMany) {
             for(var i=0; i< howMany; i++) {
               $scope.createSerial(); //console.log(i);
            }   
        }
        $scope.createSerial = function() {            
            $http.post('/api/serial/new')
            .success(function(data) {
                $scope.formData = {};
                $scope.serialOp = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
        }
        $scope.deleteSerialNumber = function(serialID) {
            $http.delete('/api/serial/'+serialID)
            .success(function(data) {
                $scope.serialOp = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
        } 
        $scope.deleteNSerialNumber = function(howMany) {
            $http.delete('/api/serial/latest/'+howMany)
                .success(function(data) {
                    $scope.serialOp = data;
                    console.log(data);
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });
        }
        $scope.voidSerialNumber = function(serialID) {
            $http.put('/api/serial/void/'+serialID)
                .success(function(data) {
                    $scope.serialOp = data;
                    console.log(data);
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });
        }
        $scope.voidNSerialNumber = function(howMany) {
            $http.put('/api/serial/latest/void/'+howMany)
                .success(function(data) {
                    $scope.serialOp = data;
                    console.log(data);
                })
                .error(function(error) {
                    console.log(data);
                });
        }
});
