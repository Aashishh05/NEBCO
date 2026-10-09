import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 px-6 text-center">
          <h2 className="text-2xl font-extrabold text-ink">
            Something went wrong
          </h2>
          <p className="text-muted-fg">
            The page could not be displayed. Try reloading.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-[53px] bg-red px-7 text-[14px] font-semibold text-white transition-colors hover:bg-deep-red"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
