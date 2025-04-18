import { Label } from './components';
import { Checkbox } from './components/Checkbox';
import { RadioGroup, RadioGroupItem } from './components/RadioGroup';

function App() {
  return (
    <>
      <RadioGroup defaultValue='option-one'>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='option-one' id='option-one' />
          <Label htmlFor='option-one'>Option One</Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='option-two' id='option-two' />
          <Label htmlFor='option-two'>Option Two</Label>
        </div>
      </RadioGroup>
      <div className='flex items-center space-x-2'>
        <Checkbox id='terms' />
        <label
          htmlFor='terms'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Accept terms and conditions
        </label>
      </div>
    </>
  );
}

export default App;
