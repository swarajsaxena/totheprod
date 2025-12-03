"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentDetails } from "./component-details"
import { ComponentInstallation } from "./component-installation"
import { ComponentPropsTable } from "./component-props-table"
import { ComponentSourceCode } from "./component-source-code"

export const ComponentDetailsTabs = () => {
  return (
    <Tabs className="flex h-full w-full flex-col" defaultValue="overview">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          className="rounded-none border-transparent border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          value="overview"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="rounded-none border-transparent border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          value="installation"
        >
          Installation
        </TabsTrigger>
        <TabsTrigger
          className="rounded-none border-transparent border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          value="props"
        >
          Props
        </TabsTrigger>
        <TabsTrigger
          className="rounded-none border-transparent border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
          value="code"
        >
          Code
        </TabsTrigger>
      </TabsList>

      <TabsContent className="flex-1 overflow-auto p-4" value="overview">
        <ComponentDetails />
      </TabsContent>

      <TabsContent className="flex-1 overflow-auto p-4" value="installation">
        <ComponentInstallation />
      </TabsContent>

      <TabsContent className="flex-1 overflow-auto p-4" value="props">
        <ComponentPropsTable />
      </TabsContent>

      <TabsContent className="flex-1 overflow-auto p-4" value="code">
        <ComponentSourceCode />
      </TabsContent>
    </Tabs>
  )
}
