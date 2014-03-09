// Declare and initalize site-wide variables
// Make sure that jQuery variables begin with the dollar sign ('$')
var $container = $('#container');
var $pageSpecific = $('.page-specific');
var $stateIndicator = $('.state-indicator');
var $fullBackground = $('.full-background');
var $otherModal = $('#other-modal');
var $sharable = $('#sharable');
var $foldable = $('.foldable');
var $loader = $('.loader');
var $errors = $('#alert-section');
var $allPoliticians = $('#politicians-result');

var warmColors = ['#A32421', '#DB5D31', '#EDA23F', '#F2CB67', '#D7BF58'];
var coolColors = ['#084769', '#388585', '#79BD9A', '#A8DBA8', '#CEF0B7'];
var monoColors = ['#333333', '#BBBBBB'];

var dataPartners = '<h4 class="text-center">Where do you get your data?</h4><ul class="data-partners"><li><a href="http://www.opensecrets.org/" target="_blank"><img src="/assets/open-secrets.png"></a></li><li><a href="http://sunlightfoundation.com/" target="_blank"><img src="/assets/sunlight-foundation.png"></a></li><li><a href="http://congress.gov" target="_blank"><img src="/assets/congress-gov.png"></a></li><li><a href="https://www.govtrack.us/" target="_blank"><img src="/assets/govtrack.png"></a></li></ul>';