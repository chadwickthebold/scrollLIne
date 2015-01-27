// requires jQuery for $.extend

// Declare scrollLine namespace
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
			$me = document.getElementById(id), //DOM reference to the scrollLine wrapper
			config = $.extend({}, scrollLine.instance.defaults, config), //Configuration parameters
			sl_active, //Current active element
			sl_preactive, //Array of elements surrounding the current active element
			sl_elems; //Array of elements in the scrollLine






	// navigate to the previous scrollLine element
	function navigatePrevious() {
		if(sl_active.previousElementSibling) {
			navigate(sl_elems.indexOf(sl_active.previousElementSibling))
		}
	}






	// navigate to the next scrollLine element
	function navigateNext() {
		if(sl_active.nextElementSibling) {
			navigate(sl_elems.indexOf(sl_active.nextElementSibling))
		}
	}








	// navigate to a specific scrollLine element
	function navigate(index) {
		sl_elems = Array.prototype.slice.call($me.querySelectorAll('li')),
		sl_active = $me.querySelectorAll('.is-active'),
		sl_preactive = Array.prototype.slice.call($me.querySelectorAll('.is-preactive'))

		// remove existing classes
		if (sl_active) {
			sl_active[0].classList.remove('is-active');
			sl_active[0].tabIndex = -1;
		}

		if (sl_preactive) {
			sl_preactive.forEach(function(elem, index, array) {
				elem.classList.remove('is-preactive;')
				sl_preactive = [];
			});
		}

		//Find new elements and assign classes
		if (sl_elems[index-1]) {
			sl_preactive.push(sl_elems[index-1])
			sl_elems[index-1].classList.add('is-preactive')
		}
		if (sl_elems[index+1]) {
			sl_preactive.push(sl_elems[index+1])
			sl_elems[index+1].classList.add('is-preactive')
		}


		sl_active = sl_elems[index];
		sl_active.classList.add('is-active');


		// reassign accessibility attributes
		sl_active.tabIndex = 0;

	}








	// add correct accessbility attributes
	function initializeAccessibility() {
		$me.tabIndex = 0;

	}








	// attach behavior events
	function attachKeyEvents() {

		$me.addEventListener('keydown', function(e) {
			if (e.keyCode == 40) {
				navigateNext()
			} else if (e.keyCode == 38) {
				navigatePrevious();
			}
		});

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

		attachKeyEvents();
		initializeAccessibility();
		navigate(0);

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



