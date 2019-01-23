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
        });

        ctrl.experience = {
            AR: {
                link: 'https://www.amazonrobotics.com/#/',
                color: 'orange',
                org: 'Amazon Robotics',
                title: 'Solutions Engineer',
                from: 'July 2018',
                to: 'December 2018',
                they: 'provide robotics solutions for Amazon fulfillment.',
                i: 'developed mission critical apps to help fulfillment associates solve issues quicker. ' +
                   'Developed new features for the sustainability of the team\'s existing products. ' +
                   ' with people across AR to collect requirements for apps and features developed.',
                used: [ 'AngularJS', 'Java', 'DynamoDB', 'SQS', 'S3', 'SQL' ],
                _collapsed: true
            },
            AXON: {
                link: 'https://www.axon.com/',
                color: 'yellow',
                org: 'Axon/TASER',
                title: 'Data Analyst & Product Manager',
                from: 'July 2017',
                to: 'December 2017',
                they: 'provide products and services for law enforcement & emergency professionals.',
                i: 'started new market and competitive analysis program. ' +
                   'Constructed and analyzed US police department market database and reported to executives. ' +
                   'Ideated & helped defined Axon’s future devices. ' +
                   'Visited police agencies across the country to conduct user studies and surveys.',
                used: [ 'Salesforce', 'Excel', 'Python', 'PowerBI' ],
                _collapsed: true
            },
            DELL: {
                link: 'https://www.dell.com/en-us',
                color: 'blue',
                lightText: true,
                org: 'Dell',
                title: 'Product Manager',
                from: 'July 2016',
                to: 'December 2016',
                they: 'sell computers.',
                i: 'Defined and managed the development of new software for Dell devices like the ' +
                   '[Dell Canvas](https://www.dell.com/en-us/work/shop/workstations-isv-certified-dell/dell-canvas-27/spd/dell-canvas-kv2718d/s001pdc27us). ' +
                   'Met with various technology partners and defined their required contribution to the products. ' +
                   'Coordinated with other teams (SW, UX, Design, QA, etc.) to deliver the products.',
                used: [ 'Jira' ],
                _collapsed: true
            },
            SB3: {

            }
        }
    }])
    .filter('markdown', function($sce) {
        return function (x) {
            var converter = new showdown.Converter({
                openLinksInNewWindow: true,
                extensions: [
                    {
                        type: 'output',
                        filter: function (txt, conv, opts) {
                            var div = document.createElement('div');
                            var finalTxt = '';
                            div.innerHTML = txt;
                            for (var i = 0; i < div.children.length; ++i) {
                                if (div.children[i].tagName.toLowerCase() === 'p') {
                                    finalTxt += div.children[i].innerHTML;
                                }
                                return finalTxt;
                            }
                        }
                    }
                ]
            });
            return $sce.trustAsHtml(converter.makeHtml(x));
        }
    });