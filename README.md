# scrollLine

scrollLine is a plugin to display an ordered list of information as a simple interactive component. It's also a personal experiment for me to try writing a component without heavily relying on jQuery. Here, it's only being used for a few helper methods, such as the onload handler and $.extend.

you initialize this plugin on an ordered list and it will be transformed into either a vertical or horizontal series of elements which kind of works like a slideshow. The primary element will take up much of the space of the component, while the list can be navigated with the arrow keys. This component will also use ARIA attributes to try and be as natively accessible as possible.

Shooting for IE9+ support, and all modern browsers.

## TODO

- [ ] Actually get scrollLine working
- [ ] Support for any content inside item
- [ ] Support for defining content via JSON
- [ ] Maybe get a scrollbar working?