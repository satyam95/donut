import { Link } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/custom-tabs";
import { ClipboardCopy } from "lucide-react";
import { Button } from "../../lib/main";

const ButtonPage = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between gap-8">
        <div className="flex-1">
          <div className="py-6">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
              <Link to="/docs" className="hover:text-foreground">
                Docs
              </Link>
              <span>&gt;</span>
              <span>Button</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Button</h1>
            <p className="text-xl text-muted-foreground pt-1">
              Seamless blockchain access with one-click wallet connection.
            </p>
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Examples</h2>
              <div className="border-b mb-6"></div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Primary</h3>
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="mb-2 border-b w-full justify-start rounded-none bg-transparent p-0">
                    <TabsTrigger
                      value="preview"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent text-base py-2 px-4"
                    >
                      Preview
                    </TabsTrigger>
                    <TabsTrigger
                      value="code"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent text-base py-2 px-4"
                    >
                      Code
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="mt-0">
                    <div className="border rounded-md p-10 bg-white">
                      <div className="flex items-center justify-center min-h-[200px]">
                        <Button>Button</Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="code" className="mt-0">
                    <div className="rounded-md overflow-hidden bg-[#0f172a] text-white p-4">
                      <div className="flex justify-between items-center mb-2">
                        <pre className="font-mono text-sm text-red-400">
                          import {"{"} Button {"}"} from
                          "@/components/ui/button"
                        </pre>
                        <button className="text-white/70 hover:text-white">
                          <ClipboardCopy className="h-4 w-4" />
                        </button>
                      </div>
                      <pre className="font-mono text-sm">
                        <span className="text-yellow-300">export function</span>{" "}
                        <span className="text-blue-300">ButtonDemo</span>(){" "}
                        {"{"}
                        <br />
                        <span className="text-yellow-300 ml-4">
                          return
                        </span>{" "}
                        <span className="text-blue-300">&lt;Button&gt;</span>
                        Button
                        <span className="text-blue-300">&lt;/Button&gt;</span>
                        <br />
                        {"}"}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Installation</h2>
              <div className="rounded-lg overflow-hidden mb-6">
                <pre className="code-block">{`npm install @solui/wallet`}</pre>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Usage</h2>
              <div className="rounded-lg overflow-hidden mb-6">
                <pre className="code-block">
                  {`import { Button } from '@solui/components'

export default function ButtonDemo() {
  return (
    <Button />
  )
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div className="w-52 block h-[calc(100vh-4rem)] sticky top-16">
          <div className="no-scrollbar h-full overflow-auto">
            <div className="py-6">
              <h3 className="font-medium mb-2">On This Page</h3>
              <div className="space-y-2">
                <a
                  href="#installation"
                  className="block text-sm text-muted-foreground hover:text-foreground"
                >
                  Installation
                </a>
                <a
                  href="#usage"
                  className="block text-sm text-muted-foreground hover:text-foreground"
                >
                  Usage
                </a>
                <a
                  href="#api"
                  className="block text-sm text-muted-foreground hover:text-foreground"
                >
                  API
                </a>
                <a
                  href="#examples"
                  className="block text-sm text-muted-foreground hover:text-foreground"
                >
                  Examples
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonPage;
