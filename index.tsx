let React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag == "function") {
      return tag(props);
    }

    var element = { tag, props: { ...props, children } };
    return element;
  }
};

const states = [];
let stateCursor = 0;

const useState = initialState => {
  const FROZENCURSOR = stateCursor;
  states[FROZENCURSOR] = states[FROZENCURSOR] || initialState;

  const setState = newState => {
    states[FROZENCURSOR] = newState;
    rerender();
  };

  stateCursor++;

  return [states[FROZENCURSOR], setState];
};

const App = () => {
  const [name, setName] = useState("person");
  const [count, setCount] = useState(0);

  return (
    <div className="react-2020">
      <h1>Hello, {name}!</h1>
      <input
        value={name}
        onchange={e => setName(e.target.value)}
        type="text"
        placeholder="name"
      />
      <h2>The count is: {count}</h2>
      <button onclick={() => setCount(count + 1)}>+</button>
      <button onclick={() => setCount(count - 1)}>-</button>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis
        omnis veniam id ipsum voluptatibus laudantium aliquid ab porro dicta
        tempore!
      </p>
    </div>
  );
};

const render = (reactElementOrStringOrNumber, container) => {
  if (["string", "number"].includes(typeof reactElementOrStringOrNumber)) {
    container.appendChild(
      document.createTextNode(String(reactElementOrStringOrNumber))
    );
    return;
  }

  const actualDomElement = document.createElement(
    reactElementOrStringOrNumber.tag
  );

  if (reactElementOrStringOrNumber.props) {
    Object.keys(reactElementOrStringOrNumber.props)
      .filter(p => p !== "children")
      .forEach(
        p => (actualDomElement[p] = reactElementOrStringOrNumber.props[p])
      );
  }

  if (reactElementOrStringOrNumber.props.children) {
    reactElementOrStringOrNumber.props.children.forEach(child =>
      render(child, actualDomElement)
    );
  }

  container.appendChild(actualDomElement);
};

const rerender = () => {
  stateCursor = 0;
  document.querySelector("#app").firstChild.remove();
  render(<App />, document.querySelector("#app"));
};

render(<App />, document.querySelector("#app"));
