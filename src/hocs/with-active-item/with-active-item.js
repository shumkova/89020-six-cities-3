import React from "react";

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
      };
    }

    render() {
      return <Component
        {...this.props}

        onItemHover={(active) => {
          this.setState(() => ({
            activeItem: active,
          }));
        }}
      />;
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
