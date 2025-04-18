import { Avatar, AvatarFallback } from './components/Avatar';

function App() {
  return (
    <>
      <Avatar>
        {/* <AvatarImage src='' alt='User Name' /> */}
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
    </>
  );
}

export default App;
