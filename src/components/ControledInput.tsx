import React from 'react'
import { Controller } from 'react-hook-form'
import { Text } from './Text'
import { TextInput, TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  control: any
  name: string
  error?: string
}

export default function Input({ control, name, error, ...props }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <TextInput
            className="
              text-gray
              focus:border-primary
              focus:text-primary
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
            "
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            allowFontScaling={false}
            {...props}
          />
          {error && (
            <Text h5 h6 className="text-red">
              {error}
            </Text>
          )}
        </>
      )}
    />
  )
}
