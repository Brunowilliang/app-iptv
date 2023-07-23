import React from 'react'
import { colors } from '~/styles/constants'
import { CaretDown } from 'phosphor-react-native'
import {
  TextInput,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

interface IProps extends TouchableOpacityProps {
  placeholder?: string
  value?: string
  onChange?: (text: string) => void
}

export default function SelectInput(p: IProps) {
  return (
    <TouchableOpacity
      {...p}
      activeOpacity={0.6}
      className="
        h-14
        w-full
        flex-row
        items-center
        justify-between
        rounded-xl
        bg-white
        px-4
      "
    >
      <TextInput
        className="
          text-gray
          h-14
          flex-1
          rounded-xl
          font-standard
          text-lg
          leading-[0px]
        "
        pointerEvents="none"
        placeholder={p.placeholder}
        value={p.value}
        onChangeText={p.onChange}
        allowFontScaling={false}
      />
      <CaretDown
        size={22}
        weight="bold"
        color={p.value ? colors.gray : '#C4C4C4'}
      />
    </TouchableOpacity>
  )
}
