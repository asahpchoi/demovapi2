import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ymfbypjbsgujebgrezpu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltZmJ5cGpic2d1amViZ3JlenB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1MzIyODUsImV4cCI6MjAzMjEwODI4NX0.f9tmCKOS4HrsRM5GRJQNp5Q_elqj2hV9lNOmZi3j8fA'
const supabase = createClient(supabaseUrl, supabaseKey)


export const getID = async () => {
  const { data, error } = await supabase
    .from('session')
    .insert({})
    .select()
  return data[0].id;
}

export const getUsers = async (id) => {
  const { data, error } = await supabase
    .from('session')
    .select()
  return data;
}

export const getData = async (id) => {
  const { data, error } = await supabase
    .from('session')
    .select()
    .eq("id", id)
  return data;
}

export const getSettings = async (key) => {
  const { data, error } = await supabase
    .from('content')
    .select()
    .eq('key', key);

  return (await data)[0].value;
}

export const updateData = async (id, username, systemPrompt, photo) => {
  const { data, error } = await supabase
    .from('session')
    .upsert({ id, username, systemPrompt, photo })
    .select()

  return data;
}

export const removeData = async () => {
  const { data, error } = await supabase
    .from('session')
    .select("id")

  data.forEach(async record => {
    const id = record.id;

    const { error2 } = await supabase
      .from('session')
      .delete()
      .match({ id })
  })



}

