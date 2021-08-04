import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        {/* <ProjectListScreen /> */}
        {/* <TsReactTest /> */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
