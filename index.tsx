let React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag == "function") {
      return tag(props);
    }

    var element = { tag, props: { ...props, children } };
    return element;
  }
};

const App = () => (
  <div className="react-2020">
    <h1>Hello, person!</h1>
    <input type="text" placeholder="name" />
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis
      omnis veniam id ipsum voluptatibus laudantium aliquid ab porro dicta
      tempore!
    </p>
  </div>
);

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

render(<App />, document.querySelector("#app"));
