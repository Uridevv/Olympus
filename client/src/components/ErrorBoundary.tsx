// components/ErrorBoundary.tsx
import React, { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Actualiza el estado para que el próximo renderizado muestre la UI de respaldo
    return { hasError: true, error, errorInfo: null }; // errorInfo se establecerá en componentDidCatch
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // También puedes registrar el error en un servicio de informes de errores
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI de respaldo que desees
      return (
        <div
          style={{
            padding: "20px",
            border: "1px solid red",
            borderRadius: "5px",
            backgroundColor: "#ffe6e6",
          }}
        >
          <h2>¡Ups! Algo salió mal.</h2>
          <p>Lo sentimos, ha ocurrido un error inesperado.</p>
          <details
            style={{
              whiteSpace: "pre-wrap",
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "3px",
            }}
          >
            <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
              Detalles del error
            </summary>
            {this.state.error && (
              <p>
                <strong>Mensaje:</strong> {this.state.error.toString()}
              </p>
            )}
            {this.state.errorInfo && (
              <>
                <p>
                  <strong>Stack del componente:</strong>
                </p>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </>
            )}
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
