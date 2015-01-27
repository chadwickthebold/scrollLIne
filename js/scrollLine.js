// requires jQuery for $.extend

// Declare scrollLine namespace$
var scrollLine = {};








// scrollLine factory
scrollLine.factory = function() {
	// Map to keep track of scrollLine instances
	var scrollLineMap = {}

	function create(id, config) {
		if( !scrollLineMap[id] ) {
			scrollLineMap[id] = scrollLine.instance(id, config);
		}

		return scrollLineMap[id];
	}

	function get(id) {
		return scrollLineMap[id];
	}

	function destroy(id) {
		if (scrollLineMap[id]) {
			scrollLineMap[id].destroy();
			delete scrollLineMap[id];
		}
	}


	// Expose public functions
	(function(self) {
		self.get = get,
		self.create = create,
		self.destoy = destroy
	}(this));

}






// scrollLine instance
scrollLine.instance = function(id, config) {
	var self = this,
			$me = document.getElementById(id),
			config = $.extend({}, scrollLine.instance.defaults, config)



	// navigate to the previous scrollLine element
	function navigatePrevious() {

	}

	// navigate to the next scrollLine element
	function navigateNext() {

	}

	// navigate to a specific scrollLine element
	function navigate() {

	}

	// add correct accessbility attributes
	function initializeAccessibility() {

	}

	// attach behavior events
	function attachKeyEvents() {

	}

	// add necessary classes to element
	function render() {
		var sl = $me,
				sl_container = $me.children,
				sl_elems = Array.prototype.slice.call($me.querySelectorAll('li'));

		sl.classList.add('scrollLine');
		sl.classList.add('scrollLine-'+config.type);
		sl_container[0].classList.add('scrollLine-container');
		sl_elems.forEach(function(elem, index, array) {
			elem.classList.add('scrollLine-item');
		});
		

	}

	// return to initial state
	function destroy() {

	}


	// Expose public functions
	(function(self) {
		self.$me = $me,
		self.config = config
	}(this));

	render();

}





// scrollLine instance defaults
scrollLine.instance.defaults = {
	type : "vertical"
}



