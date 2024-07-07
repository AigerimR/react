import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  errorMessage: string | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { errorMessage: null };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { errorMessage: error.toString() };
  }
  componentDidCatch(error: Error): void {
    this.logErrorToServices(error.toString());
  }
  logErrorToServices = (error: string) => {
    console.error(`Error logged to service: ${error}`);
  };
  render() {
    if (this.state.errorMessage) {
      return <p>{this.state.errorMessage}</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
