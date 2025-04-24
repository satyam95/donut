import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '../components';
import { Button } from '../components'; // Assume Button is another component
import { Label } from '../components'; // Assume Label is another component
import { Input } from '../components'; // Assume Input is another component
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../components'; // Assume Select components

// Meta configuration for the Card component
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  subcomponents: {
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardAction,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional class names for styling the card',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

// Basic Card Story
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a basic card description.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
  args: {
    className: 'w-[350px]',
  },
};

// Card with Action Story
export const WithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>This card includes an action element.</CardDescription>
        <CardAction>
          <Button variant='ghost'>Edit</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Content with an action button in the header.</p>
      </CardContent>
      <CardFooter>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
  args: {
    className: 'w-[350px]',
  },
};

// Form Example (Provided Usage Example)
export const WithForm: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Name of your project' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='framework'>Framework</Label>
              <Select>
                <SelectTrigger id='framework'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='next'>Next.js</SelectItem>
                  <SelectItem value='sveltekit'>SvelteKit</SelectItem>
                  <SelectItem value='astro'>Astro</SelectItem>
                  <SelectItem value='nuxt'>Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
  args: {
    className: 'w-[350px]',
  },
};

// Empty Card Story
export const Empty: Story = {
  render: (args) => <Card {...args} />,
  args: {
    className: 'w-[350px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'An empty card with no content, showcasing the base styles.',
      },
    },
  },
};

// Card with Custom Styling
export const CustomStyled: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Custom Styled Card</CardTitle>
        <CardDescription>
          This card has custom background and border colors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content with custom styling applied to the card.</p>
      </CardContent>
    </Card>
  ),
  args: {
    className: 'w-[350px] bg-blue-50 border-blue-500',
  },
};
