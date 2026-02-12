"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 bg-red-900/20 border border-red-500/50 rounded-xl text-red-200">
                    <h2 className="text-xl font-bold mb-2">Algo salió mal en el visualizador.</h2>
                    <p className="font-mono text-sm bg-black/50 p-4 rounded mb-4">
                        {this.state.error?.message}
                    </p>
                    <button
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-medium"
                        onClick={() => this.setState({ hasError: false, error: null })}
                    >
                        Reintentar
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
