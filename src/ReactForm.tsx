import React from "react"

interface Props {
  formFields: Field[]
}

interface Field {
  id: number,
  label: string,
  type: string
}

const ReactForm = (props: Props) => {
  return (
    <>
    {props.formFields.map((field: Field) => (
      <div className="font-semibold" key={field.id}>
        <label>{field.label}</label>
        <input
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          type={field.type}
        />
      </div>
    ))}
    </>
  )
}

export default ReactForm