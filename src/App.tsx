import { Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components';

function App() {
  return (
    <div className='container mx-auto p-5'>
      <Alert>
        <Terminal className='h-4 w-4' />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default App;
