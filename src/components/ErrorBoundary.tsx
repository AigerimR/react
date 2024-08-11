import React from "react";
import NotFound from "../app/not-found";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  errorMessage: string | null;
  isNotFound: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { errorMessage: null, isNotFound: false };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const isNotFound = error.message.includes("Not Found");

    return { errorMessage: error.toString(), isNotFound };
  }
  componentDidCatch(error: Error): void {
    this.logErrorToServices(error.toString());
  }
  logErrorToServices = (error: string) => {
    console.error(`Error logged to service: ${error}`);
  };
  render() {
    if (this.state.isNotFound) {
      return <NotFound />;
    }
    if (this.state.errorMessage) {
      return <p>{this.state.errorMessage}</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
