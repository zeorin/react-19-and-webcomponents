const registerCustomElement = (tag: string, ctor: CustomElementConstructor) => {
	if (!window.customElements.get(tag)) {
		window.customElements.define(tag, ctor);
	} else {
		document.querySelectorAll(tag).forEach((node) => {
			Object.setPrototypeOf(node, ctor.prototype);
			(node as Element & { connectedCallback: () => void }).connectedCallback();
		});
	}
};

type Colour = NonNullable<React.CSSProperties["color"]>;

class SchalkExampleElement extends HTMLElement {
	inner = this.attachShadow({ mode: "open" });
	colour?: Colour;

	static get observedAttributes() {
		return ["colour"];
	}

	constructor() {
		super();
	}

	attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
		if (name === "colour" && oldValue !== newValue) {
			const element = this.inner.querySelector("input");
			if (!element) return;
			element.value = newValue as string;
			this.colour = newValue as string;
		}
	}

	connectedCallback() {
		const colour = this.getAttribute("colour");

		this.inner.innerHTML = /* html */ `
      <label>
        <span>Colorize!</span>
        <input value="${colour ?? ""}">
        <button>Apply</button>
      </label>
    `;

		this.inner.querySelector("button")?.addEventListener("click", () => {
			const value = this.inner.querySelector("input")?.value;

			if (!value) return;

			this.colour = value;

			const payload = new CustomEvent("ColourChange", {
				detail: value,
				bubbles: true,
				composed: true,
			});

			this.dispatchEvent(payload);
		});
	}
}

registerCustomElement("schalk-example", SchalkExampleElement);

export const SchalkExample = "schalk-example";

interface MyCustomEvent<D = unknown, C = unknown, T = unknown>
	extends CustomEvent<D> {
	currentTarget: C & EventTarget;
	target: T & EventTarget;
}

interface ColourChangeEvent<T = Element> extends MyCustomEvent<Colour, T> {}

type ColourChangeEventHandler<T = Element> = {
	bivarianceHack(event: ColourChangeEvent<T>): void;
}["bivarianceHack"];

interface SchalkExampleHTMLAttributes<T> extends React.HTMLAttributes<T> {
	colour?: Colour | undefined;
	onColourChange?: ColourChangeEventHandler<T> | undefined;
	onColourChangeCapture?: ColourChangeEventHandler<T> | undefined;
}

export interface SchalkExampleJSXIntrinsicElement {
	"schalk-example": React.DetailedHTMLProps<
		SchalkExampleHTMLAttributes<SchalkExampleElement>,
		SchalkExampleElement
	>;
}
