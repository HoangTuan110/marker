const m = require('mithril');
const mk = require('marked');
const d = require('dompurify'); 
const r = document.body;
const about_text = `
# Meet Marker
Marker is a simple, clean, and functional markdown editor.

Features:
- Built-in **Dark** theme
- **Safe** - Equipped with a HTML sanitizer to prevent XSS attacks.
- **Lightweight** (Kinda) - The bundled JS file is < 100kb.
- **Fast** - Load almost instantly.
- **Easy to use** - Just type your markdown and hit \`Preview\`.

# Tech
Marker uses the following to work properly:
- [Mithril](https://mithril.js.org) - Cool hyperscript web framework
- [Marked](https://marked.js.org) - Markdown-to-HTML converter
- [DOMPurify](https://github.com/cure53/DOMPurify) - Sanitize HTML output
- [ESbuild](https://esbuild.github.io) - Bundle the JS file
- [Water.css](https://watercss.kognise.dev/) - Black theme
- [Bitter](https://fonts.google.com/specimen/Bitter) - Newspaper-style font

An open source project by [@HoangTuan110](https://github.com/HoangTuan110). Made in Vietnam.

[Back](#!/)
`

// State
var state = {
	markdown: localStorage.md || "",
};

// Components
function About() {
	return {
		view: function() {
			return m("main", {
				innerHTML: d.sanitize(mk.marked(about_text))
			});
		}
	}
}

function View() {
	return {
		view: function() {
			return m("main", [
				m("div", {
					class: "markdown",
					innerHTML: d.sanitize(mk.marked("[Back](#!/)\n\n" + state.markdown))
				}),
			]);
		}
	}
}

function Main() {
	function update(e) {
		state.markdown = e.target.value;
		localStorage.md = state.markdown;
	}

	return {
		view: function() {
			return m("main", [
				m("h1", "Marker"),
				m("a", {href: "#!/about"}, "About"),
				m("p", "A simple and clean Markdown editor."),
				m("textarea", {
					rows: "25",
					placeholder: "Type your markdown here...",
					value: state.markdown,
					autofocus: true,
					oninput: (e) => update(e),
				}),
				m("a", {href: '#!/md'}, "Preview"),
			]);
		}
	}
};

m.route(r, "/", {
	"/": Main,
	"/about": About,
	"/md" : View,
});
