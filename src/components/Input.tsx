import React from 'react'
import { TextInput, TextInputProps } from 'react-native'

type Props = TextInputProps

export default function Input({ ...props }: Props) {
  return (
    <TextInput
      className="
        text-gray
        h-14
        w-full
        rounded-xl
        border
        border-solid
        border-white
        bg-white
        px-4
        font-standard
        text-lg
        leading-[0px]
        focus:border-blue-700
        focus:text-blue-700
      "
      placeholderTextColor="#9ca3af"
      allowFontScaling={false}
      {...props}
    />
  )
}
