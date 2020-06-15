angular.module('me', ['ngAnimate'])
    .controller('MainController', ['$document', '$window', '$scope', '$http',
        function($document, $window, $scope, $http) {
        var ctrl = this;
        ctrl.growHeader = true;

        console.log('controller started');

        $document.on('scroll', function() {
            conosole.log($window.scrollY);
            if ($window.scrollY < 80 && !ctrl.growHeader) {
                ctrl.growHeader = true;
                $scope.$apply();
            }
            if ($window.scrollY > 100 && ctrl.growHeader) {
                ctrl.growHeader = false;
                $scope.$apply();
            }
        });

        ctrl.links = {
            email: {
                link: 'mailto:viviano@cantu.info',
                icon: 'mdi-email-outline',
                name: 'email'
            },
            github: {
                link: 'https://github.com/vcantu',
                icon: 'mdi-code-tags',
                name: 'github'
            },
            linkedin: {
                link: 'https://www.linkedin.com/in/viviano-cantu-00113a113',
                icon: 'mdi-account-outline',
                name: 'linkedin'
            },
            resume: {
                link: 'CV.pdf',
                icon: 'mdi-file-document-box-outline',
                name: 'resume'
            }
        };


        ctrl.experience = {
            ar: {
                link: 'https://www.amazonrobotics.com/#/',
                color: 'orange',
                org: 'Amazon Robotics',
                title: 'Solutions Engineer',
                from: 'July 2018',
                to: 'December 2018',
                they: 'make robots for Amazon.',
                i: 'developed mission critical web-apps to help fulfillment associates solve issues quicker. ' +
                   'Developed new features for the sustainability of my team\'s existing products. ' +
                   'Met with people across AR to collect requirements for apps and features developed. ',
                used: [ 'AngularJS', 'Java', 'DynamoDB', 'SQS', 'S3', 'SQL' ],
                _collapsed: false
            },
            axon: {
                link: 'https://www.axon.com/',
                color: 'yellow',
                org: 'Axon/TASER',
                title: 'Data Analyst & Product Manager',
                from: 'July 2017',
                to: 'December 2017',
                they: 'sell body cameras and TASERS.',
                i: 'started new market and competitive analysis program. ' +
                   'Constructed and analyzed US police department market database and reported to executives. ' +
                   'Ideated & helped defined Axon’s future devices. ' +
                   'Visited police agencies across the country to conduct user studies and surveys.',
                used: [ 'Salesforce', 'Excel', 'Python', 'PowerBI' ],
                _collapsed: true
            },
            dell: {
                link: 'https://www.dell.com/en-us',
                color: 'blue',
                org: 'Dell',
                title: 'Product Manager',
                from: 'May 2015',
                to: 'September 2015',
                they: 'sell computers.',
                i: 'defined and managed the development of new software for Dell devices like the ' +
                   '[Dell Canvas](https://www.dell.com/en-us/work/shop/workstations-isv-certified-dell/dell-canvas-27/spd/dell-canvas-kv2718d/s001pdc27us). ' +
                   'Met with various technology partners and defined their required contribution to the products. ' +
                   'Coordinated with other teams (SW, UX, Design, QA, etc.) to deliver the products.',
                used: [ 'Jira' ],
                _collapsed: true
            },
            sb3: {
                link: 'http://ileadtransfer.info/',
                color: 'pink',
                org: 'SB3 Inc',
                title: 'Android & iOS Developer',
                they: 'provide software consulting.',
                i: 'Defined, Designed & Developed the Android & iOS clients for two separate apps. ' +
                   'Managed the UI and backend teams to deliver the apps.',
                used: [ 'Java', 'AndroidSDK', 'Swift', 'ObjectiveC', 'GoogleMapsAPI', 'YelpAPI'],
                _collapsed: true
            }
        };

        ctrl.projects = {
            novakey: {
                name: 'NovaKey',
                link: 'http://novakey.org',
                title: 'Android keyboard',
                color: 'blue',
                icon: 'images/novakey/novakey_icon.png',
                description: 'md://novakey-description',
                _collapsed: true
            },
            ryzeup: {
                name: 'Ryze Up',
                link: 'http://ryzeup.org',
                color: 'pink',
                title: 'Website',
                description: 'md://ryzeup-description',
                _collapsed: true
            },
        };


        // Loads all md://FILENAME into that variable
        ctrl.setFileData = function(obj, key, url) {
            var text = url;
            if (!url
                && obj.hasOwnProperty(key)
                && typeof obj[key] === 'string')
                text = obj[key];

            if (text) {
                var match = text.match(/md\:\/\/(.*)/);
                if (match) {
                    $http.get('markdown/' + match[1])
                        .then(function (response) {
                            obj[key] = response.data;
                        })
                }
            }
        };
        ctrl.loadFileData = function (obj) {
            for (var key in obj) {
                ctrl.setFileData(obj, key)
            }
        };

        // load variable md
       ctrl.setFileData(this, 'intro', 'md://intro');
        // load project md
        Object.keys(ctrl.projects).forEach(function (key) {
            ctrl.loadFileData(ctrl.projects[key])
        });
        // load experience md
        Object.keys(ctrl.experience).forEach(function (key) {
            ctrl.loadFileData(ctrl.experience[key])
        });

        ctrl.isLightText = function(object) {
            return object.color === 'blue';
        }
    }])
    .filter('markdownsl', function($sce) {
        return function (text) {
            var converter = new showdown.Converter({
                openLinksInNewWindow: true,
                extensions: [
                    {
                        // gets rid of initial p tags
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
            return $sce.trustAsHtml(converter.makeHtml(text));
        }
    })
    .filter('markdown', function($sce) {
        return function (text) {
            var converter = new showdown.Converter({
                openLinksInNewWindow: true
            });
            return $sce.trustAsHtml(converter.makeHtml(text));
        }
    });
