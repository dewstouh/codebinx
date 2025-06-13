"use client"

import { CreateBinFormInput, CreateBinFormSchema, CreateBinInput, CreateBinSchema } from '@/zod/createBinSchema'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '@/components/ui/select'
import { Language } from '@/types/language'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import Editor from '@/app/components/Editor'
import { useForm } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from '@/components/ui/form'
import { createBin } from '@/app/actions/bin.actions'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import Spinner from '@/app/components/Spinner'

export default function CreateBinForm() {
  const [content, setContent] = useState("");

  const onChange = (val:string) => {
    setContent(val)
  }

  
  const form = useForm<CreateBinFormInput>({
    resolver: zodResolver(CreateBinFormSchema),
    defaultValues: {
      isPrivate: false,
    },
  })
  
  const onSubmit = async (values: CreateBinFormInput) => {
    if(!content) {
      toast.error("You have to add content to the bin!")
      return;
    }
    const createdBin = await createBin({...values, content})

    if (createdBin) redirect(`/bins/${createdBin.binId}`)
    else redirect("/")
  }

  const onInvalid = (errors: typeof form.formState.errors) => {
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-7xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[800px] border border-gray-100 dark:border-zinc-800">
        {/* Left Column: Form */}
        <div className="w-full lg:w-2/5 p-10 lg:p-14 flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-extrabold text-zinc-900 dark:text-white mb-10 text-center lg:text-left tracking-tight">Create New Bin</h1>


            <Form {...form}>

              <form onSubmit={form.handleSubmit(onSubmit,onInvalid)} className='space-y-5'>


                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-zinc-700 dark:text-zinc-300 font-semibold mb-2 block">Title</FormLabel>
                      <FormControl>
                        <Input
                        {...field}
                          placeholder="Give your code a meaningful title"
                          className="block w-full rounded-xl border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500 transition duration-200 ease-in-out text-lg p-3.5 shadow-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-zinc-700 dark:text-zinc-300 font-semibold mb-2 block">Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          id="title"
                          placeholder="Explain the purpose or functionality of your code"
                          value={field.value}
                          defaultValue={field.value}
                          className="block w-full rounded-xl border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500 transition duration-200 ease-in-out text-lg p-3.5 resize-y min-h-[120px] shadow-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-zinc-700 dark:text-zinc-300 font-semibold mb-2 block">Language</FormLabel>
                      <FormControl>
                        <Select value={field.value} defaultValue={field.value} onValueChange={field.onChange}>

                          <SelectTrigger
                            id="language"
                            className="w-full rounded-xl border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 transition duration-200 ease-in-out text-lg h-14 px-4 shadow-sm"
                          >
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>

                          <SelectContent className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white z-50 rounded-xl shadow-lg">
                            {Object.entries(Language).map(([k, v]) => (
                              <SelectItem key={k} value={k} className="hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer p-3 text-lg">
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-zinc-700 dark:text-zinc-300 font-semibold mb-2 block">Password (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder="Add a password for protected access"
                          className="block w-full rounded-xl border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500 transition duration-200 ease-in-out text-lg p-3.5 shadow-sm"
                          {...field}
                          />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPrivate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Make Bin Private
                        </FormLabel>
                        <FormDescription>
                          Private bins are only accessible by the dashboard, you must be logged in for creating private bins.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  disabled={form.formState.isLoading}
                  className='w-full'
                >
                  {form.formState.isSubmitting ? <Spinner/> : "Create Bin"}
                </Button>


              </form>
            </Form>

          </div>
        </div>

        {/* Right Column: Monaco Editor */}
        <div className="w-full lg:w-3/5 p-6 lg:p-8 bg-zinc-900 dark:bg-zinc-900 border-l border-gray-100 dark:border-zinc-800 flex flex-col rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl">
          <Label htmlFor="code-editor" className="text-xl text-zinc-300 dark:text-zinc-400 font-semibold mb-4 block text-center lg:text-left">Code Editor</Label>
          <div className="flex-grow rounded-xl overflow-hidden border border-zinc-700 dark:border-zinc-700">
            <Editor onChange={onChange} value='// Write your code here' language={form.watch("language")} />
          </div>
        </div>
      </div>
    </div>

  )
}
