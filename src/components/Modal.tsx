import React, {
  useMemo,
  forwardRef,
  useImperativeHandle,
  useRef,
  ReactNode,
} from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { colors } from '~/styles/constants'

export interface IModalProps {
  open: () => void
  close: () => void
}

interface ModalProps {
  children?: ReactNode
  title?: string
  leftComponent?: ReactNode
  rightComponent?: ReactNode
}

const Modal = forwardRef<IModalProps, ModalProps>((props, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null)

  // expose methods to parent components
  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetModalRef.current?.present()
    },
    close: () => {
      bottomSheetModalRef.current?.dismiss()
    },
  }))

  // variables
  const snapPoints = useMemo(() => ['100%'], [])

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      style={{
        backgroundColor: colors.bluePrimary,
      }}
      handleStyle={{
        display: 'none',
      }}
      backgroundStyle={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: '#000',
      }}
    >
      {props.children}
    </BottomSheetModal>
  )
})

export default Modal
