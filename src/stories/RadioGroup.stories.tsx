import { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem, Label } from '../components';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'text' },
    defaultValue: { control: 'text' },
    onValueChange: { action: 'onValueChange' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    className: { control: 'text' },
    name: { control: 'text' },
  },
};

export default meta;

// Define Story type based on StoryObj
type Story = StoryObj<typeof RadioGroup>;

const defaultChildren = (
  <>
    <div className='flex items-center space-x-2'>
      <RadioGroupItem value='option1' id='opt-1' />
      <Label htmlFor='opt-1'>Option 1</Label>
    </div>
    <div className='flex items-center space-x-2'>
      <RadioGroupItem value='option2' id='opt-2' />
      <Label htmlFor='opt-2'>Option 2</Label>
    </div>
    <div className='flex items-center space-x-2'>
      <RadioGroupItem value='option3' id='opt-3' />
      <Label htmlFor='opt-3'>Option 3</Label>
    </div>
  </>
);

export const Vertical: Story = {
  args: {
    defaultValue: 'option1',
    orientation: 'vertical',
    children: defaultChildren,
  },
};

export const Horizontal: Story = {
  args: {
    defaultValue: 'option2',
    orientation: 'horizontal',
    children: defaultChildren,
  },
};
