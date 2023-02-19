"use client";
import useSWR from "swr";
import React from 'react'
import Select from 'react-select';

// a function to fetch models
const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

// different models can be used for different type of questions
// like text-davinci-003 is the best model to ask questions
// code-davici-.. can be used to ask coding questions
function ModelSelection() {

    const {data: models, isLoading} = useSWR("models",fetchModels);
    // this is how we use useState with SWR (by using useSWR) 
    const {data: model, mutate: setModel} = useSWR('model',{
        fallbackData: 'text-davinci-003'
    })

  return (
    <div className="mt-2">
        {/* react select is used for a flexible and beautiful Select Input control
        for ReactJS with multiselect, autocomplete, async and creatable support. */}
        <Select 
        className="mt-2"
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition='fixed'
        classNames={{
            control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
        />
    </div>
  )
}

export default ModelSelection