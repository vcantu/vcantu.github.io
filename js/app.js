angular.module('me', [])
    .controller('MainController', ['$document', '$window', '$scope', function($document, $window, $scope) {
        var ctrl = this;
        ctrl.growHeader = true;
        $document.on('scroll', function() {
            if ($window.scrollY < 170 && !ctrl.growHeader) {
                ctrl.growHeader = true;
                $scope.$apply();
            }
            if ($window.scrollY > 220 && ctrl.growHeader) {
                ctrl.growHeader = false;
                $scope.$apply();
            }
        })
    }]);